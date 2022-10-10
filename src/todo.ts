import { v4 as uuid} from "uuid"

export type Params = {
  text: string
  when: Date
  status?: string
}

export class Todo {
  public id: string
  public text: string
  public when: Date
  public status: string

  constructor(params: Params) {
    Object.assign(this, {
      id: uuid(),
      ...params
    })
  }

  isValid() {
    return !!this.text && !isNaN(this.when.valueOf())
  }
}
