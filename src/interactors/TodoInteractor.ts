import { Todo } from "@/models/Todo";
import {
  ITodoService,
  TodoType,
  TodoService,
} from "@/repo/services/todo.service";

export class TodoInteractor {
  private todoService: TodoService;
  constructor(todoService: ITodoService | null = null) {
    this.todoService = todoService ?? new TodoService();
  }
  public async all(uid: number): Promise<TodoType[]> {
    try { // eslint-disable-line
      return await this.todoService.all(uid);
    } catch (error) {
      throw error;
    }
  }
  public async createTodo(todo: TodoType): Promise<TodoType> {
    try { // eslint-disable-line
      const newTodo = new Todo();
      newTodo.setId(todo.id);
      newTodo.setUserId(todo.userId);
      newTodo.setName(todo.name);
      return await this.todoService.createTodo(newTodo.getModel());
    } catch (error) {
      throw error;
    }
  }
  public async updateTodo(todo: TodoType): Promise<TodoType> {
    try { // eslint-disable-line
      const newTodo = new Todo();
      newTodo.setId(todo.id);
      newTodo.setUserId(todo.userId);
      newTodo.setName(todo.name);
      newTodo.setDone(todo.done);
      return await this.todoService.updateTodo(newTodo.getModel());
    } catch (error) {
      throw error;
    }
  }
  public async deleteTodo(id: number): Promise<TodoType> {
    try { // eslint-disable-line
      return await this.todoService.deleteTodo(id);
    } catch (error) {
      throw error;
    }
  }
}
