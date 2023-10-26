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
          console.log("Existed username");
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
                    this.view.showError("Data is empty");
                  } else if (error instanceof BadRequestError) {
                    this.view.showError("Invalid response from the repository");
                  } else if (error instanceof NotFoundError) {
                    this.view.showError("Todo not found");
                  } else {
                    this.view.showError("System Error");
                  }
                });
            };
            createNewUser();
            this.view.getStore().commit("register");
            this.view.$emit("update:register-chosen", false);
          } else {
            console.log("Passwords don't match");
          }
        }
      });
    } catch (error: any) {
      if (error instanceof DataError) {
        this.view.showError("Data is empty");
      } else if (error instanceof BadRequestError) {
        this.view.showError("Invalid response from the repository");
      } else if (error instanceof NotFoundError) {
        this.view.showError("Todo not found");
      } else {
        this.view.showError("System Error");
      }
    }
  }
}
