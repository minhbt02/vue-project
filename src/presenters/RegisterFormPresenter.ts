import { UserInteractor } from "@/interactors/UserInteractor";
import { IRegisterForm } from "@/interfaces/IRegisterForm";
import { UserType } from "@/repo/services/user.service";
import { DataError, BadRequestError, NotFoundError } from "@/utils/error";

export class RegisterFormPresenter {
  private view: IRegisterForm;
  private interactor: UserInteractor;
  constructor(view: IRegisterForm, interactor: UserInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new UserInteractor();
  }
  public async getAll(): Promise<UserType[]> {
    try {
      return await this.interactor.all();
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
      return [];
    }
  }
  public async newUser(): Promise<UserType> {
    try {
      return await this.interactor.createUser(this.view.getUser());
    } catch (error: any) {
      if (error instanceof DataError) {
        this.view.showError("Data error", "fail");
      } else if (error instanceof BadRequestError) {
        this.view.showError("Invalid response from the repository", "fail");
      } else {
        this.view.showError("System Error", "fail");
      }
      return { id: -1, username: "", password: "" };
    }
  }
}
