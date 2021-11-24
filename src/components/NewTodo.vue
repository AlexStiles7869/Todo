<template>
    <div class="new-todo-form-container">
        <h4>New Todo</h4>
        <form v-on:submit.prevent="new_todo">
            <div class="form-row">
                <input class="todo-name-input" placeholder="Todo Name" type="text" name="todo" id="todo-input" required v-model="new_todo_name">
            </div>
            <div class="form-row">
                <input class="todo-date" type="date" name="date" required v-model="new_todo_date">
                <input class="todo-time" type="time" name="time" required v-model="new_todo_time">
            </div>
            <div class="form-row">
                <textarea name="notes" placeholder="Notes" v-model="new_todo_notes"></textarea>
            </div>
            <div class="form-row">
                <TagSelector v-bind:tags="tags" v-on:new-tag-selected="new_tag_selected" />
            </div>
            <div class="form-row">
                <input class="form-submit" type="submit" value="Add">
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TagSelector from "./TagSelector.vue"
import {TagType} from "../types"

export default Vue.extend({
    data() {
        return {
            new_todo_name: "",
            new_todo_date: "",
            new_todo_time: "",
            new_todo_notes: "",
            new_todo_tags: new Array(),
        }
    },
    props: {
        add_todo_callback: Function,
        tags: Array as () => TagType[],
    }, components: {
        TagSelector,
    }, methods: {
        new_todo() {
            const todo_name: string = this.new_todo_name;
            const todo_date: string = this.new_todo_date;
            const todo_time: string = this.new_todo_time;
            const todo_notes: string = this.new_todo_notes;

            if (todo_name && todo_name.trim() && todo_date && todo_time) {
                // Create new todo
                this.add_todo_callback(todo_name, todo_date, todo_time, todo_notes, this.new_todo_tags);

                // Clear form
                this.new_todo_name = "";
                this.new_todo_date = "";
                this.new_todo_time = "";
                this.new_todo_notes = "";
                this.new_todo_tags = new Array();
            }
        }, new_tag_selected(tag : TagType) {
            this.new_todo_tags.push(tag);
        }
    }
})
</script>

<style scoped>
/* Todo Add Form */

.new-todo-form-container {
  padding: 1rem;
  border-top: 1px solid #eee;
  width: 100%;
}

.new-todo-form-container form {
  width: 100%;
  margin-top: 1rem;
}

.new-todo-form-container form .form-row {
    display: flex;
}

.new-todo-form-container form .form-row:not(:first-child) {
    margin-top: 1rem;
}

.new-todo-form-container form .form-row > *:not(:first-child) {
    margin-left: 1rem;
}

.new-todo-form-container input:not([type="submit"]), .new-todo-form-container textarea {
  flex-grow: 1;
  font-size: 0.9rem;
  padding: 0.7rem;
  background-color: #eee;
  border: none;
  border-radius: 0.2rem;
  border: 1px solid transparent;
  cursor: text;
}

.new-todo-form-container input:not([type="submit"]):focus, .new-todo-form-container textarea:focus {
  border: 1px solid #ccc;
  outline: none;
}

.new-todo-form-container .todo-date, .new-todo-form-container .todo-time {
    font-size: 0.8rem !important;
}

.new-todo-form-container textarea {
    resize: none;
    height: 6rem;
    width: 100%;
}

.new-todo-form-container .form-submit {
  background-color: #2196f3;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.7rem 1rem;
  font-weight: 500;
  border-radius: 0.2rem;
  -webkit-appearance: none;
}
</style>