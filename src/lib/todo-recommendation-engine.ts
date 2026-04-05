import type { TodoItem } from "@/types/todo";
import type {
  TodoRecommendation,
  TodoRecommendations,
} from "@/lib/todo-recommendations";

type Signal = {
  term: string;
  label: string;
  weight: number;
};

type SignalMatch = {
  label: string;
  weight: number;
};

type ExecutionPhase =
  | "urgent"
  | "start-early"
  | "quick-win"
  | "deep-focus"
  | "steady";

type AnalyzedTodo = {
  todo: TodoItem;
  urgencyScore: number;
  quickWinScore: number;
  deepFocusScore: number;
  projectScopeScore: number;
  startEarlyScore: number;
  bestStartScore: number;
  orderScore: number;
  isLargeProject: boolean;
  isDeepFocus: boolean;
  isQuickWin: boolean;
  deadlineSignals: SignalMatch[];
  quickSignals: SignalMatch[];
  adminSignals: SignalMatch[];
  deepSignals: SignalMatch[];
  projectSignals: SignalMatch[];
};

type RecommendationContext = {
  urgentCount: number;
  quickWinCount: number;
  deepFocusCount: number;
  largeProjectCount: number;
};

const immediateSignals: Signal[] = [
  { term: "오늘", label: "오늘", weight: 9 },
  { term: "today", label: "오늘", weight: 9 },
  { term: "지금", label: "지금", weight: 8 },
  { term: "now", label: "지금", weight: 8 },
  { term: "바로", label: "바로", weight: 7 },
  { term: "긴급", label: "긴급", weight: 8 },
  { term: "급함", label: "긴급", weight: 8 },
  { term: "urgent", label: "긴급", weight: 8 },
  { term: "asap", label: "긴급", weight: 8 },
];

const deadlineSignals: Signal[] = [
  { term: "내일", label: "내일", weight: 7 },
  { term: "tomorrow", label: "내일", weight: 7 },
  { term: "이번 주", label: "이번 주", weight: 5 },
  { term: "this week", label: "이번 주", weight: 5 },
  { term: "주말", label: "주말", weight: 4 },
  { term: "마감", label: "마감", weight: 6 },
  { term: "deadline", label: "마감", weight: 6 },
  { term: "제출", label: "제출", weight: 5 },
  { term: "submit", label: "제출", weight: 5 },
  { term: "시험", label: "시험", weight: 4 },
  { term: "quiz", label: "퀴즈", weight: 4 },
  { term: "퀴즈", label: "퀴즈", weight: 4 },
  { term: "발표", label: "발표", weight: 3 },
];

const quickSignals: Signal[] = [
  { term: "답장", label: "답장", weight: 5 },
  { term: "reply", label: "답장", weight: 5 },
  { term: "메시지", label: "메시지", weight: 4 },
  { term: "message", label: "메시지", weight: 4 },
  { term: "이메일", label: "이메일", weight: 4 },
  { term: "email", label: "이메일", weight: 4 },
  { term: "메일", label: "이메일", weight: 4 },
  { term: "공지", label: "공지", weight: 4 },
  { term: "확인", label: "확인", weight: 4 },
  { term: "check", label: "확인", weight: 4 },
  { term: "업로드", label: "업로드", weight: 4 },
  { term: "upload", label: "업로드", weight: 4 },
  { term: "보내기", label: "보내기", weight: 4 },
  { term: "send", label: "보내기", weight: 4 },
  { term: "신청", label: "신청", weight: 4 },
  { term: "등록", label: "등록", weight: 3 },
  { term: "예약", label: "예약", weight: 3 },
  { term: "call", label: "전화", weight: 3 },
  { term: "전화", label: "전화", weight: 3 },
  { term: "간단", label: "간단", weight: 4 },
  { term: "quick", label: "빠르게", weight: 4 },
  { term: "small", label: "작게", weight: 3 },
];

const adminSignals: Signal[] = [
  { term: "공지", label: "공지", weight: 4 },
  { term: "메일", label: "이메일", weight: 4 },
  { term: "message", label: "메시지", weight: 4 },
  { term: "메시지", label: "메시지", weight: 4 },
  { term: "확인", label: "확인", weight: 4 },
  { term: "업로드", label: "업로드", weight: 4 },
  { term: "send", label: "보내기", weight: 4 },
  { term: "보내기", label: "보내기", weight: 4 },
  { term: "신청", label: "신청", weight: 4 },
  { term: "등록", label: "등록", weight: 3 },
  { term: "예약", label: "예약", weight: 3 },
  { term: "결제", label: "결제", weight: 4 },
  { term: "정산", label: "정산", weight: 3 },
];

const deepFocusSignals: Signal[] = [
  { term: "정리", label: "정리", weight: 3 },
  { term: "요약", label: "요약", weight: 4 },
  { term: "복습", label: "복습", weight: 4 },
  { term: "암기", label: "암기", weight: 4 },
  { term: "문제", label: "문제풀이", weight: 4 },
  { term: "연습", label: "연습", weight: 3 },
  { term: "작성", label: "작성", weight: 4 },
  { term: "write", label: "작성", weight: 4 },
  { term: "구현", label: "구현", weight: 4 },
  { term: "implement", label: "구현", weight: 4 },
  { term: "분석", label: "분석", weight: 4 },
  { term: "analyze", label: "분석", weight: 4 },
  { term: "설계", label: "설계", weight: 4 },
  { term: "design", label: "설계", weight: 4 },
  { term: "코딩", label: "코딩", weight: 4 },
  { term: "디버깅", label: "디버깅", weight: 4 },
  { term: "debug", label: "디버깅", weight: 4 },
  { term: "읽기", label: "읽기", weight: 3 },
  { term: "read", label: "읽기", weight: 3 },
  { term: "준비", label: "준비", weight: 3 },
  { term: "prepare", label: "준비", weight: 3 },
];

const projectSignals: Signal[] = [
  { term: "과제", label: "과제", weight: 5 },
  { term: "assignment", label: "과제", weight: 5 },
  { term: "프로젝트", label: "프로젝트", weight: 5 },
  { term: "project", label: "프로젝트", weight: 5 },
  { term: "팀플", label: "팀플", weight: 5 },
  { term: "보고서", label: "보고서", weight: 5 },
  { term: "report", label: "보고서", weight: 5 },
  { term: "레포트", label: "레포트", weight: 5 },
  { term: "논문", label: "논문", weight: 5 },
  { term: "발표", label: "발표", weight: 4 },
  { term: "presentation", label: "발표", weight: 4 },
  { term: "자료", label: "자료", weight: 3 },
  { term: "슬라이드", label: "슬라이드", weight: 4 },
  { term: "초안", label: "초안", weight: 4 },
  { term: "개요", label: "개요", weight: 4 },
  { term: "outline", label: "개요", weight: 4 },
  { term: "조사", label: "조사", weight: 4 },
  { term: "research", label: "리서치", weight: 4 },
  { term: "리서치", label: "리서치", weight: 4 },
  { term: "기획", label: "기획", weight: 4 },
  { term: "포트폴리오", label: "포트폴리오", weight: 5 },
  { term: "portfolio", label: "포트폴리오", weight: 5 },
];

const studySignals: Signal[] = [
  { term: "스터디", label: "스터디", weight: 2 },
  { term: "강의", label: "강의", weight: 2 },
  { term: "수업", label: "수업", weight: 2 },
  { term: "시험", label: "시험", weight: 4 },
  { term: "중간고사", label: "중간고사", weight: 4 },
  { term: "기말", label: "기말", weight: 4 },
  { term: "lecture", label: "강의", weight: 2 },
  { term: "study", label: "공부", weight: 2 },
];

export function getHeuristicTodoRecommendations(
  todos: TodoItem[],
): TodoRecommendations {
  const activeTodos = todos.filter((todo) => !todo.completed);

  if (activeTodos.length === 0) {
    return {
      bestTaskFirst: null,
      mostUrgentTask: null,
      easiestQuickWin: null,
      recommendedOrder: [],
      summary:
        todos.length === 0
          ? "할 일을 몇 개 추가하면 어디부터 손대면 좋을지 가볍게 정리해 드릴게요."
          : "현재 목록은 모두 완료됐어요. 새 일정이 생기면 다시 우선순위를 정리해 드릴게요.",
      emptyState:
        todos.length === 0
          ? {
              title: "분석할 할 일이 아직 없어요",
              description:
                "몇 개의 할 일을 추가하면 마감, 과제 규모, 빠른 완료 가능성을 함께 보고 추천해 드립니다.",
            }
          : {
              title: "지금은 모두 정리됐어요",
              description:
                "진행 중인 할 일이 없어서 지금은 우선순위를 고를 대상이 없습니다.",
            },
    };
  }

  const analyzedTodos = activeTodos.map(analyzeTodo);
  const context = buildRecommendationContext(analyzedTodos);

  return {
    bestTaskFirst: pickBest(
      analyzedTodos,
      (todo) => todo.bestStartScore,
      (todo) => buildBestFirstReason(todo, context),
    ),
    mostUrgentTask: pickBest(
      analyzedTodos,
      (todo) => todo.urgencyScore + todo.startEarlyScore * 0.1,
      (todo) => buildUrgentReason(todo),
    ),
    easiestQuickWin: pickBest(
      analyzedTodos,
      (todo) => todo.quickWinScore - todo.projectScopeScore * 0.1,
      (todo) => buildQuickWinReason(todo),
    ),
    recommendedOrder: createRecommendedOrder(analyzedTodos, context),
    summary: buildSummary(context),
    emptyState: null,
  };
}

function analyzeTodo(todo: TodoItem): AnalyzedTodo {
  const normalizedTitle = normalizeTitle(todo.title);
  const compactLength = normalizedTitle.replace(/\s+/g, "").length;
  const wordCount = normalizedTitle.split(/\s+/).filter(Boolean).length;
  const multiStepCount = countMultiStepCues(normalizedTitle);

  const immediateMatches = collectMatches(normalizedTitle, immediateSignals);
  const deadlineMatches = collectMatches(normalizedTitle, deadlineSignals);
  const quickMatches = collectMatches(normalizedTitle, quickSignals);
  const adminMatches = collectMatches(normalizedTitle, adminSignals);
  const deepMatches = collectMatches(normalizedTitle, deepFocusSignals);
  const projectMatches = collectMatches(normalizedTitle, projectSignals);
  const studyMatches = collectMatches(normalizedTitle, studySignals);

  const immediateWeight = sumWeights(immediateMatches);
  const deadlineWeight = sumWeights(deadlineMatches);
  const quickWeight = sumWeights(quickMatches);
  const adminWeight = sumWeights(adminMatches);
  const deepWeight = sumWeights(deepMatches);
  const projectWeight = sumWeights(projectMatches);
  const studyWeight = sumWeights(studyMatches);

  const shortTaskBonus = compactLength <= 8 ? 3 : compactLength <= 12 ? 2 : 1;
  const scopeBonus =
    (compactLength >= 18 ? 3 : compactLength >= 12 ? 2 : 1) +
    (wordCount >= 5 ? 2 : wordCount >= 3 ? 1 : 0) +
    multiStepCount * 2;

  const projectScopeScore =
    projectWeight + studyWeight * 0.4 + deepWeight * 0.2 + scopeBonus;
  const deepFocusScore = clampScore(
    deepWeight + studyWeight + projectScopeScore * 0.35 - adminWeight * 0.15,
  );
  const quickWinScore = clampScore(
    quickWeight +
      adminWeight +
      shortTaskBonus +
      (multiStepCount === 0 ? 1 : 0) -
      projectScopeScore * 0.45 -
      deepFocusScore * 0.2,
  );
  const urgencyScore =
    immediateWeight * 1.5 +
    deadlineWeight * 1.1 +
    (deadlineWeight > 0 && adminWeight > 0 ? 1.5 : 0) +
    (compactLength <= 10 ? 0.5 : 0);
  const startEarlyScore = clampScore(
    projectScopeScore * 1.2 +
      deepFocusScore * 0.8 +
      (deadlineWeight >= 5 ? 2 : 0) -
      quickWinScore * 0.25,
  );
  const bestStartScore =
    urgencyScore * 2.2 +
    startEarlyScore +
    deepFocusScore * 0.5 -
    (quickWinScore >= 9 && urgencyScore < 9 && startEarlyScore < 10 ? 2.5 : 0);
  const orderScore = urgencyScore * 1.7 + startEarlyScore + quickWinScore * 0.5;

  return {
    todo,
    urgencyScore,
    quickWinScore,
    deepFocusScore,
    projectScopeScore,
    startEarlyScore,
    bestStartScore,
    orderScore,
    isLargeProject: projectScopeScore >= 13,
    isDeepFocus: deepFocusScore >= 9 || startEarlyScore >= 18,
    isQuickWin: quickWinScore >= 9 && projectScopeScore < 12,
    deadlineSignals: mergeSignalGroups(immediateMatches, deadlineMatches),
    quickSignals: quickMatches,
    adminSignals: adminMatches,
    deepSignals: mergeSignalGroups(deepMatches, studyMatches),
    projectSignals: projectMatches,
  };
}

function buildRecommendationContext(
  analyzedTodos: AnalyzedTodo[],
): RecommendationContext {
  return {
    urgentCount: analyzedTodos.filter((todo) => todo.urgencyScore >= 13).length,
    quickWinCount: analyzedTodos.filter((todo) => todo.isQuickWin).length,
    deepFocusCount: analyzedTodos.filter((todo) => todo.isDeepFocus).length,
    largeProjectCount: analyzedTodos.filter((todo) => todo.isLargeProject).length,
  };
}

function pickBest(
  analyzedTodos: AnalyzedTodo[],
  getScore: (todo: AnalyzedTodo) => number,
  getReason: (todo: AnalyzedTodo) => string,
): TodoRecommendation {
  const bestTodo = [...analyzedTodos].sort((left, right) => {
    const difference = getScore(right) - getScore(left);

    if (difference !== 0) {
      return difference;
    }

    return compareForTiebreak(left, right);
  })[0];

  return toRecommendation(bestTodo, getReason(bestTodo));
}

function createRecommendedOrder(
  analyzedTodos: AnalyzedTodo[],
  context: RecommendationContext,
): TodoRecommendation[] {
  return [...analyzedTodos]
    .sort((left, right) => compareForOrder(left, right, context))
    .slice(0, 4)
    .map((todo) => toRecommendation(todo, buildOrderReason(todo, context)));
}

function compareForOrder(
  left: AnalyzedTodo,
  right: AnalyzedTodo,
  context: RecommendationContext,
) {
  const leftPhase = getExecutionPhase(left, context);
  const rightPhase = getExecutionPhase(right, context);

  if (leftPhase !== rightPhase) {
    return phaseRank(leftPhase) - phaseRank(rightPhase);
  }

  if (right.orderScore !== left.orderScore) {
    return right.orderScore - left.orderScore;
  }

  return compareForTiebreak(left, right);
}

function compareForTiebreak(left: AnalyzedTodo, right: AnalyzedTodo) {
  if (right.urgencyScore !== left.urgencyScore) {
    return right.urgencyScore - left.urgencyScore;
  }

  if (right.startEarlyScore !== left.startEarlyScore) {
    return right.startEarlyScore - left.startEarlyScore;
  }

  if (right.quickWinScore !== left.quickWinScore) {
    return right.quickWinScore - left.quickWinScore;
  }

  return left.todo.title.localeCompare(right.todo.title, "ko");
}

function buildBestFirstReason(
  todo: AnalyzedTodo,
  context: RecommendationContext,
) {
  const deadlineHint = formatLabels(todo.deadlineSignals);
  const projectHint = formatLabels(todo.projectSignals);
  const quickHint = formatLabels(mergeSignalGroups(todo.quickSignals, todo.adminSignals));
  const focusHint = formatLabels(todo.deepSignals);

  if (todo.urgencyScore >= 16 && quickHint) {
    return `${deadlineHint ?? "가까운 마감"} 신호가 강하고 ${quickHint}처럼 바로 움직일 요소가 있어 지금 처리하기 좋아요.`;
  }

  if (todo.urgencyScore >= 16) {
    return `${deadlineHint ?? "마감"} 압박이 커서 다른 일보다 먼저 붙잡는 편이 안전해요.`;
  }

  if (todo.isLargeProject && todo.startEarlyScore >= 18) {
    return `${projectHint ?? "덩치가 있는 과제"} 성격이라 초반에 열어둬야 뒤가 훨씬 편해요.`;
  }

  if (todo.isDeepFocus) {
    return `${focusHint ?? projectHint ?? "집중이 필요한 작업"}이라 에너지가 있을 때 먼저 시작하는 편이 좋아요.`;
  }

  if (todo.isQuickWin && context.deepFocusCount > 0) {
    return `${quickHint ?? "짧은 처리성 일정"}이라 큰 과제 들어가기 전에 가볍게 비우기 좋아요.`;
  }

  return "지금 손대기 가장 부담이 적고 흐름을 만들기 좋은 항목이에요.";
}

function buildUrgentReason(todo: AnalyzedTodo) {
  const deadlineHint = formatLabels(todo.deadlineSignals);

  if (deadlineHint) {
    return `${deadlineHint} 신호가 겹쳐서 미루기 부담이 큰 일정이에요.`;
  }

  if (todo.isLargeProject) {
    return "한 번에 끝내기 어려운 편이라 늦출수록 체감 압박이 커질 수 있어요.";
  }

  return "남은 일정 중에서는 시간 압박이 가장 먼저 걸리는 편이에요.";
}

function buildQuickWinReason(todo: AnalyzedTodo) {
  const quickHint = formatLabels(mergeSignalGroups(todo.quickSignals, todo.adminSignals));

  if (todo.isQuickWin && quickHint) {
    return `${quickHint} 성격이 강해서 짧은 시간에 정리하기 좋아요.`;
  }

  if (todo.quickWinScore >= 6) {
    return "범위가 비교적 또렷해서 빈 시간에 짧게 밀기 좋은 편이에요.";
  }

  return "완전히 가벼운 일은 아니지만, 남은 항목 중에서는 가장 짧게 움직이기 쉬워요.";
}

function buildOrderReason(todo: AnalyzedTodo, context: RecommendationContext) {
  const phase = getExecutionPhase(todo, context);
  const deadlineHint = formatLabels(todo.deadlineSignals);
  const projectHint = formatLabels(todo.projectSignals);
  const quickHint = formatLabels(mergeSignalGroups(todo.quickSignals, todo.adminSignals));
  const focusHint = formatLabels(todo.deepSignals);

  if (phase === "urgent") {
    return `${deadlineHint ?? "마감"} 신호가 있어 먼저 막아두면 마음이 훨씬 편해져요.`;
  }

  if (phase === "start-early") {
    return `${projectHint ?? "큰 과제"}라 초반 집중 시간에 열어두는 편이 좋아요.`;
  }

  if (phase === "quick-win") {
    return `${quickHint ?? "처리성 일정"}이라 자투리 시간에 끼워 넣기 좋아요.`;
  }

  if (phase === "deep-focus") {
    return `${focusHint ?? "집중 작업"}이라 흐름이 붙었을 때 이어가기 좋아요.`;
  }

  return "급한 축은 아니라서 앞선 일정 뒤에 이어서 처리하기 무난해요.";
}

function buildSummary(context: RecommendationContext) {
  if (context.urgentCount > 0 && context.largeProjectCount > 0) {
    return `가까운 마감 ${context.urgentCount}개와 덩치 큰 과제 ${context.largeProjectCount}개가 같이 보여요. 급한 일은 먼저 막고, 큰 과제는 오늘 조금이라도 열어두는 흐름을 추천해요.`;
  }

  if (context.largeProjectCount > 1) {
    return "집중이 필요한 큰 과제가 여러 개 보여요. 한 과제를 먼저 열어두고, 짧은 일정은 쉬는 구간에 끼워 넣는 편이 좋아요.";
  }

  if (context.quickWinCount > 0 && context.deepFocusCount > 0) {
    return "집중 과제와 짧게 끝낼 일이 섞여 있어요. 큰 공부는 에너지 있을 때, 연락·확인성 일은 틈날 때 처리하면 흐름이 좋아집니다.";
  }

  if (context.quickWinCount > 1) {
    return "짧게 끝낼 수 있는 일정이 꽤 보여요. 자투리 시간에 몇 개만 정리해도 목록이 빠르게 가벼워질 거예요.";
  }

  if (context.urgentCount > 0) {
    return "가까운 마감 신호가 보이는 일정이 있어요. 먼저 막아두면 남은 공부에 더 안정적으로 집중할 수 있어요.";
  }

  return "과제 규모와 집중 필요도를 함께 보고 순서를 골랐어요. 큰 일은 미리 열고, 가벼운 일은 사이사이에 섞는 흐름을 추천해요.";
}

function getExecutionPhase(
  todo: AnalyzedTodo,
  context: RecommendationContext,
): ExecutionPhase {
  if (todo.urgencyScore >= 13) {
    return "urgent";
  }

  if (todo.startEarlyScore >= 18 || (todo.isLargeProject && context.quickWinCount > 0)) {
    return "start-early";
  }

  if (todo.isQuickWin) {
    return "quick-win";
  }

  if (todo.isDeepFocus) {
    return "deep-focus";
  }

  return "steady";
}

function phaseRank(phase: ExecutionPhase) {
  switch (phase) {
    case "urgent":
      return 0;
    case "start-early":
      return 1;
    case "quick-win":
      return 2;
    case "deep-focus":
      return 3;
    default:
      return 4;
  }
}

function normalizeTitle(title: string) {
  return title.toLowerCase().replace(/\s+/g, " ").trim();
}

function collectMatches(title: string, signals: Signal[]) {
  const uniqueMatches = new Map<string, SignalMatch>();

  for (const signal of signals) {
    if (!title.includes(signal.term)) {
      continue;
    }

    const currentMatch = uniqueMatches.get(signal.label);

    if (!currentMatch || currentMatch.weight < signal.weight) {
      uniqueMatches.set(signal.label, {
        label: signal.label,
        weight: signal.weight,
      });
    }
  }

  return [...uniqueMatches.values()];
}

function mergeSignalGroups(...groups: SignalMatch[][]) {
  const mergedMatches = new Map<string, SignalMatch>();

  for (const group of groups) {
    for (const match of group) {
      const currentMatch = mergedMatches.get(match.label);

      if (!currentMatch || currentMatch.weight < match.weight) {
        mergedMatches.set(match.label, match);
      }
    }
  }

  return [...mergedMatches.values()];
}

function sumWeights(matches: SignalMatch[]) {
  return matches.reduce((total, match) => total + match.weight, 0);
}

function countMultiStepCues(title: string) {
  const connectorMatches =
    title.match(/(?:\/|,|·| 및 | 하고 | 후 | and | & )/g)?.length ?? 0;
  const sequenceMatch = /정리하고|작성하고|준비하고|마무리하고|검토하고/.test(title)
    ? 1
    : 0;

  return connectorMatches + sequenceMatch;
}

function clampScore(score: number) {
  return Math.max(0, score);
}

function formatLabels(matches: SignalMatch[]) {
  const labels = [...matches]
    .sort((left, right) => right.weight - left.weight)
    .slice(0, 2)
    .map((match) => match.label);

  if (labels.length === 0) {
    return null;
  }

  return labels.join("·");
}

function toRecommendation(todo: AnalyzedTodo, reason: string): TodoRecommendation {
  return {
    id: todo.todo.id,
    title: todo.todo.title,
    reason,
  };
}
