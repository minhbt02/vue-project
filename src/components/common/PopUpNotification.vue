<template>
  <v-sheet
    class="notification d-flex align-center"
    height="70"
    width="350"
    :color="color"
    :elevation="5"
  >
    <v-sheet :color="borderColor" height="70" class="px-1 py-2 text-h6">
    </v-sheet>
    <v-sheet :color="color">
      <p class="message px-3 py-2 text-h6">{{ message }}</p>
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
        case "":
          return "";
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
  z-index: 9999;
}
</style>
