import { UserInteractor } from "@/interactors/UserInteractor";
import { IRegisterForm } from "@/interfaces/IRegisterForm";
import { DataError, BadRequestError, NotFoundError } from "@/utils/error";

export class RegisterFormPresenter {
  private view: IRegisterForm;
  private interactor: UserInteractor;
  constructor(view: IRegisterForm, interactor: UserInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new UserInteractor();
  }
  public setModel(id: number, username: string, password: string) {
    this.view.setUser({
      id: id,
      username: username,
      password: password,
    });
  }
  public async newUser(): Promise<void> {
    try {
      await this.interactor.all().then((returnData) => {
        if (
          returnData.find((element) => {
            return this.view.getUsername() === element.username;
          })
        ) {
          this.view.showError("Existed username", "fail");
        } else {
          if (this.view.getPassword() === this.view.getPasswordConfirm()) {
            this.setModel(
              this.view.getId(),
              this.view.getUsername(),
              this.view.getPassword()
            );
            const createNewUser = async () => {
              await this.interactor
                .createUser(this.view.getUser())
                .catch((error: any) => {
                  if (error instanceof DataError) {
                    this.view.showError("Data error", "fail");
                  } else if (error instanceof BadRequestError) {
                    this.view.showError(
                      "Invalid response from the repository",
                      "fail"
                    );
                  } else {
                    this.view.showError("System Error", "fail");
                  }
                });
            };
            createNewUser();
            this.view.getStore().commit("register");
            this.view.$emit("update:register-chosen", false);
          } else {
            this.view.showError("Passwords don't match", "warning");
          }
        }
      });
    } catch (error: any) {
      if (error instanceof DataError) {
        this.view.showError("Data error", "fail");
      } else if (error instanceof BadRequestError) {
        this.view.showError("Invalid response from the repository", "fail");
      } else if (error instanceof NotFoundError) {
        this.view.showError("Todo not found", "fail");
      } else {
        this.view.showError("System Error", "fail");
      }
    }
  }
  public displayError(message: string, type: string) {
    this.view.setPopUpType(type);
    this.view.setPopUpMessage(message);
    this.view.getStore().commit("showPopUp");
  }
}
