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
      todosCopy[this.view.getIndex()] = this.view.getTodo();
      await this.interactor.updateTodo(this.view.getTodo());
      this.view.$emit("update:todos", todosCopy);
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
