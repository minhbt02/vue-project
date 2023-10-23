<template>
  <div class="add-todo-form">
    <v-sheet
      class="bg-grey-lighten-1 pa-10 rounded-xl elevation-24"
      width="400"
    >
      <h3>Todo #{{ newId }}</h3>
      <form action="" @submit.prevent="newTodo">
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
import { Todo } from "@/models/Todo";
import { AddTodoFormPresenter } from "@/presenters/AddTodoFormPresenter";
import { getCurrentInstance } from "vue";
import { ComponentPublicInstance } from "vue";
import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
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
  setup(props, context) {
    const name = ref("");
    const presenter = new AddTodoFormPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<IAddTodoForm>,
      new Todo(props.newId, name.value, false)
    );
    const nameChange = () => {
      presenter.setModel(new Todo(props.newId, name.value, false));
    };
    const newTodo = () => {
      presenter.newTodo();
      context.emit("update:todos", props.todos);
    };
    return { name, presenter, nameChange, newTodo };
  },
});
</script>
