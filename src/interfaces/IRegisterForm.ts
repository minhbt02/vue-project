import { Store } from "vuex";

export interface IRegisterForm {
  getId(): number,
  getUsername(): string,
  getPassword(): string,
  getPasswordConfirm(): string,
  getStore(): Store<any>,
  $emit(event: string, ...args: any[]): () => void;
  submitRegister(): () => void;
}