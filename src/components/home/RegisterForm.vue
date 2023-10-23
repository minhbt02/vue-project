<template>
  <div class="form-wrapper bg-grey-lighten-2 px-16 py-10 rounded-xl w-100">
    <v-btn icon="mdi-arrow-left" color="grey-lighten-1" @click="back"></v-btn>
    <v-sheet class="login-form-container bg-grey-lighten-2" width="300">
      <form
        action=""
        id="login-form"
        @submit.prevent="submitRegister"
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
        <div class="field">
          <v-text-field
            v-model="passwordConfirm"
            label="Password Confirm"
            type="password"
            hint="Confirm your password"
            id="password-confirm"
          />
        </div>
        <div class="field d-flex justify-center align-center">
          <v-btn
            type="submit"
            class="auth-submit-button bg-teal-lighten-1 rounded-xl px-16"
          >
            Register
          </v-btn>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { IRegisterForm } from "@/interfaces/IRegisterForm";
import { User } from "@/models/User";
import { RegisterFormPresenter } from "@/presenters/RegisterFormPresenter";
import { ComponentPublicInstance } from "vue";
import { getCurrentInstance } from "vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "RegisterForm",
  props: {
    registerChosen: Boolean,
    back: Function,
  },
  setup() {
    const id = ref(-1);
    const username = ref("");
    const password = ref("");
    const presenter = new RegisterFormPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<IRegisterForm>,
      new User(id.value, username.value, password.value)
    );
    const passwordConfirm = ref("");
    const submitRegister = () => {
      presenter.newUser();
    };
    return {
      username,
      password,
      passwordConfirm,
      presenter,
      submitRegister,
    };
  },
});
</script>
