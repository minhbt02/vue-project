import { IRegisterForm } from "@/interfaces/IRegisterForm";
import { User } from "@/models/User";

export class RegisterFormPresenter {
  constructor(private view: IRegisterForm, private model: User) {}
  public newUser() {
    try {
      User.all().then((returnData) => {
        if (
          returnData.find((element) => {
            return this.view.username === element.username;
          })
        ) {
          console.log("Existed username");
        } else {
          if (this.view.password === this.view.passwordConfirm) {
            this.model.setId(this.findNewId(returnData));
            this.model.setUsername(this.view.username);
            this.model.setPassword(this.view.password);
            this.model.createUser();
            this.view.$emit("update:register-success", true);
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
