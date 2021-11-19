<template>
  <div id="app">
    <div class="intro">
      <h1>Simple Todo App</h1>
      <p>This app is a simple to-do app created to show a simple Vue app functioning. It has a persistent state; that is, the app will preserve any modification to the completion state of the individual to-do's between sessions (assuming the user doesn't clear local storage).  I could feasibly extend this to utilise a CMS in some way for actual persistence.</p>
      <p>The app is shown below.</p>
    </div>
    <TodoContainer v-bind:todos="todos"/>
    <ThingsToDo />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoContainer from "./components/TodoContainer.vue";
import ThingsToDo from "./components/ThingsToDo.vue"
import Footer from "./components/Footer.vue"

export default Vue.extend({
  name: "App",
  components: {
    TodoContainer,
    ThingsToDo, // Remove after demo completed
    Footer
  },
  data() {
    return {
      todos: [ 
        {id: 0, name: "Todo 1", completed: false},
        {id: 1, name: "Todo 2", completed: false},
        {id: 2, name: "Todo 3", completed: false}
      ]
    };
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
