import type { TodoItem } from "@/types/todo";

export const sampleTodos: TodoItem[] = [
  {
    id: "project-scope",
    title: "Write the project scope",
    note: "Capture the must-have features for the first release.",
    dueLabel: "Today",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "homepage-shell",
    title: "Design the homepage shell",
    note: "Keep the layout calm and readable before adding interactivity.",
    dueLabel: "Today",
    status: "todo",
    priority: "medium",
  },
  {
    id: "project-docs",
    title: "Create the project docs",
    note: "Document setup, planning, implementation notes, and deployment.",
    dueLabel: "This week",
    status: "todo",
    priority: "medium",
  },
  {
    id: "project-bootstrap",
    title: "Bootstrap the Next.js project",
    note: "Scaffold the app with Tailwind CSS and the App Router.",
    dueLabel: "Completed",
    status: "done",
    priority: "high",
  },
];
