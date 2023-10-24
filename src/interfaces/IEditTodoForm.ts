export interface IEditTodoForm {
  getTodos(): Array<{ id: number, name: string, done: boolean }>;
  getIndex(): number;
  setName(): () => void;
  $emit(event: string, ...args: any[]): () => void;
}