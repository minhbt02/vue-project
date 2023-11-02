import { TodoType } from "@/repo/services/todo.service";

export interface ITodoList {
  getTodos(): TodoType[];
  getShowCompleted(): boolean;
  getFilteredTodos(): TodoType[];
  getDisplayedTodos(): TodoType[];
  getLength(): number;
  getPage(): number;
  setPopUpType(type: string): () => void;
  setPopUpMessage(message: string): () => void;
  setTodos(todos: TodoType[]): () => void;
  setTodoItem(todo: TodoType): () => void;
  setTodosLoaded(): () => void;
  setNewId(id: number): () => void;
  setFilteredTodos(filteredTodos: TodoType[]): () => void;
  setDisplayedTodos(displayedTodos: TodoType[]): () => void;
  setLength(length: number): () => void;
  setPage(page: number): () => void;
  showError(error: string): () => void;
}