import type { TodoItem } from "@/types/todo";

export function createTodo(title: string): TodoItem {
  const trimmedTitle = title.trim();

  return {
    id: createTodoId(),
    title: trimmedTitle,
    completed: false,
  };
}

export function addTodo(todos: TodoItem[], title: string) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return todos;
  }

  return [createTodo(trimmedTitle), ...todos];
}

export function toggleTodo(todos: TodoItem[], id: string) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

export function deleteTodo(todos: TodoItem[], id: string) {
  return todos.filter((todo) => todo.id !== id);
}

function createTodoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
