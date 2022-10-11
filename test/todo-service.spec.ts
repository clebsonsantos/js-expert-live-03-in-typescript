import { TodoService } from "./../src/todo-service"
import { describe, it, before, beforeEach } from "mocha"
import { expect } from "chai"
import Sinon, { createSandbox } from "sinon"
import { TodoRepository } from "../src/todo-repository"
import { Todo } from "../src/todo"
import { TodoError } from "../src/errors/todo-error"


describe("todoService", ()=> {
  let sandBox: Sinon.SinonSandbox

  before(()=>{
    sandBox = createSandbox()
  })

  afterEach(() => {
    sandBox.restore()
  })

  describe("#list", () => {
    const mockData = [
      {
        text: "todo",
        when: new Date(),
        status: "active",
        meta: {},
        "$loki": 1
      }
    ]
    let todoService: TodoService
    beforeEach(() => {
      const todoRepository = {
        list: () => mockData,
        schedule: {},
        create: () => true
       } as unknown as TodoRepository

      todoService = new TodoService(todoRepository)
    })

    it("should return data on a specific format", () => {
      const result = todoService.list()
      const [{ meta, $loki, ...expected }] = mockData

      expect(result).to.be.deep.equal([expected])
    })
  })

  describe("#create", () => {
   
    let todoService: TodoService
    beforeEach(() => {
      const todoRepository = {
        list: () => [],
        create: () => true
       } as unknown as TodoRepository

      todoService = new TodoService(todoRepository)
    })

    it("should\"t save todo item with invalid data", () => {
      const data = new Todo({
        text: "",
        when: new Date("20-12-01")
      })
      Reflect.deleteProperty(data, "id")

      const expected = new TodoError(data, "invalid data")
      const result = todoService.create(data)
      expect(result).to.be.deep.equal(expected)
    })

    it("should save todo item with late status when the property is further than today", () => {
      const properties = {
        text: "Hello",
        when: new Date("2022-10-11")
      }

      const data = new Todo(properties)

      const today = new Date("2022-10-12")
      sandBox.useFakeTimers(today.getTime())
      const todoCreate = sandBox.spy(todoService.todoRepository, "create")

      todoService.create(data)

      const expectedCallWith = {
        ...data,
        status: "late"
      }

      expect(todoCreate.calledOnceWithExactly(expectedCallWith)).to.be.ok

    })

    it("should save todo item with peding status")
  })
})