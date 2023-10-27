import { TodoInteractor } from "@/interactors/TodoInteractor";
import { ITodoList } from "@/interfaces/ITodoList";
import { TodoType } from "@/repo/services/todo.service";
import { BadRequestError, DataError, NotFoundError } from "@/utils/error";

export class TodosListPresenter {
  private view: ITodoList;
  private interactor: TodoInteractor;
  constructor(view: ITodoList, interactor: TodoInteractor | null = null) {
    this.view = view;
    this.interactor = interactor ?? new TodoInteractor();
  }
  public setTodo(todo: TodoType): void {
    this.view.setTodoItem(todo);
  }
  public async all(): Promise<TodoType[] | void> {
    try {
      const uid = this.view.getStore().state.uid;
      return await this.interactor.all(uid).then((data) => {
        this.view.setTodos(data);
        this.view.setTodosLoaded();
        this.handleChanges();
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
  public handleChanges() {
    this.view.setFilteredTodos(this.calcFilteredTodos());
    this.view.setDisplayedTodos(this.calcDisplayedTodos());
    this.view.setLength(this.calcLength());
    if (
      this.view.getDisplayedTodos().length === 0 &&
      this.view.getTodos().length > 0
    ) {
      this.view.setPage(this.view.getLength());
      this.handleChanges();
    }
  }
  public calcFilteredTodos(): TodoType[] {
    return this.view.getShowCompleted()
      ? this.view.getTodos()
      : this.view.getTodos().filter((t: any) => !t.done);
  }
  public calcDisplayedTodos(): TodoType[] {
    const todosCopy = this.view.getFilteredTodos().slice();
    const pageIndex = this.view.getPage() > 0 ? this.view.getPage() : 1;
    const start = (pageIndex - 1) * 4;
    const end = pageIndex * 4;
    return todosCopy.slice(start, end);
  }
  public calcLength(): number {
    return Math.ceil(this.view.getFilteredTodos().length / 4);
  }
  public todoCompleted(todo: TodoType): void {
    try {
      this.interactor.updateTodo(todo);
      this.handleChanges();
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
  public removeTodo(id: number): void {
    try {
      this.view.setTodos(
        this.view.getTodos().filter((t: TodoType) => t.id !== id)
      );
      this.interactor.deleteTodo(id);
      this.handleChanges();
    } catch (error: any) {
      if (error instanceof DataError) {
        this.view.showError("Data is empty");
      } else if (error instanceof BadRequestError) {
        this.view.showError("Invalid response from the repository");
      } else if (error instanceof NotFoundError) {
        this.view.showError("Todo(s) not found");
      } else {
        this.view.showError("System Error");
      }
    }
  }
  public displayError(error: string) {
    this.view.setPopUpType("fail");
    this.view.setPopUpMessage(error);
    this.view.getStore().commit("showPopUp");
  }
}
