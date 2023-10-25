<template>
  <div class="add-todo-form">
    <v-sheet
      class="bg-grey-lighten-1 pa-10 rounded-xl elevation-24"
      width="400"
    >
      <h3>Todo #{{ newId }}</h3>
      <form action="" @submit.prevent="submitAddTodo">
        <v-card>
          <v-text-field
            v-model="name"
            label="Name"
            hint="Enter todo name"
            id="name"
            @update:model-value="nameChange"
          />
        </v-card>
        <div class="d-flex justify-center align-center mt-5">
          <v-btn type="submit">Add Todo</v-btn>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AddTodoFormPresenter } from "@/presenters/AddTodoFormPresenter";
import { getCurrentInstance } from "vue";
import { ComponentPublicInstance } from "vue";
import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { onMounted } from "vue";
export default defineComponent({
  name: "AddTodoForm",
  props: {
    newId: {
      type: Number,
      required: true,
    },
    todos: {
      type: Array<{ id: number; name: string; done: boolean }>,
      required: true,
    },
  },
  emits: ["update:todos"],
  setup(props) {
    const name = ref("");
    const presenter = new AddTodoFormPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<IAddTodoForm>
    );
    onMounted(() => {
      presenter.setModel(props.newId, name.value);
    });
    const getTodos = () => {
      return props.todos;
    };
    const getNewId = () => {
      return props.newId;
    };
    const getName = () => {
      return name.value;
    };
    const nameChange = () => {
      presenter.setName(name.value);
    };
    const submitAddTodo = () => {
      presenter.addTodo();
    };
    return {
      name,
      presenter,
      getTodos,
      getNewId,
      getName,
      nameChange,
      submitAddTodo,
    };
  },
});
</script>
