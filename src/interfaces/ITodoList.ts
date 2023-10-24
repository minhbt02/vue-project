export interface ITodoList {
  getTodos(): Array<{ id: number, name: string, done: boolean }>;
  getShowCompleted(): boolean;
  getFilteredTodos(): Array<{ id: number, name: string, done: boolean }>;
  getDisplayedTodos(): Array<{ id: number, name: string, done: boolean }>;
  getLength(): number;
  getPage(): number;
  setTodos(todos: Array<{ id: number, name: string, done: boolean }>): () => void;
  setTodosLoaded(): () => void;
  setNewId(id: number): () => void;
  setFilteredTodos(filteredTodos: Array<{ id: number, name: string, done: boolean }>): () => void;
  setDisplayedTodos(displayedTodos: Array<{ id: number, name: string, done: boolean }>): () => void;
  setLength(length: number): () => void;
  setPage(page: number): () => void;
  getTodos(): () => void;
  pageChange(): () => void;
  loadDataToView(): () => void;
  handleAddTodo(): () => void;
  handleEditTodo(): () => void;
  handleCompletedTodo(todo: object): () => void;
  handleDeletedTodo(todo: object): () => void;
  handleShowCompleted(): () => void;
}