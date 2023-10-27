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
      v-if="store.state.registerSuccess"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AuthOptions from "@/components/home/AuthOptions.vue";
import LoginForm from "@/components/home/LoginForm.vue";
import RegisterForm from "@/components/home/RegisterForm.vue";
import PopUpNotification from "@/components/common/PopUpNotification.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    const loginChosen = ref(false);
    const registerChosen = ref(false);
    const store = useStore();
    const back = () => {
      loginChosen.value = false;
      registerChosen.value = false;
    };
    onMounted(() => {
      store.commit("resetPopUp");
    });
    return {
      loginChosen,
      registerChosen,
      store,
      back,
    };
  },
  components: { AuthOptions, LoginForm, RegisterForm, PopUpNotification }, // eslint-disable-line vue/no-unused-components
});
</script>
