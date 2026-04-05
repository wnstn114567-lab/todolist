import type { TodoItem } from "@/types/todo";
import { getHeuristicTodoRecommendations } from "@/lib/todo-recommendation-engine";

export type TodoRecommendation = {
  id: string;
  title: string;
  reason: string;
};

export type TodoRecommendations = {
  bestTaskFirst: TodoRecommendation | null;
  mostUrgentTask: TodoRecommendation | null;
  easiestQuickWin: TodoRecommendation | null;
  recommendedOrder: TodoRecommendation[];
  summary: string;
  emptyState: {
    title: string;
    description: string;
  } | null;
};

export type TodoRecommendationStrategy = (
  todos: TodoItem[],
) => TodoRecommendations;

export const getTodoRecommendations: TodoRecommendationStrategy =
  getHeuristicTodoRecommendations;
