export type TodoStatus = "todo" | "in-progress" | "done";

export type TodoPriority = "low" | "medium" | "high";

export type TodoItem = {
  id: string;
  title: string;
  note: string;
  dueLabel: string;
  status: TodoStatus;
  priority: TodoPriority;
};
