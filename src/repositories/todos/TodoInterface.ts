import TodoModel from "../../models/Todo";

export default interface TodoRepository {
  index(): TodoModel[];
  create(title: string, description: string): TodoModel;
  read(id: string): TodoModel | undefined;
  update(id: string, title: string, description: string): TodoModel | undefined;
  delete(id: string): boolean;
}
