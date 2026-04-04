import assert from "node:assert/strict";
import test from "node:test";
import { getTodoRecommendations } from "@/lib/todo-recommendations";
import type { TodoItem } from "@/types/todo";

test("returns a helpful empty state when there are no todos", () => {
  const recommendations = getTodoRecommendations([]);

  assert.equal(recommendations.bestTaskFirst, null);
  assert.equal(recommendations.mostUrgentTask, null);
  assert.equal(recommendations.easiestQuickWin, null);
  assert.equal(recommendations.recommendedOrder.length, 0);
  assert.equal(recommendations.emptyState?.title, "분석할 할 일이 아직 없어요");
});

test("ignores completed todos and picks urgent, quick, and best-first tasks", () => {
  const todos: TodoItem[] = [
    { id: "1", title: "Pay rent today", completed: false },
    { id: "2", title: "Quick email reply", completed: false },
    { id: "3", title: "Plan launch outline", completed: false },
    { id: "4", title: "Fix homepage bug", completed: true },
  ];

  const recommendations = getTodoRecommendations(todos);

  assert.equal(recommendations.mostUrgentTask?.title, "Pay rent today");
  assert.equal(recommendations.easiestQuickWin?.title, "Quick email reply");
  assert.equal(recommendations.bestTaskFirst?.title, "Plan launch outline");
  assert.deepEqual(
    recommendations.recommendedOrder.map((todo) => todo.title),
    ["Plan launch outline", "Pay rent today", "Quick email reply"],
  );
});

test("returns an all-complete empty state when no active todos remain", () => {
  const todos: TodoItem[] = [
    { id: "1", title: "Submit report today", completed: true },
  ];

  const recommendations = getTodoRecommendations(todos);

  assert.equal(recommendations.emptyState?.title, "지금은 모두 정리됐어요");
  assert.match(recommendations.summary, /현재 목록은 모두 완료되었습니다/);
});
