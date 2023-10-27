import { UserType } from "@/repo/services/user.service";
import { Store } from "vuex";

export interface IRegisterForm {
  setUser(user: UserType): () => void;
  setPopUpType(type: string): () =>  void;
  setPopUpMessage(message: string): () => void;
  getUser(): UserType;
  getId(): number;
  getUsername(): string;
  getPassword(): string;
  getPasswordConfirm(): string;
  getStore(): Store<any>;
  showError(error: string, type: string): () => void;
  $emit(event: string, ...args: any[]): () => void;
  submitRegister(): () => void;
}