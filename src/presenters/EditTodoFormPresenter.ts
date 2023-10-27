import { TodoInteractor } from "@/interactors/TodoInteractor";
import { IEditTodoForm } from "@/interfaces/IEditTodoForm";
import { DataError, BadRequestError, NotFoundError } from "@/utils/error";

export class EditTodoFormPresenter {
  private view: IEditTodoForm;
  private interactor: TodoInteractor;
  constructor(view: IEditTodoForm, interactor: TodoInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new TodoInteractor();
  }
  public async updateTodo(): Promise<void> {
    const todosCopy = this.view.getTodos().slice();
    try {
      await this.interactor.updateTodo(this.view.getTodo()).then(() => {
        todosCopy[this.view.getIndex()] = this.view.getTodo();
        this.view.$emit("update:todos", todosCopy);
        this.view.setPopUpType("success");
        this.view.setPopUpMessage("Successully edited todo");
        this.view.getStore().commit("showPopUp");
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
  public displayError(error: string, type: string) {
    this.view.setPopUpMessage(error);
    this.view.setPopUpType(type);
    this.view.getStore().commit("showPopUp");
  }
}
