import type { TodoItem } from "@/types/todo";

export type TodoRecommendation = {
  id: string;
  title: string;
  reason: string;
};

export type TodoRecommendations = {
  bestTaskFirst: TodoRecommendation | null;
  mostUrgentTask: TodoRecommendation | null;
  easiestQuickWin: TodoRecommendation | null;
  recommendedOrder: TodoRecommendation[];
  summary: string;
  emptyState: {
    title: string;
    description: string;
  } | null;
};

type ScoredTodo = {
  todo: TodoItem;
  urgencyScore: number;
  easeScore: number;
  focusScore: number;
  bestFirstScore: number;
  urgentMatches: string[];
  quickWinMatches: string[];
  focusMatches: string[];
};

const urgentKeywordWeights: Record<string, number> = {
  urgent: 5,
  asap: 5,
  today: 4,
  tonight: 4,
  now: 4,
  immediately: 5,
  soon: 3,
  deadline: 5,
  submit: 4,
  send: 3,
  pay: 5,
  fix: 4,
  review: 3,
  call: 3,
};

const quickWinKeywordWeights: Record<string, number> = {
  quick: 5,
  small: 4,
  tidy: 4,
  clean: 4,
  reply: 4,
  email: 4,
  call: 4,
  check: 4,
  update: 3,
  schedule: 3,
  draft: 3,
};

const focusKeywordWeights: Record<string, number> = {
  plan: 4,
  outline: 4,
  prepare: 3,
  build: 4,
  implement: 4,
  write: 3,
  design: 3,
  create: 3,
  ship: 4,
  finish: 4,
  refactor: 4,
};

export function getTodoRecommendations(todos: TodoItem[]): TodoRecommendations {
  const activeTodos = todos.filter((todo) => !todo.completed);

  if (activeTodos.length === 0) {
    return {
      bestTaskFirst: null,
      mostUrgentTask: null,
      easiestQuickWin: null,
      recommendedOrder: [],
      summary:
        todos.length === 0
          ? "Add a few tasks and the planner will help you choose a good starting point."
          : "Everything on the list is complete. Add a new task when you are ready for the next step.",
      emptyState:
        todos.length === 0
          ? {
              title: "No todos to analyze",
              description:
                "Once you add a few tasks, AI Suggest can highlight the best place to begin.",
            }
          : {
              title: "All caught up",
              description:
                "There are no active todos right now, so the planner has nothing left to prioritize.",
            },
    };
  }

  const scoredTodos = activeTodos.map(scoreTodo);
  const bestTaskFirst = pickBest(
    scoredTodos,
    (todo) => todo.bestFirstScore,
    buildBestFirstReason,
  );

  return {
    bestTaskFirst,
    mostUrgentTask: pickBest(
      scoredTodos,
      (todo) => todo.urgencyScore,
      buildUrgentReason,
    ),
    easiestQuickWin: pickBest(
      scoredTodos,
      (todo) => todo.easeScore,
      buildQuickWinReason,
    ),
    recommendedOrder: createRecommendedOrder(scoredTodos, bestTaskFirst.id),
    summary:
      "Suggestions balance urgency, ease, and momentum so the list feels easier to act on.",
    emptyState: null,
  };
}

function scoreTodo(todo: TodoItem): ScoredTodo {
  const normalizedTitle = todo.title.toLowerCase();
  const wordCount = todo.title.trim().split(/\s+/).filter(Boolean).length;

  const urgentMatches = collectMatches(normalizedTitle, urgentKeywordWeights);
  const quickWinMatches = collectMatches(normalizedTitle, quickWinKeywordWeights);
  const focusMatches = collectMatches(normalizedTitle, focusKeywordWeights);

  const urgencyScore =
    sumKeywordWeights(urgentMatches, urgentKeywordWeights) +
    (wordCount <= 4 ? 1 : 0);
  const easeScore =
    sumKeywordWeights(quickWinMatches, quickWinKeywordWeights) +
    (wordCount <= 3 ? 4 : 0) +
    (wordCount <= 6 ? 2 : 0);
  const focusScore =
    sumKeywordWeights(focusMatches, focusKeywordWeights) +
    (wordCount >= 3 && wordCount <= 7 ? 2 : 0);
  const bestFirstScore = focusScore * 2 + urgencyScore + easeScore;

  return {
    todo,
    urgencyScore,
    easeScore,
    focusScore,
    bestFirstScore,
    urgentMatches,
    quickWinMatches,
    focusMatches,
  };
}

function collectMatches(
  title: string,
  weightedKeywords: Record<string, number>,
): string[] {
  return Object.keys(weightedKeywords).filter((keyword) => title.includes(keyword));
}

function sumKeywordWeights(
  matches: string[],
  weightedKeywords: Record<string, number>,
): number {
  return matches.reduce((total, keyword) => total + weightedKeywords[keyword], 0);
}

function pickBest(
  scoredTodos: ScoredTodo[],
  getScore: (todo: ScoredTodo) => number,
  getReason: (todo: ScoredTodo) => string,
): TodoRecommendation {
  const bestTodo = [...scoredTodos].sort((left, right) => {
    const scoreDifference = getScore(right) - getScore(left);

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    return compareForRecommendedOrder(left, right);
  })[0];

  return {
    id: bestTodo.todo.id,
    title: bestTodo.todo.title,
    reason: getReason(bestTodo),
  };
}

function compareForRecommendedOrder(left: ScoredTodo, right: ScoredTodo) {
  if (right.urgencyScore !== left.urgencyScore) {
    return right.urgencyScore - left.urgencyScore;
  }

  if (right.focusScore !== left.focusScore) {
    return right.focusScore - left.focusScore;
  }

  if (right.easeScore !== left.easeScore) {
    return right.easeScore - left.easeScore;
  }

  return left.todo.title.localeCompare(right.todo.title);
}

function createRecommendedOrder(
  scoredTodos: ScoredTodo[],
  bestTaskFirstId: string,
): TodoRecommendation[] {
  const bestTaskFirst = scoredTodos.find((todo) => todo.todo.id === bestTaskFirstId);
  const remainingTodos = scoredTodos
    .filter((todo) => todo.todo.id !== bestTaskFirstId)
    .sort(compareForRecommendedOrder);
  const orderedTodos = bestTaskFirst
    ? [bestTaskFirst, ...remainingTodos]
    : remainingTodos;

  return orderedTodos.slice(0, 4).map((todo) => ({
    id: todo.todo.id,
    title: todo.todo.title,
    reason: buildOrderReason(todo),
  }));
}

function buildBestFirstReason(todo: ScoredTodo) {
  if (todo.focusMatches.length > 0 && todo.urgencyScore > 0) {
    return "It combines meaningful work with signs that it should happen soon.";
  }

  if (todo.focusMatches.length > 0) {
    return "It looks like a strong momentum task that can move the day forward early.";
  }

  if (todo.easeScore >= todo.urgencyScore) {
    return "It is simple enough to start without friction and still creates progress.";
  }

  return "It stands out as the clearest active task to tackle first.";
}

function buildUrgentReason(todo: ScoredTodo) {
  if (todo.urgentMatches.length > 0) {
    return `Keywords like ${joinKeywords(todo.urgentMatches)} make this read as time-sensitive.`;
  }

  return "It edges out the rest because it looks more time-sensitive than the other active tasks.";
}

function buildQuickWinReason(todo: ScoredTodo) {
  if (todo.quickWinMatches.length > 0) {
    return `Keywords like ${joinKeywords(todo.quickWinMatches)} suggest this can be wrapped up quickly.`;
  }

  return "Its shorter scope makes it the easiest item to clear quickly.";
}

function buildOrderReason(todo: ScoredTodo) {
  if (todo.urgencyScore >= todo.easeScore && todo.urgencyScore >= todo.focusScore) {
    return "Do this early because it looks the most time-sensitive.";
  }

  if (todo.easeScore >= todo.focusScore) {
    return "This is a good quick win once you want an easy piece of progress.";
  }

  return "This looks like focused work worth tackling while your energy is still high.";
}

function joinKeywords(keywords: string[]) {
  return keywords.slice(0, 2).map((keyword) => `"${keyword}"`).join(" and ");
}
