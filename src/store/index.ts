import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

export default createStore({
  state: {
    loggedIn: false,
    id: -1,
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
    id(state) {
      return state.id;
    },
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    identify(state, uid) {
      state.id = uid;
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
