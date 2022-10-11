import loki from "lokijs"
import { Params } from "./todo"

export class TodoRepository {
  public schedule: loki.Collection

  constructor() {
    const db = new loki("todo")
    this.schedule = db.addCollection("schedule")
  }

  public list() {
    return this.schedule.find()
  }

  public create(data: Params): boolean {
    return this.schedule.insertOne(data)
  }
}
