<template>
  <div class="todos d-flex align-center flex-column">
    <h1 class="pt-6">🧾 Todos</h1>
    <div
      class="d-flex justify-center align-center px-16 pt-5 flex-column"
      v-if="loggedIn"
    >
      <TodosList />
      <v-btn
        @click="logout"
        class="mt-5 h-15 w-25 text-h6"
        color="teal-lighten-1"
      >
        Log Out
      </v-btn>
    </div>
    <div class="d-flex justify-center align-center pa-16 w-100 h-25" v-else>
      <h2 class="d-inline">To View Todos, You Must</h2>
      <v-btn
        @click="redirect"
        class="ml-3 text-h5 w-15 h-100"
        color="teal-lighten-1"
      >
        Login
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import { TodosList } from "@/components";
export default defineComponent({
  name: "TodosView",
  computed: {
    ...mapGetters(["loggedIn", "str"]),
  },
  methods: {
    ...mapMutations(["logout"]),
    redirect() {
      this.$router.push({ name: "home" });
    },
  },
  components: { TodosList },
});
</script>
