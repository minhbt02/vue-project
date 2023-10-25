import { IRegisterForm } from "@/interfaces/IRegisterForm";
import { User } from "@/models/User";

export class RegisterFormPresenter {
  private view: IRegisterForm;
  private model: User;
  constructor(view: IRegisterForm, model: User | null = null) {
    this.view = view;
    this.model = model ?? new User();
  }
  public setModel(id: number, username: string, password: string) {
    this.model.setId(id);
    this.model.setUsername(username);
    this.model.setPassword(password);
  }
  public newUser() {
    try {
      User.all().then((returnData) => {
        if (
          returnData.find((element) => {
            return this.view.getUsername() === element.username;
          })
        ) {
          console.log("Existed username");
        } else {
          if (this.view.getPassword() === this.view.getPasswordConfirm()) {
            this.setModel(
              this.findNewId(returnData),
              this.view.getUsername(),
              this.view.getPassword()
            );
            this.model.createUser();
            this.view.getStore().commit("register");
            this.view.$emit("update:register-chosen", false);
          } else {
            console.log("Passwords don't match");
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  public findNewId(
    users: Array<{ id: number; username: string; password: string }>
  ): number {
    let max = Number(users[0].id);
    for (let i = 0; i < users.length - 1; i++) {
      if (users[i].id < users[i + 1].id) {
        max = Number(users[i + 1].id);
      }
    }
    return max + 1;
  }
}
