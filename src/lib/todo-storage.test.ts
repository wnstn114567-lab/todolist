import assert from "node:assert/strict";
import test from "node:test";
import {
  loadStoredSuggestionsState,
  loadStoredTodos,
  saveStoredSuggestionsState,
  saveStoredTodos,
} from "@/lib/todo-storage";
import type { TodoItem } from "@/types/todo";

type MockStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

function createWindowWithStorage() {
  const store = new Map<string, string>();
  const localStorage: MockStorage = {
    getItem(key) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key, value) {
      store.set(key, value);
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };

  return {
    window: { localStorage } as Window & typeof globalThis,
    store,
  };
}

test("loadStoredTodos returns sample todos when storage is malformed", () => {
  const originalWindow = globalThis.window;
  const { window } = createWindowWithStorage();

  globalThis.window = window;
  window.localStorage.setItem("todo-app-v1.todos", "{broken-json");

  const todos = loadStoredTodos();

  assert.equal(todos.length > 0, true);

  globalThis.window = originalWindow;
});

test("saveStoredTodos and loadStoredTodos persist valid todo data", () => {
  const originalWindow = globalThis.window;
  const { window } = createWindowWithStorage();
  const todos: TodoItem[] = [
    { id: "1", title: "Persisted task", completed: false },
  ];

  globalThis.window = window;

  saveStoredTodos(todos);

  assert.deepEqual(loadStoredTodos(), todos);

  globalThis.window = originalWindow;
});

test("suggestion card open state persists as a boolean string", () => {
  const originalWindow = globalThis.window;
  const { window } = createWindowWithStorage();

  globalThis.window = window;

  saveStoredSuggestionsState(true);
  assert.equal(loadStoredSuggestionsState(), true);

  saveStoredSuggestionsState(false);
  assert.equal(loadStoredSuggestionsState(), false);

  globalThis.window = originalWindow;
});
