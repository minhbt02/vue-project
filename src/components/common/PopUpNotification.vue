<template>
  <v-sheet
    class="notification px-3 py-2 d-flex align-center"
    height="70"
    width="300"
    :color="color"
    :elevation="5"
  >
    <v-sheet width="5" :color="borderColor"></v-sheet>
    <v-sheet :color="color">
      <p class="message text-h6">{{ message }}</p>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { computed } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PopUpNotification",
  props: {
    type: String,
    message: String,
  },
  setup(props) {
    const color = computed(() => {
      switch (props.type) {
        case "success":
          return "green";
        case "fail":
          return "red";
        case "warning":
          return "yellow";
        default:
          console.log("Wrong notification type!");
          return "";
      }
    });
    const borderColor = computed(() => {
      switch (props.type) {
        case "success":
          return "green-darken-3";
        case "fail":
          return "red-darken-4";
        case "warning":
          return "yellow-darken-3";
        default:
          console.log("Wrong notification type!");
          return "";
      }
    });
    return { color, borderColor };
  },
});
</script>

<style lang="scss">
.notification {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
