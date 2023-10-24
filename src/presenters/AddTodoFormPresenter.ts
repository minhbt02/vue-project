import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { Todo } from "@/models/Todo";

export class AddTodoFormPresenter {
  private view: IAddTodoForm;
  private model: Todo;
  constructor(view: IAddTodoForm, model: Todo | null = null) {
    this.view = view;
    this.model = model ?? new Todo(-1, "", false);
  }
  public setModel(id: number, name: string) {
    this.model.setId(id);
    this.model.setName(name);
  }
  public setName(name: string) {
    this.model.setName(name);
  }
  public addTodo() {
    const todosCopy = this.view.getTodos().slice();
    todosCopy.push({
      id: this.model.getId(),
      name: this.model.getName(),
      done: this.model.getDone(),
    });
    this.model.createTodo();
    this.view.$emit("update:todos", todosCopy);
  }
}
