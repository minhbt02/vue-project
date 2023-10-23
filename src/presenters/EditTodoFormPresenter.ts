import { IEditTodoForm } from "@/interfaces/IEditTodoForm";
import { Todo } from "@/models/Todo";

export class EditTodoFormPresenter {
  constructor(private view: IEditTodoForm, private model: Todo) {}
  public setName(name: string) {
    this.model.setName(name);
  }
  public updateTodo() {
    const todosCopy = this.view.todos.slice();
    todosCopy[this.view.index] = {
      id: this.model.getId(),
      name: this.model.getName(),
      done: this.model.getDone(),
    };
    this.model.updateTodo();
    this.view.$emit("update:todos", todosCopy);
  }
}
