export interface IAddTodoForm {
  getTodos(): Array<{ id: number, name: string, done: boolean }>;
  getNewId(): number;
  getName(): string;
  setTodos(todos: Array<{ id: number, name: string, done: boolean }>): () => void;
  $emit(event: string, ...args: any[]): () => void;
}