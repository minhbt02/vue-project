import { Router } from "vue-router";
import { Store } from "vuex";

export interface ILoginForm {
  setId(id: number): () => void;
  setPopUpType(type: string): () => void;
  setPopUpMessage(message: string): () => void;
  getId(): () => number;
  getUsername(): string;
  getPassword(): string;
  showError(error: string): () => void;
  submitLogin(): () => void;
}