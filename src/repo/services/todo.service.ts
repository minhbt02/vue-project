import { request } from "@/utils/hooks";
import { BadRequestError, NotFoundError } from "@/utils/error";

export type TodoType = {
  id: number;
  userId: number;
  name: string;
  done: boolean;
};

export interface ITodoService {
  all(uid: number): Promise<TodoType[]>;
  createTodo(todo: TodoType): Promise<TodoType>;
  updateTodo(todo: TodoType): Promise<void>;
  deleteTodo(id: number): Promise<void>;
}

export class TodoService implements ITodoService {
  public async all(uid: number): Promise<TodoType[]> {
    try {
      const res = await request.get(`/users/${uid}/todos`);
      if (!res.data) {
        throw new NotFoundError();
      }
      const data: TodoType[] = res.data;
      return data;
    } catch (error: any) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new BadRequestError();
        case 404:
          throw new NotFoundError();
        default:
          throw error;
      }
    }
  }
  public async createTodo(todo: TodoType): Promise<TodoType> {
    try {
      const newTodo = {
        userId: todo.userId,
        name: todo.name,
        done: todo.done,
      };
      const res = await request.post("/todos", newTodo);
      if (!res.data) {
        throw new NotFoundError();
      }
      const data: TodoType = res.data;
      return data;
    } catch (error: any) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new BadRequestError();
        case 404:
          throw new NotFoundError();
        default:
          throw error;
      }
    }
  }
  public async updateTodo(todo: TodoType): Promise<void> {
    try {
      const res = await request.put(`/todos/${todo.id}`, todo);
      if (!res.data) {
        throw new NotFoundError();
      }
    } catch (error: any) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new BadRequestError();
        case 404:
          throw new NotFoundError();
        default:
          throw error;
      }
    }
  }
  public async deleteTodo(id: number): Promise<void> {
    try {
      const res = await request.delete(`/todos/${id}`);
      if (!res.data) {
        throw new NotFoundError();
      }
    } catch (error: any) {
      const status = error.reponse.status;
      switch (status) {
        case 400:
          throw new BadRequestError();
        case 404:
          throw new NotFoundError();
        default:
          throw error;
      }
    }
  }
}
