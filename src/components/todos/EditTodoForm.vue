<template>
  <div class="edit-todo-form">
    <v-sheet
      class="bg-grey-lighten-1 pa-10 rounded-xl elevation-24"
      width="400"
    >
      <h3>Todo #{{ todo.id }}</h3>
      <form @submit.prevent="saveTodo()">
        <v-card>
          <v-text-field
            v-model="name"
            label="Name"
            hint="Enter todo name"
            id="name"
            @update:model-value="nameChange()"
          />
        </v-card>
        <div class="d-flex justify-center align-center mt-5">
          <v-btn type="submit">Save Todo</v-btn>
        </div>
      </form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { IEditTodoForm } from "@/interfaces/IEditTodoForm";
import { Todo } from "@/models/Todo";
import { EditTodoFormPresenter } from "@/presenters/EditTodoFormPresenter";
import { getCurrentInstance } from "vue";
import { defineComponent, ref, ComponentPublicInstance } from "vue";
export default defineComponent({
  name: "EditTodoForm",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    todos: {
      type: Array<{ id: number; name: string; done: boolean }>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:todos"],
  setup(props, context) {
    const presenter = new EditTodoFormPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<IEditTodoForm>,
      new Todo(props.todo.id, props.todo.name, props.todo.done)
    );
    const name = ref(props.todo.name);
    const nameChange = () => {
      presenter.setModel(new Todo(props.todo.id, name.value, props.todo.done));
    };
    const saveTodo = () => {
      presenter.updateTodo();
      context.emit("update:todos", props.todos);
    };
    return { name, presenter, nameChange, saveTodo };
  },
});
</script>
