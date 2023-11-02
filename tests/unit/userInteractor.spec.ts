import { UserInteractor } from "@/interactors/UserInteractor";
import { IUserService } from "@/repo/services/user.service";
import { BadRequestError, DataBaseError, DataError, NotFoundError } from "@/utils/error";

describe("UserInteractor", () => {
  let sut: UserInteractor;
  let service: IUserService;
  const testCasesAll = [
    {
      testname: "should return a list of all users",
      mockImpl: jest.fn().mockResolvedValue([{ id: 1, username: "faker", password: "password" }]),
      expected: [{ id: 1, username: "faker", password: "password" }],
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
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to get Users list")),
      expected: new DataBaseError("DataBaseError: Failed to get Users list"),
      userId: 1,
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to get Users list")),
      expected: new DataError("DataError: Failed to get Users list"),
      userId: 1,
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to get Users list")),
      expected: new NotFoundError("NotFoundError: Failed to get Users list"),
      userId: 1,
    },
  ];
  const testCasesCreateUser = [
    {
      testname: "should return new User",
      mockImpl: jest.fn().mockResolvedValue({ id: 1, username: "newfaker", password: "password" }),
      expected: { id: 1, username: "newfaker", password: "password" },
      UserType: { id: 1, username: "newfaker", password: "password" },
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: new BadRequestError(),
      UserType: { id: 1, username: "newfaker", password: "password" },
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to create new User")),
      expected: new DataBaseError("DataBaseError: Failed to create new User"),
      UserType: { id: 1, username: "newfaker", password: "password" },
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to create new User")),
      expected: new DataError("DataError: Failed to create new User"),
      UserType: { id: 1, username: "newfaker", password: "password" },
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to create new User")),
      expected: new NotFoundError("NotFoundError: Failed to create new User"),
      UserType: { id: 1, username: "newfaker", password: "password" },
    },
  ];
  const testCasesUpdateUser = [
    {
      testname: "should return new User",
      mockImpl: jest.fn().mockResolvedValue({ id: 1, username: "updatedfaker", password: "password" }),
      expected: { id: 1, username: "updatedfaker", password: "password" },
      UserType: { id: 1, username: "updatedfaker", password: "password" },
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: new BadRequestError(),
      UserType: { id: 1, username: "updatedfaker", password: "password" },
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to update User")),
      expected: new DataBaseError("DataBaseError: Failed to update User"),
      UserType: { id: 1, username: "updatedfaker", password: "password" },
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to update User")),
      expected: new DataError("DataError: Failed to update User"),
      UserType: { id: 1, username: "updatedfaker", password: "password" },
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to update User")),
      expected: new NotFoundError("NotFoundError: Failed to update User"),
      UserType: { id: 1, username: "updatedfaker", password: "password" },
    },
  ];
  const testCasesDeleteUser = [
    {
      testname: "should return new User",
      mockImpl: jest.fn().mockResolvedValue({ id: 1, username: "deletedfaker", password: "password" }),
      expected: { id: 1, username: "deletedfaker", password: "password" },
      UserType: { id: 1, username: "deletedfaker", password: "password" },
    },
    {
      testname: "should return BadRequestError",
      mockImpl: jest.fn().mockRejectedValue(new BadRequestError()),
      expected: new BadRequestError(),
      UserType: { id: 1, username: "deletedfaker", password: "password" },
    },
    {
      testname: "should return DataBaseError",
      mockImpl: jest.fn().mockRejectedValue(new DataBaseError("DataBaseError: Failed to delete User")),
      expected: new DataBaseError("DataBaseError: Failed to delete User"),
      UserType: { id: 1, username: "deletedfaker", password: "password" },
    },
    {
      testname: "should return DataError",
      mockImpl: jest.fn().mockRejectedValue(new DataError("DataError: Failed to delete User")),
      expected: new DataError("DataError: Failed to delete User"),
      UserType: { id: 1, username: "deletedfaker", password: "password" },
    },
    {
      testname: "should return NotFoundError",
      mockImpl: jest.fn().mockRejectedValue(new NotFoundError("NotFoundError: Failed to delete User")),
      expected: new NotFoundError("NotFoundError: Failed to delete User"),
      UserType: { id: 1, username: "deletedfaker", password: "password" },
    },
  ];

  beforeAll(() => {
    service = {
      all: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    }
    sut = new UserInteractor(service);
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
          const actual = await sut.all();
          // Assert
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      });
    });
  });

  describe("test createUser() method", () => {
    testCasesCreateUser.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.createUser = tc.mockImpl;
        try {
          // Act
          const actual = await sut.createUser(tc.UserType);
          // Assert
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      });
    });
  });

  describe("test updateUser() method", () => {
    testCasesUpdateUser.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.updateUser = tc.mockImpl;
        try {
          // Act
          const actual = await sut.updateUser(tc.UserType);
          // Assert
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      });
    });
  });

  describe("test deleteUser() method", () => {
    testCasesDeleteUser.forEach(async (tc) => {
      it(tc.testname, async () => {
        // Arrange
        service.deleteUser = tc.mockImpl;
        try {
          // Act
          const actual = await sut.deleteUser(tc.UserType);
          // Assert
          expect(tc.expected).toEqual(actual);
        } catch (error) {
          expect(error).toEqual(tc.expected);
        }
      });
    });
  });
})