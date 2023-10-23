export interface IEditTodoForm {
  todos: Array<{ id: number, name: string, done: boolean }>;
  todo: Object;
  index: number;
  setName(): () => void;
  $emit(event: string, ...args: any[]): () => void;
}