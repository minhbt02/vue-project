import { TodoType } from "@/repo/services/todo.service";
import { Store } from "vuex";

export interface IEditTodoForm {
  setPopUpType(type: string): () => void;
  setPopUpMessage(message: string): () => void;
  getTodos(): TodoType[];
  getIndex(): number;
  getTodo(): TodoType;
  showError(error: string, type: string): () => void;
  $emit(event: string, ...args: any[]): () => void;
  getStore(): Store<any>;
}