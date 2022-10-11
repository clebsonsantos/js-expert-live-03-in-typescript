export class TodoError {
  public data: object
  public message: string
  public name: string

  constructor (data: object, message: string) {
    this.data = data
    this.message = message
    this.name = 'TodoError'
  }
}