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
  setup(props, context) {
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
    const getId = () => {
      return props.todo.id;
    };
    const getUserId = () => {
      return props.todo.userId;
    };
    const getName = () => {
      return props.todo.name;
    };
    const getDone = () => {
      return props.todo.done;
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
    const setPopUpType = (type: string) => {
      popUpType.value = type;
    };
    const setPopUpMessage = (message: string) => {
      popUpMessage.value = message;
    };
    const saveTodo = () => {
      presenter.updateTodo().then((data) => {
        const todosCopy = getTodos().slice();
        todosCopy[getIndex()] = data as TodoType;
        context.emit("update:todos", todosCopy);
        setPopUpType("success");
        setPopUpMessage("Successully edited todo");
        store.commit("showPopUp");
      });
    };
    const showError = (error: string, type: string) => {
      popUpType.value = type;
      popUpMessage.value = error;
      store.commit("showPopUp");
    };
    return {
      name,
      presenter,
      popUpType,
      popUpMessage,
      getId,
      getUserId,
      getName,
      getDone,
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
