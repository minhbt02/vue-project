import { createData, deleteData, loadData, updateData } from "@/utils/hooks";
import { DataError } from "@/utils/error";
import { TodoType } from "@/repo/services/todo.service";

export class Todo {
  private _id!: number;
  private _userId!: number;
  private _name!: string;
  private _done = false;
  public getModel(): TodoType {
    const todo: TodoType = {
      id: this.getId(),
      userId: this.getUserId(),
      name: this.getName(),
      done: this.getDone(),
    };
    return todo;
  }
  public getId(): number {
    return this._id;
  }
  public setId(id: number): void {
    this._id = id;
  }
  public getUserId(): number {
    return this._userId;
  }
  public setUserId(userId: number): void {
    this._userId = userId;
  }
  public getName(): string {
    return this._name;
  }
  public setName(name: string): void {
    if (name.length > 60 || name.length === 0) {
      throw new DataError("Invalid todo name");
    }
    this._name = name;
  }
  public getDone(): boolean {
    return this._done;
  }
  public setDone(done: boolean): void {
    this._done = done;
  }
  public all(): Promise<Array<{ id: number; name: string; done: boolean }>> {
    return loadData("todos");
  }
  public static all(): Promise<
    Array<{ id: number; name: string; done: boolean }>
  > {
    return loadData("todos");
  }
  public createTodo(): void {
    const data = {
      id: this.getId(),
      name: this.getName(),
      done: this.getDone(),
    };
    createData("todos", JSON.stringify(data));
  }
  public static createTodo(data: object): void {
    createData("todos", JSON.stringify(data));
  }
  public updateTodo(): void {
    try {
      const data = {
        id: this.getId(),
        name: this.getName(),
        done: this.getDone(),
      };
      updateData("todos", this.getId(), JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }
  public static updateTodo(data: {
    id: number;
    name: string;
    done: boolean;
  }): void {
    updateData("todos", data.id, JSON.stringify(data));
  }
  public deleteTodo(): void {
    try {
      deleteData("todos", this.getId());
    } catch (err) {
      console.log(err);
    }
  }
  public static deleteTodo(data: {
    id: number;
    name: string;
    done: boolean;
  }): void {
    deleteData("todos", data.id);
  }
}
