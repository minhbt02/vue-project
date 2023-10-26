import { TodoType } from "@/repo/services/todo.service";

export interface IEditTodoForm {
  getTodos(): TodoType[];
  getIndex(): number;
  getTodo(): TodoType;
  showError(error: string): () => void;
  $emit(event: string, ...args: any[]): () => void;
}