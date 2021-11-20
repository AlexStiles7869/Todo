<template>
  <div class="growth-boi">
    <div class="todo-container">
      <div class="todos">
        <template v-if="todos.length">
          <Todo 
            v-for="todo in todos" 
            v-bind:todo="todo" 
            v-bind:key="todo.id" 
            v-bind:toggle_todo_callback="toggle_todo_callback"
            v-bind:remove_todo_callback="remove_todo_callback"
          />      
        </template>
        <template v-else>
          <div class="no-todos">
            <span>No Todos!</span>
          </div>
        </template>
      </div>
      <div class="new-todo-form-container">
        <form v-on:submit.prevent="add_todo">
          <input class="form-input" type="text" name="todo" id="todo-input" v-model="new_todo_name">
          <input class="form-submit" type="submit" value="Add">
        </form>
      </div>
      <div class="todo-status">
        <div class="todo-status-container">
          <span>In Progress: {{ in_progress_todos_length(todos) }}</span>
        </div>
        <div class="todo-status-container">
          <span>Completed: {{ completed_todos_length(todos) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Todo from "../components/Todo.vue"
import { TodoType } from "../types";

export default Vue.extend({
  name: "TodoContainer",
  components: {
    Todo,
  },
  props: {
    todos: Array as () => TodoType[],
    toggle_todo_callback: Function,
    add_todo_callback: Function,
    remove_todo_callback: Function,
  },
  methods: {
    in_progress_todos_length(todos: TodoType[]): number {
      return todos.filter((todo) => !todo.completed).length;
    }, completed_todos_length(todos: TodoType[]): number {
      return todos.filter((todo) => todo.completed).length;
    }, add_todo() {
      // Get the contents of form
      const todo_name: string = this.new_todo_name;

      if (todo_name && todo_name.trim()) {
        // Create new todo
        this.add_todo_callback(todo_name);

        // Clear form
        this.new_todo_name = "";
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* General */
.growth-boi {
  flex-grow: 1
}

.todo-container {
  margin: 2rem;
  width: calc(100% - 4rem);
  border: 1px solid #eee;
  border-radius: 1rem;
  user-select: none;
}

/* Current Todos */

.no-todos {
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-todos span {
  font-size: 1.5rem;
}

/* Todo Add Form */

.new-todo-form-container {
  padding: 1rem;
  border-top: 1px solid #eee;
  width: 100%;
}

.new-todo-form-container form {
  display: flex;
  width: 100%;
}

.new-todo-form-container .form-input {
  flex-grow: 1;
  font-size: 0.9rem;
  padding: 0.7rem;
  background-color: #eee;
  border: none;
  border-radius: 0.2rem;
  border: 1px solid transparent;
}

.new-todo-form-container .form-input:focus {
  border: 1px solid #ccc;
  outline: none;
}

.new-todo-form-container .form-submit {
  margin-left: 1rem;
  background-color: #2196f3;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.7rem 1rem;
  font-weight: 500;
  border-radius: 0.2rem;
  -webkit-appearance: none;
}

/* Todos Status */

.todo-status {
  display: flex;
}

.todo-status-container {
  padding: 1rem;
  flex-grow: 1;
  border-top: 1px solid #eee;
}

.todo-status-container:not(:last-child) {
  border-right: 1px solid #eee;
}

.todo-status-container span {
  font-weight: 500;
}
</style>
