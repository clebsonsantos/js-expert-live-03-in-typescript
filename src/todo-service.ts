import { TodoError } from "./errors/todo-error";
import { Params, Todo } from "./todo";
import { TodoRepository } from "./todo-repository";

export class TodoService {
  constructor(public readonly todoRepository: TodoRepository) {}

  create(todoItem: Todo): TodoError | undefined {
    if (!todoItem.isValid()) {
      return new TodoError(todoItem, "invalid data")
    }
    return 
  }

  list() {
    return this.todoRepository.list()
      .map(({ meta, $loki, ...result }) => result)
  }
  
}