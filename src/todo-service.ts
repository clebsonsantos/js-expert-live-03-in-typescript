import { TodoError } from "./errors/todo-error";
import { Todo } from "./todo";
import { TodoRepository } from "./todo-repository";

export class TodoService {
  constructor(public readonly todoRepository: TodoRepository) {}

  create(todoItem: Todo): TodoError | boolean {
    if (!todoItem.isValid()) {
      return new TodoError(todoItem, "invalid data")
    }
    const { when } = todoItem
    const today = new Date()
    const todo = {
      ...todoItem,
      status: when > today ? "pending" : "late"
    }
    return this.todoRepository.create(todo)
  }

  list() {
    return this.todoRepository.list()
      .map(({ meta, $loki, ...result }) => result)
  }
  
}