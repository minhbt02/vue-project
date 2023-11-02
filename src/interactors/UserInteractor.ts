import { User } from "@/models/User";
import {
  IUserService,
  UserType,
  UserService,
} from "@/repo/services/user.service";

export class UserInteractor {
  private userService: UserService;
  constructor(userService: IUserService | null = null) {
    this.userService = userService ?? new UserService();
  }
  public async all(): Promise<UserType[]> {
    try { // eslint-disable-line
      return this.userService.all();
    } catch (error) {
      throw error;
    }
  }
  public async createUser(user: UserType): Promise<UserType> {
    try { // eslint-disable-line
      const newUser = new User();
      newUser.setId(user.id);
      newUser.setUsername(user.username);
      newUser.setPassword(user.password);
      return this.userService.createUser(newUser.getModel());
    } catch (error) {
      throw error;
    }
  }
  public async updateUser(user: UserType): Promise<UserType> {
    try { // eslint-disable-line
      const newUser = new User();
      newUser.setId(user.id);
      newUser.setUsername(user.username);
      newUser.setPassword(user.password);
      return await this.userService.updateUser(newUser.getModel());
    } catch (error) {
      throw error;
    }
  }
  public async deleteUser(user: UserType): Promise<UserType> {
    try { // eslint-disable-line
      const newUser = new User();
      newUser.setId(user.id);
      return await this.userService.deleteUser(newUser.getModel());
    } catch (error) {
      throw error;
    }
  }
}
