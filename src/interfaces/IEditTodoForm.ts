import { TodoType } from "@/repo/services/todo.service";
import { Store } from "vuex";

export interface IEditTodoForm {
  setPopUpType(type: string): () => void;
  setPopUpMessage(message: string): () => void;
  getId(): number;
  getUserId(): number;
  getName(): string;
  getDone(): boolean;
  getTodos(): TodoType[];
  getIndex(): number;
  getTodo(): TodoType;
  showError(error: string, type: string): void;
}