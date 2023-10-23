import { createData, deleteData, loadData, updateData } from "@/services";

export class Todo {
  constructor(
    private id: number,
    private name: string,
    private done: boolean
  ) {}
  public getId(): number {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public getName(): string {
    return this.name;
  }
  public setName(name: string): void {
    this.name = name;
  }
  public getDone(): boolean {
    return this.done;
  }
  public setDone(done: boolean): void {
    this.done = done;
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
      id: this.id,
      name: this.name,
      done: this.done,
    };
    createData("todos", JSON.stringify(data));
  }
  public static createTodo(data: object): void {
    createData("todos", JSON.stringify(data));
  }
  public updateTodo(): void {
    try {
      const data = {
        id: this.id,
        name: this.name,
        done: this.done,
      };
      updateData("todos", this.id, JSON.stringify(data));
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
      deleteData("todos", this.id);
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
