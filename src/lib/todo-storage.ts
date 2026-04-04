import { sampleTodos } from "@/data/sample-todos";
import type { TodoItem } from "@/types/todo";

const TODO_STORAGE_KEY = "todo-app-v1.todos";
const SUGGESTIONS_STORAGE_KEY = "todo-app-v1.suggestions-open";

export function loadStoredTodos(): TodoItem[] {
  if (typeof window === "undefined") {
    return sampleTodos;
  }

  try {
    const rawValue = window.localStorage.getItem(TODO_STORAGE_KEY);

    if (!rawValue) {
      return sampleTodos;
    }

    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return sampleTodos;
    }

    return parsedValue.flatMap((item) => {
      if (!isTodoItem(item)) {
        return [];
      }

      return [
        {
          id: item.id,
          title: item.title.trim(),
          completed: item.completed,
        },
      ];
    });
  } catch {
    return sampleTodos;
  }
}

export function saveStoredTodos(todos: TodoItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

export function loadStoredSuggestionsState() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(SUGGESTIONS_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function saveStoredSuggestionsState(isOpen: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SUGGESTIONS_STORAGE_KEY, String(isOpen));
}

function isTodoItem(value: unknown): value is TodoItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    typeof item.completed === "boolean"
  );
}
