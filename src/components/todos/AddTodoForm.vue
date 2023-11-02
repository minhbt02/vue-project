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
    <PopUpNotification
      :type="popUpType"
      :message="popUpMessage"
      v-if="store.state.displayPopUp"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { AddTodoFormPresenter } from "@/presenters/AddTodoFormPresenter";
import { getCurrentInstance } from "vue";
import { ComponentPublicInstance } from "vue";
import { IAddTodoForm } from "@/interfaces/IAddTodoForm";
import { TodoType } from "@/repo/services/todo.service";
import { useStore } from "vuex";
import PopUpNotification from "../common/PopUpNotification.vue";
import store from "@/store";
export default defineComponent({
  name: "AddTodoForm",
  props: {
    todos: {
      type: Array<TodoType>,
      required: true,
    },
  },
  emits: ["update:todos"],
  setup(props, context) {
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
    const popUpType = ref<string>("");
    const popUpMessage = ref<string>("");
    const setName = (name: string) => {
      todo.value.name = name;
    };
    const setTodo = (newTodo: TodoType) => {
      todo.value = newTodo;
    };
    const setPopUpType = (type: string) => {
      popUpType.value = type;
    };
    const setPopUpMessage = (message: string) => {
      popUpMessage.value = message;
    };
    const getStore = () => {
      return store;
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
      setName(name.value);
    };
    const submitAddTodo = () => {
      presenter.addTodo().then((data) => {
        const todosCopy = props.todos;
        todosCopy.push({
          id: data.id,
          userId: data.userId,
          name: data.name,
          done: data.done,
        });
        context.emit("update:todos", todosCopy);
        setPopUpType("success");
        setPopUpMessage("Successully added todo");
        setTodo(data);
        store.commit("showPopUp");
      });
    };
    const showError = (error: string, type: string) => {
      popUpType.value = type;
      popUpMessage.value = error;
      store.commit("showPopUp");
    };
    onMounted(() => {
      store.commit("resetPopUp");
    });
    return {
      name,
      todo,
      presenter,
      store,
      popUpType,
      popUpMessage,
      setName,
      setTodo,
      setPopUpType,
      setPopUpMessage,
      getStore,
      getTodos,
      getTodo,
      getName,
      nameChange,
      submitAddTodo,
      showError,
    };
  },
  components: { PopUpNotification },
});
</script>
