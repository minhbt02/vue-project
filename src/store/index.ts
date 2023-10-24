import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

export default createStore({
  state: {
    loggedIn: false,
    id: -1,
    loginSuccess: false,
    registerSuccess: false,
    displayPopUp: false,
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
    id(state) {
      return state.id;
    },
    loginSuccess(state) {
      return state.loginSuccess;
    },
    registerSuccess(state) {
      return state.registerSuccess;
    },
    displayPopUp(state) {
      return state.displayPopUp;
    },
  },
  mutations: {
    login(state, uid) {
      state.loggedIn = true;
      state.loginSuccess = true;
      state.displayPopUp = true;
      setTimeout(() => {
        state.loginSuccess = false;
        state.displayPopUp = false;
      }, 3000);
      state.id = uid;
    },
    logout(state) {
      state.loggedIn = false;
    },
    register(state) {
      state.registerSuccess = true;
      state.displayPopUp = true;
      setTimeout(() => {
        state.registerSuccess = false;
        state.displayPopUp = false;
      }, 3000);
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
