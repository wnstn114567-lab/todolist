import { TodoEmptyState } from "@/components/todo/todo-empty-state";
import { TodoListItem } from "@/components/todo/todo-list-item";
import type { TodoFilter, TodoItem } from "@/types/todo";

type TodoListProps = {
  currentFilter: TodoFilter;
  todos: TodoItem[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

export function TodoList({
  currentFilter,
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return <TodoEmptyState currentFilter={currentFilter} />;
  }

  return (
    <ul className="space-y-2.5">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}
