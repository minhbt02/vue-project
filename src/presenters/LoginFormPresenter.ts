import { User } from "@/models/User";
import { ILoginForm } from "@/interfaces/ILoginForm";

export class LoginFormPresenter {
  constructor(private view: ILoginForm, private model?: User) {}
  public authenticate() {
    User.all()
      .then((returnData) => {
        if (
          returnData.find((element) => {
            return (
              this.view.username === element.username &&
              this.view.password === element.password
            );
          })
        ) {
          this.view.$emit("update:login-chosen", false);
          this.view.store.commit("login", this.view.id);
          this.view.router.push({ name: "todos" });
        } else {
          this.view.$emit("update:login-chosen", false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
