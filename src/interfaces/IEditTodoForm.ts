import { Todo } from "@/models/Todo";

export interface IEditTodoForm {
  todos: Array<{ id: number, name: string, done: boolean }>,
  todo: Object,
  model: Todo,
  index: number,
}