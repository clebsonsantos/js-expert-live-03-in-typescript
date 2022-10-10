import { Todo } from "./../src/todo";
import { describe, it, before } from "mocha"
import { expect } from "chai"


describe("Todo", () => {
  describe("#isValid", () => {
    it("should return invalid when creating an object without text", () => {
      const data = {
        text: "",
        when: new Date("2022-12-01")
      }
      const todo = new Todo(data)
      const result = todo.isValid()
      expect(result).to.be.not.ok
    })

    it("should return invalid when creating an object using the 'when' property invalid", () => {
      const data = {
        text: "hello word",
        when: new Date("20-12-01")
      }
      const todo = new Todo(data)
      const result = todo.isValid()
      expect(result).to.be.not.ok
    })

    it("should have 'id', 'text', 'when' and 'status', properties after creating object", () => {
      const data = {
        text: "hello word",
        when: new Date("2022-12-01")
      }
      const todo = new Todo(data)
      const result = todo.isValid()
      expect(result).to.be.ok
    })
  })
})