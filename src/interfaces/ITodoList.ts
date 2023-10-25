import { TodoType } from "@/repo/services/todo.service";
import { Store } from "vuex";

export interface ITodoList {
  getStore(): Store<any>,
  getTodos(): TodoType[];
  getShowCompleted(): boolean;
  getFilteredTodos(): TodoType[];
  getDisplayedTodos(): TodoType[];
  getLength(): number;
  getPage(): number;
  setTodos(todos: TodoType[]): () => void;
  setTodosLoaded(): () => void;
  setNewId(id: number): () => void;
  setFilteredTodos(filteredTodos: TodoType[]): () => void;
  setDisplayedTodos(displayedTodos: TodoType[]): () => void;
  setLength(length: number): () => void;
  setPage(page: number): () => void;
  showError(error: string): () => void;
  getTodos(): () => void;
}