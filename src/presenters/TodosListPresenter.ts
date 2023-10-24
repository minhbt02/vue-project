import { ITodoList } from "@/interfaces/ITodoList";
import { Todo } from "@/models/Todo";

export class TodosListPresenter {
  private view: ITodoList;
  private model: Todo;
  constructor(view: ITodoList, model: Todo | null = null) {
    this.view = view;
    this.model = model ?? new Todo(-1, "", false);
  }
  public setModel(todo: any) {
    this.model.setId(todo.id);
    this.model.setName(todo.name);
    this.model.setDone(todo.done);
  }
  public loadDataToView(): void {
    Todo.all()
      .then(
        (returnData: Array<{ id: number; name: string; done: boolean }>) => {
          this.view.setTodos(returnData);
          this.view.setTodosLoaded();
          this.view.setNewId(this.findNewId());
          this.handleChanges();
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }
  public handleChanges() {
    this.view.setFilteredTodos(this.calcFilteredTodos());
    this.view.setDisplayedTodos(this.calcDisplayedTodos());
    this.view.setLength(this.calcLength());
    if (this.view.getDisplayedTodos().length === 0) {
      this.view.setPage(this.view.getLength());
      this.handleChanges();
    }
  }
  public calcFilteredTodos(): Array<{
    id: number;
    name: string;
    done: boolean;
  }> {
    return this.view.getShowCompleted()
      ? this.view.getTodos()
      : this.view.getTodos().filter((t: any) => !t.done);
  }
  public calcDisplayedTodos(): Array<{
    id: number;
    name: string;
    done: boolean;
  }> {
    const todosCopy = this.view.getFilteredTodos().slice();
    const pageIndex = this.view.getPage() > 0 ? this.view.getPage() : 1;
    const start = (pageIndex - 1) * 4;
    const end = pageIndex * 4;
    return todosCopy.slice(start, end);
  }
  public calcLength(): number {
    return Math.ceil(this.view.getFilteredTodos().length / 4);
  }
  public findNewId(): number {
    let max = Number(this.view.getTodos()[0].id);
    for (let i = 0; i < this.view.getTodos().length - 1; i++) {
      if (this.view.getTodos()[i].id < this.view.getTodos()[i + 1].id) {
        max = Number(this.view.getTodos()[i + 1].id);
      }
    }
    return max + 1;
  }
  public todoCompleted(todo: object): void {
    this.setModel(todo);
    if (this.model) {
      this.model.updateTodo();
      this.handleChanges();
    } else {
      console.log("Fail to execute: TodoListPresenter.todoCompleted()");
    }
  }
  public removeTodo(todo: object): void {
    this.setModel(todo);
    if (this.model) {
      this.view.setTodos(this.view.getTodos().filter((t: any) => t !== todo));
      this.model.deleteTodo();
      this.handleChanges();
    } else {
      console.log("Fail to execute: TodoListPresenter.removeTodo()");
    }
  }
}
