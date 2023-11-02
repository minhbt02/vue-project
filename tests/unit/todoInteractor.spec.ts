import { TodoInteractor } from "@/interactors/TodoInteractor";
import { ITodoService } from "@/repo/services/todo.service";
import { BadRequestError, DataBaseError, DataError, NotFoundError } from "@/utils/error";

describe("TodoInteractor", () => {
  let sut: TodoInteractor;
  let service: ITodoService;
  const testCasesAll = [
    {
      testname: "should return a list of all todos",
      mockImpl: jest.fn().mockResolvedValue([{ id: 1, userId: 1, name: "Todo", done: false }]),
      expected: [{ id: 1, userId: 1, name: "Todo", done: false }],
      userId: 1,
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: new BadRequestError(),
      userId: 1,
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to get todos list")),
      expected: new DataBaseError("DataBaseError: Failed to get todos list"),
      userId: 1,
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to get todos list")),
      expected: new DataError("DataError: Failed to get todos list"),
      userId: 1,
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to get todos list")),
      expected: new NotFoundError("NotFoundError: Failed to get todos list"),
      userId: 1,
    },
  ];
  const testCasesCreateTodo = [
    {
      testname: "should return new todo",
      mockImpl: jest.fn().mockResolvedValue({ id: 1, userId: 1, name: "New Todo", done: false }),
      expected: { id: 1, userId: 1, name: "New Todo", done: false },
      todoType: { id: 1, userId: 1, name: "New Todo", done: false },
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: new BadRequestError(),
      todoType: { id: 1, userId: 1, name: "New Todo", done: false },
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to create new todo")),
      expected: new DataBaseError("DataBaseError: Failed to create new todo"),
      todoType: { id: 1, userId: 1, name: "New Todo", done: false },
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to create new todo")),
      expected: new DataError("DataError: Failed to create new todo"),
      todoType: { id: 1, userId: 1, name: "New Todo", done: false },
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to create new todo")),
      expected: new NotFoundError("NotFoundError: Failed to create new todo"),
      todoType: { id: 1, userId: 1, name: "New Todo", done: false },
    },
  ];
  const testCasesUpdateTodo = [
    {
      testname: "should return new todo",
      mockImpl: jest.fn().mockResolvedValue({ id: 1, userId: 1, name: "Updated Todo", done: false }),
      expected: { id: 1, userId: 1, name: "Updated Todo", done: false },
      todoType: { id: 1, userId: 1, name: "Updated Todo", done: false },
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: new BadRequestError(),
      todoType: { id: 1, userId: 1, name: "Updated Todo", done: false },
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to update todo")),
      expected: new DataBaseError("DataBaseError: Failed to update todo"),
      todoType: { id: 1, userId: 1, name: "Updated Todo", done: false },
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to update todo")),
      expected: new DataError("DataError: Failed to update todo"),
      todoType: { id: 1, userId: 1, name: "Updated Todo", done: false },
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to update todo")),
      expected: new NotFoundError("NotFoundError: Failed to update todo"),
      todoType: { id: 1, userId: 1, name: "Updated Todo", done: false },
    },
  ];
  const testCasesDeleteTodo = [
    {
      testname: "should return new todo",
      mockImpl: jest.fn().mockResolvedValue({ id: 1, userId: 1, name: "Deleted Todo", done: false }),
      expected: { id: 1, userId: 1, name: "Deleted Todo", done: false },
      todoType: { id: 1, userId: 1, name: "Deleted Todo", done: false },
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: new BadRequestError(),
      todoType: { id: 1, userId: 1, name: "Deleted Todo", done: false },
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to delete todo")),
      expected: new DataBaseError("DataBaseError: Failed to delete todo"),
      todoType: { id: 1, userId: 1, name: "Deleted Todo", done: false },
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to delete todo")),
      expected: new DataError("DataError: Failed to delete todo"),
      todoType: { id: 1, userId: 1, name: "Deleted Todo", done: false },
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to delete todo")),
      expected: new NotFoundError("NotFoundError: Failed to delete todo"),
      todoType: { id: 1, userId: 1, name: "Deleted Todo", done: false },
    },
  ];

  beforeAll(() => {
    service = {
      all: jest.fn(),
      createTodo: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    sut = new TodoInteractor(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("test all() method", () => {
    testCasesAll.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.all = tc.mockImpl;
        try {
          // Act
          const actual = await sut.all(tc.userId);
          // Assert
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      });
    });
  });

  describe("test createTodo() method", () => {
    testCasesCreateTodo.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.createTodo = tc.mockImpl;
        try {
          // Act
          const actual = await sut.createTodo(tc.todoType);
          // Assert
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      })
    })
  });

  describe("test updateTodo() method", () => {
    testCasesUpdateTodo.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.createTodo = tc.mockImpl;
        try {
          // Act
          const actual = await sut.createTodo(tc.todoType);
          // Assert
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      })
    })
  });

  describe("test deleteTodo() method", () => {
    testCasesDeleteTodo.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.createTodo = tc.mockImpl;
        try {
          // Act
          const actual = await sut.createTodo(tc.todoType);
          // Assert
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      })
    })
  });
})