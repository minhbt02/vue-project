import { AddTodoFormPresenter } from "@/presenters/AddTodoFormPresenter";
import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { TodoInteractor } from "@/interactors/TodoInteractor";
import { ITodoService } from "@/repo/services/todo.service";
import { BadRequestError, DataBaseError, DataError, NotFoundError } from "@/utils/error";

describe("AddTodoForm", () => {
  let sut: AddTodoFormPresenter;
  let view: IAddTodoForm;
  let service: ITodoService;
  let interactor: TodoInteractor;
  const testCases = [
    {
      testname: "should return newly created todo",
      mockImpl: jest.fn().mockResolvedValue({ id: 1, userId: 1, name: "New Todo", done: false }),
      expected: { id: 1, userId: 1, name: "New Todo", done: false },
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "New Todo", done: false }),
      callTimes: 0,
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: { id: -1, userId: -1, name: "", done: false },
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "New Todo", done: false }),
      callTimes: 1,
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to add todo")),
      expected: { id: -1, userId: -1, name: "", done: false },
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "New Todo", done: false }),
      callTimes: 1,
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to add todo")),
      expected: { id: -1, userId: -1, name: "", done: false },
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "New Todo", done: false }),
      callTimes: 1,
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to add todo")),
      expected: { id: -1, userId: -1, name: "", done: false },
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "New Todo", done: false }),
      callTimes: 1,
    },
  ];

  beforeAll(() => {
    service = {
      all: jest.fn(),
      createTodo: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    interactor = new TodoInteractor(service);
    view = {
      getTodo: jest.fn(),
      showError: jest.fn(),
    };
    sut = new AddTodoFormPresenter(view, interactor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })
  
  describe("test addTodo() method", () => {
    testCases.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.createTodo = tc.mockImpl;
        view.getTodo = tc.mockTodo;
        // try {
          // Act
          const actual = await sut.addTodo();
          // Assert
          expect(actual).toEqual(tc.expected);
        // } catch (error) {
          // console.log(error);
          // expect(error).toEqual(tc.expected);
          expect(view.getTodo).toBeCalledTimes(1);
          expect(view.showError).toBeCalledTimes(tc.callTimes);
        // }
      });
    })
  });
})