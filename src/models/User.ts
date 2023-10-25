import { createData, deleteData, loadData, updateData } from "@/utils/hooks";
import { DataError } from "@/utils/error";
import { UserType } from "@/repo/services/user.service";

export class User {
  private _id!: number;
  private _username!: string;
  private _password!: string;
  public getModel(): UserType {
    const user: UserType = {
      id: this.getId(),
      username: this.getUsername(),
      password: this.getPassword(),
    };
    return user;
  }
  public getId(): number {
    return this._id;
  }
  public setId(id: number): void {
    this._id = id;
  }
  public getUsername(): string {
    return this._username;
  }
  public setUsername(username: string): void {
    if (username.length < 6 && username.length > 20) {
      throw new DataError();
    }
    this._username = username;
  }
  public getPassword(): string {
    return this._password;
  }
  public setPassword(password: string): void {
    if (password.length < 6 && password.length > 32) {
      throw new DataError();
    }
    this._password = password;
  }
  public all(): Promise<
    Array<{ id: number; username: string; password: string }>
  > {
    return loadData("user");
  }
  public static all(): Promise<
    Array<{ id: number; username: string; password: string }>
  > {
    return loadData("user");
  }
  public createUser() {
    const data = {
      id: this.getId(),
      username: this.getUsername(),
      password: this.getPassword(),
    };
    createData("user", JSON.stringify(data));
  }
  public updateUser(): void {
    const data = {
      id: this.getId(),
      username: this.getUsername(),
      password: this.getPassword(),
    };
    updateData("user", this.getId(), JSON.stringify(data));
  }
  public deleteUser(): void {
    deleteData("user", this.getId());
  }
}
