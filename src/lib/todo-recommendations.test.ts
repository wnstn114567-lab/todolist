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
  assert.match(
    recommendations.emptyState?.description ?? "",
    /마감|과제 규모|빠른 완료/,
  );
});

test("starts large study projects early while still surfacing quick wins", () => {
  const todos: TodoItem[] = [
    { id: "1", title: "캡스톤 발표 자료 초안 정리하기", completed: false },
    { id: "2", title: "스터디 공지 메시지 보내기", completed: false },
    { id: "3", title: "강의실 변경 공지 확인하기", completed: false },
  ];

  const recommendations = getTodoRecommendations(todos);

  assert.equal(recommendations.bestTaskFirst?.title, "캡스톤 발표 자료 초안 정리하기");
  assert.equal(recommendations.easiestQuickWin?.title, "스터디 공지 메시지 보내기");
  assert.deepEqual(
    recommendations.recommendedOrder.map((todo) => todo.title),
    [
      "캡스톤 발표 자료 초안 정리하기",
      "스터디 공지 메시지 보내기",
      "강의실 변경 공지 확인하기",
    ],
  );
  assert.match(recommendations.bestTaskFirst?.reason ?? "", /발표|초안|집중|과제/);
  assert.match(recommendations.easiestQuickWin?.reason ?? "", /메시지|공지|짧/);
  assert.match(recommendations.summary, /큰 과제|집중 과제/);
});

test("treats explicit deadlines as the most urgent work", () => {
  const todos: TodoItem[] = [
    { id: "1", title: "오늘 자정 전 장학금 서류 제출하기", completed: false },
    { id: "2", title: "알고리즘 시험 범위 정리하기", completed: false },
    { id: "3", title: "교수님 메일 답장 보내기", completed: false },
    { id: "4", title: "Quick email reply", completed: true },
  ];

  const recommendations = getTodoRecommendations(todos);

  assert.equal(recommendations.mostUrgentTask?.title, "오늘 자정 전 장학금 서류 제출하기");
  assert.equal(recommendations.bestTaskFirst?.title, "오늘 자정 전 장학금 서류 제출하기");
  assert.equal(recommendations.easiestQuickWin?.title, "교수님 메일 답장 보내기");
  assert.equal(recommendations.recommendedOrder[0]?.title, "오늘 자정 전 장학금 서류 제출하기");
  assert.match(recommendations.mostUrgentTask?.reason ?? "", /오늘|제출|마감/);
  assert.match(recommendations.summary, /마감/);
});

test("returns an all-complete empty state when no active todos remain", () => {
  const todos: TodoItem[] = [{ id: "1", title: "Submit report today", completed: true }];

  const recommendations = getTodoRecommendations(todos);

  assert.equal(recommendations.emptyState?.title, "지금은 모두 정리됐어요");
  assert.match(recommendations.summary, /현재 목록은 모두 완료됐어요/);
});
