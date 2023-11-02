import { User } from "@/models/User";
import { UserType } from "@/repo/services/user.service";

describe("Todo", () => {
  let sut: User;

  beforeAll(() => {
    sut = new User();
    sut.setId(1);
    sut.setUsername("faker");
    sut.setPassword("password");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("test getModel() method", () => {
    // Arrange
    const expected: UserType = {
      id: 1,
      username: "faker",
      password: "password",
    };

    // Act
    const actual = sut.getModel();

    // Assert
    expect(actual).toEqual(expected);
  })
})