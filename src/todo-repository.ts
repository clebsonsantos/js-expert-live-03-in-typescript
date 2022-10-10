import loki from "lokijs"
import { Params } from "./todo"

export class TodoRepository {
  public schedule: loki.Collection

  constructor() {
    const db = new loki("todo", {})
    this.schedule = db.addCollection("schedule")
  }

  list() {
    return this.schedule.find()
  }

  create(data: Params) {
    return this.schedule.insertOne(data)
  }
}
