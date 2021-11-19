<template>
  <div class="growth-boi">
    <div class="todo-container">
      <div class="todos">
        <Todo v-for="todo in todos" v-bind:todo="todo" v-bind:key="todo.id"/>      
      </div>
      <div class="new-todo-form-container">
        <form>
          <input class="form-input" type="text" name="todo" id="todo-input">
          <input class="form-submit" type="submit" value="Add">
        </form>
      </div>
      <div class="todo-status">
        <div class="todo-status-container">
          <span>In Progress: {{ todos.length }}</span>
        </div>
        <div class="todo-status-container">
          <span>Completed: {{ todos.filter((todo) => todo.completed).length}}</span>
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
  },
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
