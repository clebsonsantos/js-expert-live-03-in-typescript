import { v4 as uuid} from "uuid"

type Params = {
  text: string
  when: Date
  status: string
}

export class Todo {
  constructor(params: Params) {
    Object.assign(this, {
      id: uuid(),
      ...params
    })
  }
}
