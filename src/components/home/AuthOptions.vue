<template>
  <div
    class="auth-options d-flex flex-column bg-grey-lighten-2 px-16 py-10 rounded-xl"
    v-if="!loginChosen && !registerChosen"
  >
    <v-btn
      size="x-large"
      class="bg-teal-lighten-1 text-h5 rounded-xl px-16"
      @click="$emit('update:loginChosen', true)"
    >
      Login
    </v-btn>
    <v-btn
      size="x-large"
      class="mt-10 rounded-xl px-16"
      @click="$emit('update:registerChosen', true)"
    >
      Register
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AuthOptions",
  props: {
    loginChosen: Boolean,
    registerChosen: Boolean,
  },
  emits: ["update:loginChosen", "update:registerChosen"],
});
</script>
