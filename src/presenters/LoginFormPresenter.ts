import { User } from "@/models/User";
import { ILoginForm } from "@/interfaces/ILoginForm";

export class LoginFormPresenter {
  constructor(private view: ILoginForm, private model?: User) {}
  // public authenticate() {

  // }
  public setModel(todo: any) {
    const todoObject = new User(todo.id, todo.name, todo.done);
    this.model = todoObject;
  }
}
