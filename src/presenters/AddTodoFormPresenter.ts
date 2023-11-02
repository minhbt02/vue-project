import { TodoInteractor } from "@/interactors/TodoInteractor";
import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { TodoType } from "@/repo/services/todo.service";
import { DataError, BadRequestError, NotFoundError } from "@/utils/error";

export class AddTodoFormPresenter {
  private view: IAddTodoForm;
  private interactor: TodoInteractor;
  constructor(view: IAddTodoForm, interactor: TodoInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new TodoInteractor();
  }
  public async addTodo(): Promise<TodoType> {
    try {
      return await this.interactor.createTodo(this.view.getTodo());
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
      return { id: -1, userId: -1, name: "", done: false };
    }
  }
}
