import { EditTodoFormPresenter } from "@/presenters/EditTodoFormPresenter";
import { TodoInteractor } from "@/interactors/TodoInteractor";
import { IEditTodoForm } from "@/interfaces/IEditTodoForm";
import { ITodoService, TodoType } from "@/repo/services/todo.service";

describe("EditTodoFormPresenter", () => {
  let presenter: EditTodoFormPresenter;
  let service: ITodoService;
  let view: IEditTodoForm;
  //   setPopUpType: jest.fn(),
  //   setPopUpMessage: jest.fn(),
  //   getId: jest.fn().mockResolvedValue(1),
  //   getUserId: jest.fn().mockResolvedValue(1),
  //   getName: jest.fn().mockResolvedValue("Todo"),
  //   getDone: jest.fn().mockResolvedValue(false),
  //   getTodos: jest.fn().mockResolvedValue([{ id: 1, userId: 1, name: "Todo", done: false }]),
  //   getIndex: jest.fn().mockResolvedValue(0),
  //   getTodo: jest.fn().mockResolvedValue({ id: 1, userId: 1, name: "Todo", done: false }),
  //   showError: jest.fn(),
  // };

  let mockInteractor: TodoInteractor;
  const testCases = [
    {
      testname: "should return updated todo",
      mockImpl: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
      expected: { id: 1, userId: 1, name: "Updated Todo", done: false },
      mockTodo: jest.fn().mockReturnValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
    }
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
    mockInteractor = new TodoInteractor(service);
    presenter = new EditTodoFormPresenter(view, mockInteractor);
  });

  afterEach(() => {
    // Resetting the mock function calls after each test
    jest.clearAllMocks();
  });

  describe("test updateTodo() method", () => {
    testCases.forEach(async (tc) => {
      it(tc.testname, async () => {
        service.updateTodo = tc.mockImpl;
        view.getTodo = tc.mockTodo;
        try {
          const actual = await presenter.updateTodo();
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      });
    })
  });
});