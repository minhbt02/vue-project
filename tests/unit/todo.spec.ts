import { Todo } from "@/models/Todo";
import { TodoType } from "@/repo/services/todo.service";

describe("Todo", () => {
  let sut: Todo;

  beforeAll(() => {
    sut = new Todo();
    sut.setId(1);
    sut.setUserId(1);
    sut.setName("Todo");
    sut.setDone(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("test getModel() method", () => {
    // Arrange
    const expected: TodoType = {
      id: 1,
      userId: 1,
      name: "Todo",
      done: false,
    };

    // Act
    const actual = sut.getModel();

    // Assert
    expect(actual).toEqual(expected);
  })
})