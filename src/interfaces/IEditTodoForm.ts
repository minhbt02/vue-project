import { TodoType } from "@/repo/services/todo.service";

export interface IEditTodoForm {
  getId(): number;
  getUserId(): number;
  getName(): string;
  getDone(): boolean;
  getTodo(): TodoType;
  showError(error: string, type: string): void;
}