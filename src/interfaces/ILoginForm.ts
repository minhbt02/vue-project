import { Router } from "vue-router";
import { Store } from "vuex";

export interface ILoginForm {
  setId(id: number): () => void;
  setPopUpType(type: string): () => void;
  setPopUpMessage(message: string): () => void;
  getId(): () => number;
  getUsername(): string;
  getPassword(): string;
  getStore(): Store<any>;
  getRouter(): Router;
  showError(error: string): () => void;
  $emit(event: string, ...args: any[]): () => void;
  submitLogin(): () => void;
}