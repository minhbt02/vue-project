import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { Todo } from "@/models/Todo";

export class AddTodoFormPresenter {
  constructor(private view: IAddTodoForm, private model: Todo) {}
  public setName(name: string) {
    this.model.setName(name);
  }
  public addTodo() {
    const todosCopy = this.view.todos.slice();
    todosCopy.push({
      id: this.model.getId(),
      name: this.model.getName(),
      done: this.model.getDone(),
    });
    this.model.createTodo();
    this.view.$emit("update:todos", todosCopy);
  }
}
