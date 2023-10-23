<template>
  <div class="notification">
    <p class="message text-h4">{{ successMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "PopUpNotification",
  props: {
    loginSuccess: Boolean,
    registerSuccess: Boolean,
  },
  setup() {
    const message = ref("");
    return {
      message,
    };
  },
  computed: {
    successMessage() {
      if (this.loginSuccess) {
        return "Login successful!";
      } else if (this.registerSuccess) {
        return "Registration successful!";
      } else {
        return "";
      }
    },
  },
});
</script>
