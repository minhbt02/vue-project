import { Router } from "vue-router";
import { Store } from "vuex";

export interface IRegisterForm {
  id: number,
  username: string,
  password: string,
  passwordConfirm: string,
  $emit(event: string, ...args: any[]): () => void;
  submitRegister(): () => void;
}