<template>
  <div
    class="login-form-wrapper bg-grey-lighten-2 px-16 py-10 rounded-xl w-100"
  >
    <v-btn icon="mdi-arrow-left" color="grey-lighten-1" @click="back"></v-btn>
    <v-sheet class="login-form-container bg-grey-lighten-2" width="300">
      <form
        action=""
        id="login-form"
        @submit.prevent="submitLogin"
        class="pt-5 w-100"
      >
        <div class="field w-100">
          <v-text-field
            v-model="username"
            label="Username"
            hint="Enter your username"
            id="username"
          />
        </div>
        <div class="field">
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            hint="Enter your password"
            id="password"
          />
        </div>
        <div class="field d-flex justify-center align-center">
          <v-btn
            type="submit"
            class="auth-submit-button bg-teal-lighten-1 rounded-xl px-16"
          >
            Login
          </v-btn>
        </div>
      </form>
      <PopUpNotification
        :type="popUpType"
        :message="popUpMessage"
        v-if="store.state.displayPopUp"
      />
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
import { LoginFormPresenter } from "@/presenters/LoginFormPresenter";
import { getCurrentInstance } from "vue";
import { ComponentPublicInstance } from "vue";
import { ILoginForm } from "@/interfaces/ILoginForm";
import { useRouter } from "vue-router";
import PopUpNotification from "../common/PopUpNotification.vue";
export default defineComponent({
  name: "LoginForm",
  props: {
    loginChosen: Boolean,
    back: Function,
  },
  emits: ["update:login-chosen", "update:login-success"],
  setup() {
    const presenter = new LoginFormPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<ILoginForm>
    );
    const id = ref<number>(-1);
    const username = ref<string>("");
    const password = ref<string>("");
    const store = useStore();
    const router = useRouter();
    const popUpType = ref<string>("");
    const popUpMessage = ref<string>("");
    const setId = (uid: number) => {
      id.value = uid;
    };
    const setPopUpType = (type: string) => {
      popUpType.value = type;
    };
    const setPopUpMessage = (message: string) => {
      popUpMessage.value = message;
    };
    const getId = () => {
      return id.value;
    };
    const getUsername = () => {
      return username.value;
    };
    const getPassword = () => {
      return password.value;
    };
    const submitLogin = () => {
      presenter.authenticate().then((returnData) => {
        const user = returnData.find((element) => {
          return (
            getUsername() === element.username &&
            getPassword() === element.password
          );
        });
        if (user) {
          setId(user.id);
          store.commit("login", getId());
          router.push({ name: "todos" });
        } else {
          showError("Wrong username or password");
        }
      });
    };
    const showError = (error: string) => {
      setPopUpType("fail");
      setPopUpMessage(error);
      store.commit("showPopUp");
    };
    return {
      presenter,
      store,
      router,
      id,
      username,
      password,
      popUpType,
      popUpMessage,
      setId,
      setPopUpType,
      setPopUpMessage,
      getId,
      getUsername,
      getPassword,
      submitLogin,
      showError,
    };
  },
  components: { PopUpNotification },
});
</script>
