import assert from "node:assert/strict";
import test from "node:test";
import { addTodo, deleteTodo, toggleTodo } from "@/lib/todo-utils";
import type { TodoItem } from "@/types/todo";

const baseTodos: TodoItem[] = [
  { id: "a", title: "First task", completed: false },
  { id: "b", title: "Second task", completed: true },
];

test("addTodo prepends a new incomplete todo", () => {
  const nextTodos = addTodo(baseTodos, "Write integration tests");

  assert.notStrictEqual(nextTodos, baseTodos);
  assert.equal(nextTodos.length, 3);
  assert.equal(nextTodos[0]?.title, "Write integration tests");
  assert.equal(nextTodos[0]?.completed, false);
  assert.deepEqual(nextTodos.slice(1), baseTodos);
});

test("addTodo ignores blank titles", () => {
  const nextTodos = addTodo(baseTodos, "   ");

  assert.strictEqual(nextTodos, baseTodos);
});

test("toggleTodo flips completion for the matching item only", () => {
  const nextTodos = toggleTodo(baseTodos, "a");

  assert.equal(nextTodos[0]?.completed, true);
  assert.equal(nextTodos[1]?.completed, true);
});

test("deleteTodo removes the matching item", () => {
  const nextTodos = deleteTodo(baseTodos, "a");

  assert.deepEqual(nextTodos, [
    { id: "b", title: "Second task", completed: true },
  ]);
});
