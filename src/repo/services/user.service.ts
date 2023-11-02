import { request } from "@/utils/hooks";
import { BadRequestError, NotFoundError } from "@/utils/error";

export type UserType = {
  id: number;
  username: string;
  password: string;
};

export interface IUserService {
  all(): Promise<UserType[]>;
  createUser(user: UserType): Promise<UserType>;
  updateUser(user: UserType): Promise<UserType>;
  deleteUser(user: UserType): Promise<UserType>;
}

export class UserService implements IUserService {
  public async all(): Promise<UserType[]> {
    try {
      const res = await request.get("/user");
      if (!res.data) {
        throw new NotFoundError();
      }
      const data: UserType[] = res.data;
      return data;
    } catch (error: any) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new BadRequestError();
        case 404:
          throw new NotFoundError();
        default:
          throw error;
      }
    }
  }
  public async createUser(user: UserType): Promise<UserType> {
    try {
      const newUser = {
        username: user.username,
        password: user.password,
      };
      const res = await request.post("/user", newUser);
      if (!res.data) {
        throw new NotFoundError();
      }
      const data: UserType = res.data;
      return data;
    } catch (error: any) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new BadRequestError();
        case 404:
          throw new NotFoundError();
        default:
          throw error;
      }
    }
  }
  public async updateUser(user: UserType): Promise<UserType> {
    try {
      const res = await request.put(`/user/${user.id}`, user);
      if (!res.data) {
        throw new NotFoundError();
      }
      const data: UserType = res.data;
      return data;
    } catch (error: any) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new BadRequestError();
        case 404:
          throw new NotFoundError();
        default:
          throw error;
      }
    }
  }
  public async deleteUser(user: UserType): Promise<UserType> {
    try {
      const res = await request.delete(`/user/${user.id}`);
      if (!res.data) {
        throw new NotFoundError();
      }
      const data: UserType = res.data;
      return data;
    } catch (error: any) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new BadRequestError();
        case 404:
          throw new NotFoundError();
        default:
          throw error;
      }
    }
  }
}
