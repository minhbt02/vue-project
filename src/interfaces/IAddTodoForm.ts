import { Todo } from "@/models/Todo";

export interface IAddTodoForm {
  todos: Array<{ id: number, name: string, done: boolean }>,
  todo: Todo,
}