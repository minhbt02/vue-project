import { ITodoList } from "@/interfaces/ITodoList";
import { Todo } from "@/models/Todo";

export class TodosListPresenter {
  constructor(private view: ITodoList, private model: Todo) {}
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
    this.view.setFilteredTodos(this.getFilteredTodos());
    this.view.setDisplayedTodos(this.getDisplayedTodos());
    this.view.setLength(this.calcLength());
    if (this.view.displayedTodos.length === 0) {
      this.view.setPage(this.view.length);
      this.handleChanges();
    }
  }
  public getFilteredTodos(): Array<{
    id: number;
    name: string;
    done: boolean;
  }> {
    return this.view.showCompleted
      ? this.view.todos
      : this.view.todos.filter((t: any) => !t.done);
  }
  public getDisplayedTodos(): Array<{
    id: number;
    name: string;
    done: boolean;
  }> {
    const todosCopy = this.view.filteredTodos.slice();
    const pageIndex = this.view.page > 0 ? this.view.page : 1;
    const start = (pageIndex - 1) * 4;
    const end = pageIndex * 4;
    return todosCopy.slice(start, end);
  }
  public calcLength(): number {
    return Math.ceil(this.view.filteredTodos.length / 4);
  }
  public findNewId(): number {
    let max = Number(this.view.todos[0].id);
    for (let i = 0; i < this.view.todos.length - 1; i++) {
      if (this.view.todos[i].id < this.view.todos[i + 1].id) {
        max = Number(this.view.todos[i + 1].id);
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
      this.view.setTodos(this.view.todos.filter((t: any) => t !== todo));
      this.model.deleteTodo();
      this.handleChanges();
    } else {
      console.log("Fail to execute: TodoListPresenter.removeTodo()");
    }
  }
}
