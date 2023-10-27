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
            @update:model-value="setName(name)"
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
import { TodoType } from "@/repo/services/todo.service";
import { EditTodoFormPresenter } from "@/presenters/EditTodoFormPresenter";
import { getCurrentInstance } from "vue";
import { defineComponent, ref, ComponentPublicInstance } from "vue";
import { PropType } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "EditTodoForm",
  props: {
    todo: {
      type: Object as PropType<TodoType>,
      required: true,
    },
    todos: {
      type: Array<TodoType>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:todos", "update:todo"],
  setup(props) {
    const store = useStore();
    const presenter = new EditTodoFormPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<IEditTodoForm>
    );
    const name = ref(props.todo.name);
    const newTodo = ref<TodoType>({
      id: props.todo.id,
      userId: props.todo.userId,
      name: props.todo.name,
      done: props.todo.done,
    });
    const popUpType = ref<string>("");
    const popUpMessage = ref<string>("");
    const getStore = () => {
      return store;
    };
    const getTodos = () => {
      return props.todos;
    };
    const getIndex = () => {
      return props.index;
    };
    const getTodo = () => {
      return newTodo.value;
    };
    const setName = (newName: string) => {
      newTodo.value.name = newName;
    };
    const saveTodo = () => {
      presenter.updateTodo();
    };
    const showError = (error: string, type: string) => {
      presenter.displayError(error, type);
    };
    return {
      name,
      presenter,
      popUpType,
      popUpMessage,
      getStore,
      getTodos,
      getIndex,
      getTodo,
      setName,
      saveTodo,
      showError,
    };
  },
});
</script>
