export interface ITodoList {
  todos: Array<{ id: number, name: string, done: boolean }>;
  todosLoaded: boolean;
  newId: number;
  showCompleted: boolean;
  filteredTodos: Array<{ id: number, name: string, done: boolean }>;
  displayedTodos: Array<{ id: number, name: string, done: boolean }>;
  length: number;
  page: number;
  setTodos(todos: Array<{ id: number, name: string, done: boolean }>): () => void;
  setTodosLoaded(): () => void;
  setNewId(id: number): () => void;
  setFilteredTodos(filteredTodos: Array<{ id: number, name: string, done: boolean }>): () => void;
  setDisplayedTodos(displayedTodos: Array<{ id: number, name: string, done: boolean }>): () => void;
  setLength(length: number): () => void;
  setPage(page: number): () => void;
  pageChange(): () => void;
  loadDataToView(): () => void;
  handleAddTodo(): () => void;
  handleEditTodo(): () => void;
  handleCompletedTodo(todo: object): () => void;
  handleDeletedTodo(todo: object): () => void;
  handleShowCompleted(): () => void;
}