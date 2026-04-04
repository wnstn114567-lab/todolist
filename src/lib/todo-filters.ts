import type { TodoFilter, TodoItem } from "@/types/todo";

export function filterTodos(todos: TodoItem[], filter: TodoFilter) {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

export function getFilterLabel(filter: TodoFilter) {
  if (filter === "active") {
    return "active";
  }

  if (filter === "completed") {
    return "completed";
  }

  return "all";
}
