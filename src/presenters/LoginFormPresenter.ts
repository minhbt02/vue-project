import { ILoginForm } from "@/interfaces/ILoginForm";
import { UserInteractor } from "@/interactors/UserInteractor";
import { DataError, BadRequestError, NotFoundError } from "@/utils/error";

export class LoginFormPresenter {
  private view: ILoginForm;
  private interactor: UserInteractor;
  constructor(view: ILoginForm, interactor: UserInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new UserInteractor();
  }
  public async authenticate(): Promise<void> {
    await this.interactor
      .all()
      .then((returnData) => {
        const user = returnData.find((element) => {
          return (
            this.view.getUsername() === element.username &&
            this.view.getPassword() === element.password
          );
        });
        if (user) {
          this.view.setId(user.id);
          this.view.$emit("update:login-chosen", false);
          this.view.getStore().commit("login", this.view.getId());
          this.view.getRouter().push({ name: "todos" });
        } else {
          this.view.$emit("update:login-chosen", false);
        }
      })
      .catch((error: any) => {
        if (error instanceof DataError) {
          this.view.showError("Data is empty");
        } else if (error instanceof BadRequestError) {
          this.view.showError("Invalid response from the repository");
        } else if (error instanceof NotFoundError) {
          this.view.showError("Todo not found");
        } else {
          this.view.showError("System Error");
        }
      });
  }
}
