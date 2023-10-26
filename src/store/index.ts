import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

export default createStore({
  state: {
    loggedIn: false,
    uid: -1,
    loginSuccess: false,
    registerSuccess: false,
    displayPopUp: false,
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
    uid(state) {
      return state.uid;
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
      state.uid = uid;
      state.loginSuccess = true;
      state.displayPopUp = true;
      setTimeout(() => {
        state.loginSuccess = false;
        state.displayPopUp = false;
      }, 3000);
    },
    logout(state) {
      state.loggedIn = false;
      state.uid = -1;
    },
    register(state) {
      state.registerSuccess = true;
      state.displayPopUp = true;
      setTimeout(() => {
        state.registerSuccess = false;
        state.displayPopUp = false;
      }, 3000);
    },
    showError(state) {
      state.displayPopUp = true;
      setTimeout(() => {
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
