<template>
  <div class="home d-flex justify-center align-center h-screen">
    <div class="content-wrapper">
      <AuthOptions
        v-model:login-chosen="loginChosen"
        v-model:register-chosen="registerChosen"
      />
      <LoginForm
        v-model:login-chosen="loginChosen"
        v-model:login-success="loginSuccess"
        :back="back"
        v-if="loginChosen"
      />
      <RegisterForm
        v-model:register-chosen="registerChosen"
        v-model:register-success="registerSuccess"
        :back="back"
        v-if="registerChosen"
      />
      <PopUpNotification
        v-model:login-success="loginSuccess"
        v-model:register-success="registerSuccess"
        v-if="loginSuccess || registerSuccess"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import AuthOptions from "@/components/home/AuthOptions.vue";
import LoginForm from "@/components/home/LoginForm.vue";
import RegisterForm from "@/components/home/RegisterForm.vue";
import PopUpNotification from "@/components/common/PopUpNotification.vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    const loginChosen = ref(false);
    const registerChosen = ref(false);
    const loginSuccess = ref(false);
    const registerSuccess = ref(false);
    const back = () => {
      loginChosen.value = false;
      registerChosen.value = false;
    };
    return {
      loginChosen,
      registerChosen,
      loginSuccess,
      registerSuccess,
      back,
    };
  },
  components: { AuthOptions, LoginForm, RegisterForm, PopUpNotification },
});
</script>
