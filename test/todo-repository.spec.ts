import { TodoRepository } from "./../src/todo-repository"
import { describe, it, before, afterEach } from "mocha"
import { expect } from "chai"
import Sinon, { createSandbox } from "sinon"

describe("todoRepository", ()=> {
  let todoRepository: TodoRepository
  let sandBox: Sinon.SinonSandbox

  before(()=>{
    todoRepository = new TodoRepository()
    sandBox = createSandbox()
  })

  afterEach(()=> {
    sandBox.restore()
  })

  describe("methods signature", () => {
    it("should call find from lokijs", () => {
      const mockData = [
        {
          text: "todo",
          when: new Date(),
          status: "active",
          meta: {},
          "$loki": 1
        }
      ]
      const expectedReturn = mockData
      sandBox.stub(
        todoRepository.schedule,
        "find"
      ).returns(expectedReturn)

      const result = todoRepository.list()

      expect(result).to.be.deep.equal(expectedReturn)
      expect(todoRepository.schedule["find"].call.length).to.be.deep.equal(1)

    })

    it("should call insertOne from lokijs", () => {
      const expectedReturn = true

      sandBox.stub(
        todoRepository.schedule,
        "insertOne"
      ).returns(expectedReturn)

      const data = { 
        text: "todo",
        when: new Date("2022-12-01"),
        status: "active"
      }

      const result = todoRepository.create(data)

      expect(result).to.be.ok
      expect(todoRepository.schedule["insertOne"].call.length).to.be.deep.equal(1)
    })
  })
})