<template>
  <div
    class="login-form-wrapper bg-grey-lighten-2 px-16 py-10 rounded-xl w-100"
  >
    <v-btn icon="mdi-arrow-left" color="grey-lighten-1" @click="back"></v-btn>
    <v-sheet class="login-form-container bg-grey-lighten-2" width="300">
      <form
        action=""
        id="login-form"
        @submit.prevent="onSubmit"
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
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { mapMutations, useStore } from "vuex";
import { defineComponent, ref } from "vue";
import { LoginFormPresenter } from "@/presenters/LoginFormPresenter";
import { getCurrentInstance } from "vue";
import { ComponentPublicInstance } from "vue";
import { ILoginForm } from "@/interfaces/ILoginForm";
export default defineComponent({
  name: "LoginForm",
  props: {
    loginChosen: Boolean,
    back: Function,
    loginSuccess: Boolean,
  },
  emits: ["update:login-chosen", "update:login-success"],
  setup(_, context) {
    const presenter = new LoginFormPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<ILoginForm>
    );
    const id = ref("");
    const username = ref("");
    const password = ref("");
    const store = useStore();
    const login = () => {
      store.commit("login");
    }
    const submitLogin = () => {
      context.emit("update:login-success", true);
      context.emit("update:login-chosen", false);
      login();
      
    }
    return {
      presenter,
      id,
      username,
      password,
    };
  },
  methods: {
    ...mapMutations(["login"]),
    onSubmit(e: Event) {
      e.preventDefault();
      this.$emit("update:login-success", true);
      this.$emit("update:login-chosen", false);
      this.login();
      this.redirect();
    },
    redirect() {
      this.$router.push({ name: "todos" });
    },
  },
});
</script>
