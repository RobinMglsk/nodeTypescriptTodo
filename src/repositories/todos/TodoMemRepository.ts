import TodoInterface from "./TodoInterface";
import TodoModel from "../../models/Todo";
import { v4 as uuid } from "uuid";

export default class TodoMemRepository implements TodoInterface {
  private Todos: TodoModel[] = [];
  private static instance: TodoMemRepository;
  private constructor() {}

  index() {
    return this.Todos.slice();
  }

  create(name: string, description: string) {
    const todo = new TodoModel(uuid(), name, description);
    this.Todos.push(todo);
    return todo;
  }

  read(id: string) {
    return this.findById(id);
  }

  update(id: string, name: string, description: string) {
    const todo = this.findById(id);
    if (todo) {
      todo.name = name;
      todo.description = description;
      return todo;
    } else {
      return undefined;
    }
  }

  delete(id: string) {
    const index = this.Todos.findIndex((todo) => todo.id === id);
    if (index > -1) {
      this.Todos.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  private findById(id: string): TodoModel | undefined {
    return this.Todos.find((todo) => todo.id === id);
  }

  static getInstance(): TodoMemRepository {
    if (this.instance === undefined) {
      this.instance = new TodoMemRepository();
    }

    return this.instance;
  }
}
