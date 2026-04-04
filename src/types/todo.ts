export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoFilter = "all" | "active" | "completed";
