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
    return "진행 중";
  }

  if (filter === "completed") {
    return "완료";
  }

  return "전체";
}
