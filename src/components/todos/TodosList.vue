<template>
  <v-sheet class="bg-grey-lighten-2 rounded-xl" width="500" height="550">
    <div v-if="todosLoaded">
      <v-sheet class="bg-grey-lighten-2 rounded-xl" height="400">
        <v-list lines="one" class="bg-grey-lighten-2 rounded-xl">
          <v-list-item
            v-for="todo in displayedTodos"
            :key="todo.id"
            class="px-5"
          >
            <v-card class="d-flex align-center px-3 my-2 py-3">
              <v-checkbox
                density="compact"
                hide-details="auto"
                v-if="todo.done"
                v-model="todo.done"
                color="teal-darken-3"
                @update:model-value="handleCompletedTodo(todo)"
              >
                <template v-slot:label>
                  <span
                    class="text-h6 text-decoration-line-through text-teal-darken-2"
                  >
                    {{ todo.name }}
                  </span>
                </template>
              </v-checkbox>
              <v-checkbox
                density="compact"
                hide-details="auto"
                v-else
                v-model="todo.done"
                color="black"
                @update:model-value="handleCompletedTodo(todo)"
              >
                <template v-slot:label>
                  <span class="text-h6">{{ todo.name }}</span>
                </template>
              </v-checkbox>
              <v-btn
                @click="
                  {
                    showEditForm = true;
                    todoItem = todo;
                  }
                "
                class="ml-3 text-h7 bg-grey-lighten-5"
                icon="mdi-pencil"
              ></v-btn>
              <v-btn
                @click="handleDeletedTodo(todo)"
                class="ml-3 text-h7 bg-grey-lighten-5"
                icon="mdi-trash-can"
              ></v-btn>
            </v-card>
          </v-list-item>
        </v-list>
      </v-sheet>
      <v-sheet class="bg-grey-lighten-2 rounded-xl" height="60">
        <v-pagination
          v-model="page"
          :length="length"
          rounded="circle"
          class="pagination"
          @update:model-value="pageChange()"
        ></v-pagination>
      </v-sheet>
    </div>
    <v-sheet class="bg-grey-lighten-2 rounded-xl" height="400" v-else>
      <h3 class="text-center">Failed To Load Todos</h3>
    </v-sheet>
    <div class="d-flex justify-center align-center">
      <v-btn
        @click="showTodoForm = true"
        prepend-icon="mdi-plus"
        class="rounded-xl ma-5"
      >
        Add More Todo
      </v-btn>
      <v-checkbox
        v-model="showCompleted"
        density="compact"
        label="Show Completed"
        class="d-inline-flex flex-row-reverse mr-5"
        @update:model-value="handleShowCompleted"
      ></v-checkbox>
    </div>
    <v-overlay
      v-model="showTodoForm"
      contained
      class="align-center justify-center"
      @update:model-value="handleAddTodo"
    >
      <AddTodoForm :new-id="newId" v-model:todos="todos" />
    </v-overlay>
    <v-overlay
      v-model="showEditForm"
      contained
      class="align-center justify-center"
      @update:model-value="handleEditTodo"
    >
      <EditTodoForm
        :todo="todoItem"
        v-model:todos="todos"
        :index="todos.indexOf(todoItem)"
      />
    </v-overlay>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
import AddTodoForm from "./AddTodoForm.vue";
import EditTodoForm from "./EditTodoForm.vue";
import { TodosListPresenter } from "@/presenters/TodosListPresenter";
import { ComponentPublicInstance } from "vue";
import { ITodoList } from "@/interfaces/ITodoList";
import { TodoType } from "@/repo/services/todo.service";
import { useStore } from "vuex";
export default defineComponent({
  name: "TodosList",
  setup() {
    const todos = ref<TodoType[]>([]);
    const popUpMessage = ref<string>("");
    const popUpType = ref<string>("");
    console.log(getCurrentInstance())
    const presenter = new TodosListPresenter(
      getCurrentInstance()?.proxy as ComponentPublicInstance<ITodoList>
    );
    const store = useStore();
    const todosLoaded = ref<boolean>(false);
    const todoItem = reactive<TodoType>({
      id: -1,
      userId: -1,
      name: "",
      done: false,
    });
    const filteredTodos = ref<TodoType[]>([]);
    const displayedTodos = ref<TodoType[]>([]);
    const length = ref<number>();
    const showTodoForm = ref<boolean>(false);
    const showEditForm = ref<boolean>(false);
    const showCompleted = ref<boolean>(false);
    const page = ref<number>(1);
    const newId = ref<number>(-1);
    const setTodos = async () => {
      todos.value = await presenter.all();
    };
    setTodos();
    const setTodosLoaded = () => {
      todosLoaded.value = true;
    };
    const setNewId = (id: number) => {
      newId.value = id;
    };
    const setFilteredTodos = (newfilteredTodos: TodoType[]) => {
      filteredTodos.value = newfilteredTodos;
    };
    const setDisplayedTodos = (newDisplayedTodos: TodoType[]) => {
      displayedTodos.value = newDisplayedTodos;
    };
    const setLength = (newLength: number) => {
      length.value = newLength;
    };
    const setPage = (newPage: number) => {
      page.value = newPage;
    };
    const getStore = () => {
      return store;
    };
    const getTodos = () => {
      return todos.value;
    };
    const getShowCompleted = () => {
      return showCompleted.value;
    };
    const getFilteredTodos = () => {
      return filteredTodos.value;
    };
    const getDisplayedTodos = () => {
      return displayedTodos.value;
    };
    const getLength = () => {
      return length.value;
    };
    const getPage = () => {
      return page.value;
    };
    const showError = (error: string) => {
      popUpMessage.value = error;
      popUpType.value = "fail";
    };
    const pageChange = () => {
      presenter.handleChanges();
    };
    const handleAddTodo = () => {
      presenter.handleChanges();
    };
    const handleEditTodo = () => {
      presenter.handleChanges();
    };
    const handleCompletedTodo = (todo: TodoType) => {
      presenter.todoCompleted(todo);
    };
    const handleDeletedTodo = (todo: TodoType) => {
      presenter.removeTodo(todo.id);
    };
    const handleShowCompleted = () => {
      presenter.handleChanges();
    };
    return {
      presenter,
      todos,
      todosLoaded,
      todoItem,
      popUpMessage,
      popUpType,
      filteredTodos,
      displayedTodos,
      length,
      showTodoForm,
      showEditForm,
      showCompleted,
      page,
      newId,
      setTodos,
      setTodosLoaded,
      setNewId,
      setFilteredTodos,
      setDisplayedTodos,
      setLength,
      setPage,
      showError,
      getStore,
      getTodos,
      getShowCompleted,
      getFilteredTodos,
      getDisplayedTodos,
      getLength,
      getPage,
      pageChange,
      handleAddTodo,
      handleEditTodo,
      handleCompletedTodo,
      handleDeletedTodo,
      handleShowCompleted,
    };
  },
  components: { AddTodoForm, EditTodoForm },
});
</script>
