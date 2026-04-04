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
          ? "할 일을 몇 개 추가하면 어디부터 시작하면 좋을지 추천해 드릴게요."
          : "현재 목록은 모두 완료되었습니다. 다음 단계가 생기면 새 할 일을 추가해 보세요.",
      emptyState:
        todos.length === 0
          ? {
              title: "분석할 할 일이 아직 없어요",
              description:
                "몇 개의 할 일을 추가하면 AI 추천이 가장 먼저 시작할 작업을 골라 드립니다.",
            }
          : {
              title: "지금은 모두 정리됐어요",
              description:
                "진행 중인 할 일이 없어서 지금은 우선순위를 정할 대상이 없습니다.",
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
      "시급함, 빠르게 끝낼 수 있는 정도, 집중 흐름을 함께 고려해 바로 움직이기 쉬운 순서로 정리했습니다.",
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
    return "중요한 작업의 성격과 곧 처리해야 할 신호가 함께 보여서 지금 시작하기 좋습니다.";
  }

  if (todo.focusMatches.length > 0) {
    return "하루의 흐름을 앞당겨 줄 중심 작업으로 보여 먼저 시작하기 좋습니다.";
  }

  if (todo.easeScore >= todo.urgencyScore) {
    return "부담 없이 바로 시작할 수 있으면서도 진행감을 만들기 좋은 항목입니다.";
  }

  return "현재 남은 작업 중에서 가장 먼저 손대기 좋은 항목으로 판단됩니다.";
}

function buildUrgentReason(todo: ScoredTodo) {
  if (todo.urgentMatches.length > 0) {
    return `${joinKeywords(todo.urgentMatches)} 같은 표현이 포함되어 있어 우선 처리할 가능성이 높아 보입니다.`;
  }

  return "다른 진행 중 항목보다 상대적으로 더 시급하게 처리해야 할 작업으로 보입니다.";
}

function buildQuickWinReason(todo: ScoredTodo) {
  if (todo.quickWinMatches.length > 0) {
    return `${joinKeywords(todo.quickWinMatches)} 같은 표현을 바탕으로 비교적 빠르게 끝낼 수 있는 작업으로 판단했습니다.`;
  }

  return "작업 범위가 비교적 짧아 빠르게 완료하기 좋은 항목입니다.";
}

function buildOrderReason(todo: ScoredTodo) {
  if (todo.urgencyScore >= todo.easeScore && todo.urgencyScore >= todo.focusScore) {
    return "시급도가 가장 높아 보여 초반에 먼저 처리하는 편이 좋습니다.";
  }

  if (todo.easeScore >= todo.focusScore) {
    return "짧게 성취감을 만들고 싶을 때 이어서 처리하기 좋은 항목입니다.";
  }

  return "집중력이 남아 있을 때 처리하면 좋은 핵심 작업으로 보입니다.";
}

function joinKeywords(keywords: string[]) {
  return keywords.slice(0, 2).map((keyword) => `"${keyword}"`).join(", ");
}
