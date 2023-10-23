import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { Todo } from "@/models/Todo";

export class AddTodoFormPresenter {
  constructor(private view: IAddTodoForm, private model: Todo) {}
  public setModel(todo: Todo) {
    this.model = todo;
  }
  public newTodo() {
    this.view.todos.push({
      id: this.model.getId(),
      name: this.model.getName(),
      done: this.model.getDone(),
    });
    this.model.createTodo();
  }
}
