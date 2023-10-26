import { Router } from "vue-router";
import { Store } from "vuex";

export interface ILoginForm {
  id: number,
  username: string,
  password: string,
  setId(id: number): () => void;
  getId(): () => number;
  getUsername(): string;
  getPassword(): string;
  getStore(): Store<any>;
  getRouter(): Router;
  showError(error: string): () => void;
  $emit(event: string, ...args: any[]): () => void;
  submitLogin(): () => void;
}