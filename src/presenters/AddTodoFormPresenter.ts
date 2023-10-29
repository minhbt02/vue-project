import { TodoInteractor } from "@/interactors/TodoInteractor";
import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { DataError, BadRequestError, NotFoundError } from "@/utils/error";

export class AddTodoFormPresenter {
  private view: IAddTodoForm;
  private interactor: TodoInteractor;
  constructor(view: IAddTodoForm, interactor: TodoInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new TodoInteractor();
  }
  public setName(name: string) {
    this.view.setName(name);
  }
  public async addTodo(): Promise<void> {
    try {
      await this.interactor.createTodo(this.view.getTodo()).then((data) => {
        this.view.setTodo(data);
        this.view.setPopUpType("success");
        this.view.setPopUpMessage("Successully added todo");
      });
    } catch (error: any) {
      if (error instanceof DataError) {
        this.view.showError(error.message, "warning");
      } else if (error instanceof BadRequestError) {
        this.view.showError("Invalid response from the repository", "fail");
      } else if (error instanceof NotFoundError) {
        this.view.showError("Todo not found", "fail");
      } else {
        this.view.showError("System Error", "fail");
      }
    }
  }
}
