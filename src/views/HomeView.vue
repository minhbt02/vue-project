<template>
  <div class="home d-flex justify-center align-center h-screen">
    <div class="content-wrapper">
      <AuthOptions
        v-model:login-chosen="loginChosen"
        v-model:register-chosen="registerChosen"
      />
      <LoginForm
        v-model:login-chosen="loginChosen"
        :back="back"
        v-if="loginChosen"
      />
      <RegisterForm
        v-model:register-chosen="registerChosen"
        :back="back"
        v-if="registerChosen"
      />
    </div>
    <PopUpNotification
      type="success"
      message="Successfully registered!"
      v-if="displayPopUp"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import AuthOptions from "@/components/home/AuthOptions.vue";
import LoginForm from "@/components/home/LoginForm.vue";
import RegisterForm from "@/components/home/RegisterForm.vue";
import PopUpNotification from "@/components/common/PopUpNotification.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeView",
  setup() {
    const loginChosen = ref(false);
    const registerChosen = ref(false);
    const store = useStore();
    const displayPopUp = computed(() => {
      return store.state.registerSuccess;
    });
    const back = () => {
      loginChosen.value = false;
      registerChosen.value = false;
    };
    return {
      loginChosen,
      registerChosen,
      displayPopUp,
      back,
    };
  },
  components: { AuthOptions, LoginForm, RegisterForm, PopUpNotification }, // eslint-disable-line vue/no-unused-components
});
</script>
