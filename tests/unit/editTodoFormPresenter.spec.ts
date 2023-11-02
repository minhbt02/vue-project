import { EditTodoFormPresenter } from "@/presenters/EditTodoFormPresenter";
import { TodoInteractor } from "@/interactors/TodoInteractor";
import { IEditTodoForm } from "@/interfaces/IEditTodoForm";
import { ITodoService } from "@/repo/services/todo.service";
import { BadRequestError, DataBaseError, DataError, NotFoundError } from "@/utils/error";

describe("EditTodoFormPresenter", () => {
  let sut: EditTodoFormPresenter;
  let service: ITodoService;
  let view: IEditTodoForm;
  let interactor: TodoInteractor;
  const testCases = [
    {
      testname: "should return updated todo",
      mockImpl: jest.fn().mockResolvedValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
      expected: { id: 1, userId: 1, name: "Updated Todo", done: false },
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: new BadRequestError(),
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to update todo")),
      expected: new DataBaseError("DataBaseError: Failed to update todo"),
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to update todo")),
      expected: new DataError("DataError: Failed to update todo"),
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to update todo")),
      expected: new NotFoundError("NotFoundError: Failed to update todo"),
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
    },
  ];

  beforeAll(() => {
    view = {
      setPopUpType: jest.fn(),
      setPopUpMessage: jest.fn(),
      getId: jest.fn(),
      getUserId: jest.fn(),
      getName: jest.fn(),
      getDone: jest.fn(),
      getTodos: jest.fn(),
      getIndex: jest.fn(),
      getTodo: jest.fn(),
      showError: jest.fn(),
    };
    service = {
      all: jest.fn(),
      createTodo: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    interactor = new TodoInteractor(service);
    sut = new EditTodoFormPresenter(view, interactor);
  });

  afterEach(() => {
    // Resetting the mock function calls after each test
    jest.clearAllMocks();
  });

  describe("test updateTodo() method", () => {
    testCases.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.updateTodo = tc.mockImpl;
        view.getTodo = tc.mockTodo;
        try {
          // Act
          const actual = await sut.updateTodo();
          // Assert
          expect(actual).toEqual(tc.expected);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      });
    })
  });
});