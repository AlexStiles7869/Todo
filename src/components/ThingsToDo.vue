<template>
    <div class="things-to-do-container">
      <h2>Things to Do</h2>
      <p>Things that I need to do before this demo is completed.</p>
      <h3>Todo Functionality:</h3>
      <ul>
        <strike><li>Add click listeners to all the current todos to toggle their completion state.</li></strike>
        <strike><li>Add functionality for form contents to be read, then cleared, and added to current todos and local storage</li></strike>
        <strike><li>Get current todos from local storage</li></strike>
        <li>Make todo names updatable</li>
        <li>Make date, time, and notes optional</li>
        <li>Consolidate date and time into singular datetime input</li>
        <li>Create tag selector and div to display currently added tags</li>
        <li>Mobile Fixes
          <ul>
            <li>Date and time not displaying properly</li>
            <li>Remove page margins</li>

          </ul>
        </li>
        <li>Filtering
          <ul>
            <li>Filter by completion state</li>
            <li>Filter by tags</li>
          </ul>
        </li>
        <strike><li>Ability to move todos once completed back to in progress</li></strike>
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
            <li>Have animation when todo completed</li>
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

@media screen and (max-width: 720px) {
  .things-to-do-container {
    margin: 0 1rem 2rem 1rem;
  }
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

strike {
  color: rgba(0,0,0,0.5);
}
</style>