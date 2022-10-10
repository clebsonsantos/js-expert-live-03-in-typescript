import { TodoRepository } from "./../src/todo-repository"
import { describe, it, before, afterEach } from "mocha"
import { expect } from "chai"
import Sinon, { createSandbox } from "sinon"
import assert from "assert"

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
      const functionName = "find"
      const expectedReturn = mockData
      sandBox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectedReturn)

      const result = todoRepository.list()

      expect(result).to.be.deep.equal(expectedReturn)
      expect(todoRepository.schedule[functionName].call).to.be.ok
      assert.equal(todoRepository.schedule[functionName].call.length, 1)
    })

    it("should call insertOne from lokijs")
  })
})