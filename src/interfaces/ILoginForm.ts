import { Router } from "vue-router";
import { Store } from "vuex";

export interface ILoginForm {
  id: number,
  username: string,
  password: string,
  store: Store<any>,
  router: Router,
  $emit(event: string, ...args: any[]): () => void;
  submitLogin(): () => void;
}