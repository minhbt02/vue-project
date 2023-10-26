<template>
  <div class="add-todo-form">
    <v-sheet
      class="bg-grey-lighten-1 pa-10 rounded-xl elevation-24"
      width="400"
    >
      <h3>New Todo</h3>
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
import { TodoType } from "@/repo/services/todo.service";
import { useStore } from "vuex";
export default defineComponent({
  name: "AddTodoForm",
  props: {
    todos: {
      type: Array<TodoType>,
      required: true,
    },
  },
  emits: ["update:todos"],
  setup(props) {
    const name = ref("");
    const store = useStore();
    const todo = ref<TodoType>({
      id: -1,
      userId: store.state.uid,
      name: "",
      done: false,
    });
    const presenter = new AddTodoFormPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<IAddTodoForm>
    );
    const setName = (name: string) => {
      todo.value.name = name;
    };
    const setTodo = (newTodo: TodoType) => {
      todo.value = newTodo;
    };
    const getTodos = () => {
      return props.todos;
    };
    const getTodo = () => {
      return todo.value;
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
      todo,
      presenter,
      setName,
      setTodo,
      getTodos,
      getTodo,
      getName,
      nameChange,
      submitAddTodo,
    };
  },
});
</script>
