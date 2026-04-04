import assert from "node:assert/strict";
import test from "node:test";
import { filterTodos } from "@/lib/todo-filters";
import type { TodoItem } from "@/types/todo";

const todos: TodoItem[] = [
  { id: "1", title: "Plan release", completed: false },
  { id: "2", title: "Ship UI polish", completed: true },
  { id: "3", title: "Check mobile spacing", completed: false },
];

test("filterTodos returns all todos for the all filter", () => {
  assert.deepEqual(filterTodos(todos, "all"), todos);
});

test("filterTodos returns only active todos for the active filter", () => {
  assert.deepEqual(filterTodos(todos, "active"), [
    { id: "1", title: "Plan release", completed: false },
    { id: "3", title: "Check mobile spacing", completed: false },
  ]);
});

test("filterTodos returns only completed todos for the completed filter", () => {
  assert.deepEqual(filterTodos(todos, "completed"), [
    { id: "2", title: "Ship UI polish", completed: true },
  ]);
});
