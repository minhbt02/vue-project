import { ILoginForm } from "@/interfaces/ILoginForm";
import { UserInteractor } from "@/interactors/UserInteractor";
import { DataError, BadRequestError, NotFoundError } from "@/utils/error";
import { UserType } from "@/repo/services/user.service";

export class LoginFormPresenter {
  private view: ILoginForm;
  private interactor: UserInteractor;
  constructor(view: ILoginForm, interactor: UserInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new UserInteractor();
  }
  public async authenticate(): Promise<UserType[]> {
    try {
      return await this.interactor.all();
    } catch (error: any) {
      if (error instanceof DataError) {
        this.view.showError("Data error");
      } else if (error instanceof BadRequestError) {
        this.view.showError("Invalid response from the repository");
      } else {
        this.view.showError("System Error");
      }
      return [];
    }
  }
}
