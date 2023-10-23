import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

export default createStore({
  state: {
    loggedIn: false,
    str: "yes",
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
    str(state) {
      return state.str;
    },
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    new VuexPersist({
      storage: window.localStorage,
    }).plugin,
  ],
});
