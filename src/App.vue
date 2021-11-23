<template>
  <div id="app">
    <div class="intro">
      <h1>Simple Todo App</h1>
      <p>This app is a simple to-do app created to show a simple Vue app functioning. It has a persistent state; that is, the app will preserve any modification to the completion state of the individual to-do's between sessions (assuming the user doesn't clear local storage).  I could feasibly extend this to utilise a CMS in some way for actual persistence.</p>
      <p>The app is shown below.</p>
    </div>
    <TodoContainer 
      v-bind:todos="todos"
      v-bind:safe_tags="tags"
      v-bind:toggle_todo_callback="toggle_todo" 
      v-bind:add_todo_callback="add_todo"
      v-bind:remove_todo_callback="remove_todo" 
    />
    <ThingsToDo />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoContainer from "./components/TodoContainer.vue";
import ThingsToDo from "./components/ThingsToDo.vue"
import Footer from "./components/Footer.vue"

import { TodoType, TagType } from "./types"

export default Vue.extend({
  name: "App",
  components: {
    TodoContainer,
    ThingsToDo, // Remove after demo completed
    Footer
  },
  data() {
    return {
      todos: new Array as TodoType[],
      tags: [
        {name: "Home 🏠", id: 0}, 
        {name: "Work 🧳", id: 1}, 
        {name: "Gym 🏋️‍♂️", id: 2},
        {name: "Gardening 🌳", id: 3},
        {name: "Programming 💻", id: 4}
      ] as TagType[],
      storage: null,
    };
  }, created: function() {
    // If no todos have ever been stored, set the number of todos to zero
    if (window.localStorage.getItem("todos") == null) {
      window.localStorage.setItem("todos", JSON.stringify(new Array));
      window.localStorage.setItem("todo_uid", JSON.stringify(0));
    } else {
      // Read in all the todos and store them
      this.todos = JSON.parse(window.localStorage.getItem("todos")!);
    }
  }, methods: {
    toggle_todo(todo_id: number) {
      // Create the modified todo
      const selected_todo: TodoType = this.todos.find((todo) => todo.id == todo_id)!;

      const modified_todo: TodoType = {
        ...selected_todo,
        completed: !selected_todo.completed
      }

      // Update data and local storage

      Vue.set(this.todos, this.todos.findIndex((todo) => todo.id == todo_id), modified_todo);

      window.localStorage.setItem("todos", JSON.stringify(this.todos));
    }, add_todo(name: string, date: string, time: string, notes: string) {
      const date_obj: Date = new Date(date);
      const formatted_date: string = date_obj.toLocaleDateString("en-NZ", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      const todo: TodoType = {
        name: name,
        id: JSON.parse(window.localStorage.getItem("todo_uid")!),
        date: formatted_date,
        time: time,
        note: notes,
        tags: this.tags,
        completed: false
      }

      // Add to current list of todos
      this.todos.push(todo);

      // Increment UID
      const new_uid: number = JSON.parse(window.localStorage.getItem("todo_uid")!) + 1;
      window.localStorage.setItem("todo_uid", JSON.stringify(new_uid));

      // Place the todo in local storage
      window.localStorage.setItem("todos", JSON.stringify(this.todos));
    }, remove_todo(todo_id: number) {
      // Find the required todo  
      this.todos.splice(this.todos.findIndex((todo) => todo.id == todo_id), 1);

      // Remove it from local storage
      window.localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  }
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.intro {
  margin: 2rem 2rem 0 2rem;
}

@media screen and (max-width: 720px) {
  .intro {
    margin: 2rem 1rem 0 1rem;
  }
}

.intro > * {
  line-height: 1.5;
}

.intro > *:not(:first-child) {
  margin-top: 1rem;
}

h1 {
  font-weight: 600;
}
</style>
