import { IEditTodoForm } from "@/interfaces/IEditTodoForm";
import { Todo } from "@/models/Todo";

export class EditTodoFormPresenter {
  private view: IEditTodoForm;
  private model: Todo;
  constructor(view: IEditTodoForm, model: Todo | null = null) {
    this.view = view;
    this.model = model ?? new Todo(-1, "", false);
  }
  public setName(name: string) {
    this.model.setName(name);
  }
  public updateTodo() {
    const todosCopy = this.view.getTodos().slice();
    todosCopy[this.view.getIndex()] = {
      id: this.model.getId(),
      name: this.model.getName(),
      done: this.model.getDone(),
    };
    this.model.updateTodo();
    this.view.$emit("update:todos", todosCopy);
  }
}
