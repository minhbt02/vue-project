import { Todo } from "@/models/Todo";

export interface IAddTodoForm {
  todos: Array<{ id: number, name: string, done: boolean }>;
  setTodos(todos: Array<{ id: number, name: string, done: boolean }>): () => void;
  $emit(event: string, ...args: any[]): () => void;
}