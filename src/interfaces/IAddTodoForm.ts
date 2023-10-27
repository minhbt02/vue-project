import { TodoType } from "@/repo/services/todo.service";
import { Store } from "vuex";

export interface IAddTodoForm {
  setName(name: string): () => void;
  setTodo(todo: TodoType): () => void;
  setPopUpType(type: string): () => void;
  setPopUpMessage(message: string): () => void;
  getStore(): Store<any>;
  getTodos(): TodoType[];
  getTodo(): TodoType;
  getNewId(): number;
  getName(): string;
  showError(error: string, type: string): () => void;
  $emit(event: string, ...args: any[]): () => void;
}