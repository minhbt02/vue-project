import { createData, deleteData, loadData, updateData } from "@/services";

export class User {
  constructor(
    private id: number,
    private username: string,
    private password: string
  ) {}
  public getId(): number {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public getUsername(): string {
    return this.username;
  }
  public setUsername(username: string): void {
    this.username = username;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public all(): Promise<
    Array<{ id: number; username: string; password: boolean }>
  > {
    return loadData("user");
  }
  public static all(): Promise<
    Array<{ id: number; username: string; password: boolean }>
  > {
    return loadData("user");
  }
  public createUser() {
    const data = {
      id: this.id,
      username: this.username,
      password: this.password,
    };
    createData("user", JSON.stringify(data));
  }
  public updateUser(): void {
    const data = {
      id: this.id,
      username: this.username,
      password: this.password,
    };
    updateData("user", this.id, JSON.stringify(data));
  }
  public deleteUser(): void {
    deleteData("user", this.id);
  }
}
