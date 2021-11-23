<template>
  <div class="growth-boi">
    <div class="todo-container">
      <div class="todo-filtering">
        <div class="todo-completion-filtering">
          <h4>Completion Filters</h4>
          <!-- <div class="completion-filters">
          </div> -->
        </div>
        <div class="todo-tag-filtering">
          <h4>Tag Filters</h4>
          <div v-if="todo_tags.length" class="tag-filters">
            <Tag class="tag-filter" v-for="tag in todo_tags" v-bind:tag="tag" v-bind:key="tag.id" />
          </div>
        </div>
      </div>
      <div class="todos">
        <template v-if="todos.length">
          <transition-group name="todo-animations">
            <Todo
              v-for="todo in todos" 
              v-bind:todo="todo" 
              v-bind:key="todo.id" 
              v-bind:toggle_todo_callback="toggle_todo_callback"
              v-bind:remove_todo_callback="remove_todo_callback"
            />      
          </transition-group>
        </template>
        <template v-else>
          <div class="no-todos">
            <span>No Todos!</span>
          </div>
        </template>
      </div>
      <NewTodo v-bind:add_todo_callback="add_todo_callback" v-bind:tags="safe_tags" />
      <!-- <div class="todo-status">
        <div class="todo-status-container">
          <span>In Progress: {{ in_progress_todos_length(todos) }}</span>
        </div>
        <div class="todo-status-container">
          <span>Completed: {{ completed_todos_length(todos) }}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Todo from "../components/Todo.vue";
import NewTodo from "../components/NewTodo.vue"
import Tag from "../components/Tag.vue";
import { TodoType, TagType } from "../types";

export default Vue.extend({
  name: "TodoContainer",
  data() {
    return {
      todo_tags: [] as TagType[],
    }
  }, created() {
    this.todo_tags = this.get_todo_tags();
  }, beforeUpdate() {
    this.todo_tags = this.get_todo_tags();
  },
  components: {
    Todo,
    Tag,
    NewTodo,
  },
  props: {
    todos: Array as () => TodoType[],
    safe_tags: Array as () => TagType[],
    toggle_todo_callback: Function,
    add_todo_callback: Function,
    remove_todo_callback: Function,
  },
  methods: {
    get_todo_tags() : TagType[] {
      let added_ids: number[] = [];
      let todo_tags: TagType[] = [];

      this.todos.forEach((todo) => {
        todo.tags.forEach((tag) => {
          if (!added_ids.includes(tag.id)) {
            todo_tags.push(tag);
            added_ids.push(tag.id);
          }
        });
      });

      return todo_tags;
    }, in_progress_todos_length(todos: TodoType[]): number {
      return todos.filter((todo) => !todo.completed).length;
    }, completed_todos_length(todos: TodoType[]): number {
      return todos.filter((todo) => todo.completed).length;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

@media screen and (max-width: 720px) {
  .todo-container {
    margin: 2rem 0;
    width: 100%;
    border-radius: 0;
  }
}

/* Filtering */

.todo-filtering {
  padding: 1rem;;
  border-bottom: 1px solid #eee;
  display: flex;
}

.todo-filtering > *:not(:first-child) {
  margin-left: 2rem;
}

.todo-container h4 {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
}


.tag-filters, .completion-filters {
    display: flex;
    max-width: 20rem;
    flex-wrap: wrap;
    margin-left: -0.25rem;
    margin-top: 0.5rem;
}

.tag-filter {
  margin: 0.25rem;
  cursor: pointer;
  transition: 200ms;
}

.tag-filter:hover {
  background-color: #eee;
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
