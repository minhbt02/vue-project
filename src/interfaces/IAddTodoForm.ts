import { TodoType } from "@/repo/services/todo.service";

export interface IAddTodoForm {
  getTodo(): TodoType;
  showError(error: string, type: string): () => void;
}