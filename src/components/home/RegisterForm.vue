<template>
  <div class="form-wrapper bg-grey-lighten-2 px-16 py-10 rounded-xl w-100">
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
            label="Username"
            hint="Enter your username"
            @input="changeUsername"
            id="username"
          />
        </div>
        <div class="field">
          <v-text-field
            label="Password"
            type="password"
            hint="Enter your password"
            @input="changePassword"
            id="password"
          />
        </div>
        <div class="field">
          <v-text-field
            label="Password Confirm"
            type="password"
            hint="Confirm your password"
            @input="changePasswordConfirm"
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
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "RegisterForm",
  props: {
    registerChosen: Boolean,
    username: String,
    password: String,
    passwordConfirm: String,
    back: Function,
  },
  setup() {
    const usernameInput = ref("");
    const passwordInput = ref("");
    const passwordConfirmInput = ref("");
    const changeUsername = (e: InputEvent) => {
      let inputElement = e.target as HTMLInputElement;
      usernameInput.value = inputElement.value;
    };
    const changePassword = (e: InputEvent) => {
      let inputElement = e.target as HTMLInputElement;
      passwordInput.value = inputElement.value;
    };
    const changePasswordConfirm = (e: InputEvent) => {
      let inputElement = e.target as HTMLInputElement;
      passwordConfirmInput.value = inputElement.value;
    };
    return {
      usernameInput,
      passwordInput,
      passwordConfirmInput,
      changeUsername,
      changePassword,
      changePasswordConfirm,
    };
  },
  methods: {
    onSubmit(e: Event) {
      e.preventDefault();
      this.$emit("update:username", this.usernameInput);
      this.$emit("update:password", this.passwordInput);
      this.$emit("update:password-confirm", this.passwordConfirmInput);
      this.$emit("update:register-success", true);
      this.$emit("update:register-chosen", false);
    },
  },
});
</script>
