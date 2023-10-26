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
    const todosCopy = this.view.getTodos().slice();
    try {
      await this.interactor.createTodo(this.view.getTodo()).then((data) => {
        this.view.setTodo(data);
        todosCopy.push({
          id: this.view.getTodo().id,
          userId: this.view.getTodo().userId,
          name: this.view.getTodo().name,
          done: this.view.getTodo().done,
        });
        this.view.$emit("update:todos", todosCopy);
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
