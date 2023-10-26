import { UserType } from "@/repo/services/user.service";
import { Store } from "vuex";

export interface IRegisterForm {
  setUser(user: UserType): () => void;
  getUser(): UserType;
  getId(): number;
  getUsername(): string;
  getPassword(): string;
  getPasswordConfirm(): string;
  getStore(): Store<any>;
  showError(error: string): () => void;
  $emit(event: string, ...args: any[]): () => void;
  submitRegister(): () => void;
}