import { TodoInteractor } from "@/interactors/TodoInteractor";
import { IEditTodoForm } from "@/interfaces/IEditTodoForm";
import { TodoType } from "@/repo/services/todo.service";
import { DataError, BadRequestError, NotFoundError } from "@/utils/error";

export class EditTodoFormPresenter {
  private view: IEditTodoForm;
  private interactor: TodoInteractor;
  constructor(view: IEditTodoForm, interactor: TodoInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new TodoInteractor();
  }
  public async updateTodo(): Promise<TodoType> {
    try {
      return await this.interactor.updateTodo(this.view.getTodo());
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
      return {
        id: this.view.getId(),
        userId: this.view.getUserId(),
        name: this.view.getName(),
        done: this.view.getDone(),
      };
    }
  }
}
