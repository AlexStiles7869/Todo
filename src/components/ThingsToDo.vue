<template>
    <div class="things-to-do-container">
      <h2>Things to Do</h2>
      <p>Things that I need to do before this demo is completed.</p>
      <h3>Todo Functionality:</h3>
      <ul>
        <strike><li>Add click listeners to all the current todos to toggle their completion state.</li></strike>
        <strike><li>Add functionality for form contents to be read, then cleared, and added to current todos and local storage</li></strike>
        <strike><li>Get current todos from local storage</li></strike>
        <li>Have different pages for completed and in progress todos, with ability to move todos once completed back to in progress</li>
        <strike><li>Allow todos to be deleted</li></strike>
        <strike><li>Add the following fields to todos:
          <ul>
            <li>Date (doesn't need to be validated, just any string)</li>
            <li>Time</li>
            <li>Preset tags (added tags out of scope, could be added somewhat easily)</li>
            <li>Notes</li>
          </ul>
        </li></strike>
        <li>Animations
          <ul>
            <li>Have collapsed form of todos, with arrow to expand with animation.</li>
            <li>Date, time, and tags shown when collapsed</li>
            <li>Arrow only presented if required to show notes</li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ThingsToDo",
})
</script>

<style scoped>
.things-to-do-container {
    margin: 0 2rem 2rem 2rem;
    list-style-position: inside;
}

.things-to-do-container h2, .things-to-do-container h3 {
    font-weight: 600;
}

.things-to-do-container > *:not(:first-child) {
    margin-top: 1rem;
}

.things-to-do-container li {
    line-height: 2;
}

.things-to-do-container li > ul {
    margin-left: 2rem;
}
</style>