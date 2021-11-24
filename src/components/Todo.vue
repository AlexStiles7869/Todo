<template>
    <div v-on:click.stop="expand" v-bind:id="todo_id_string('todo', todo.id)" v-bind:class="{ completed: todo.completed }" class="todo">
        <div class="todo-glance-details">
            <div class="todo-glance-top">
                <span class="todo-name">{{ todo.name }}</span>
                <div class="todo-buttons">
                    <button v-bind:id="todo_id_string('todo-complete', todo.id)" class="complete-button" v-on:click.stop="toggle_todo">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    </button>
                    <button v-bind:id="todo_id_string('todo-delete', todo.id)" class="delete-button" v-on:click.stop="remove_todo">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                </div>
            </div>
            <div class="todo-glance-bottom">
                <div class="todo-date-container">
                    <h4>Date & Time</h4>
                    <div class="todo-date">
                        <span>Date: {{ todo.date }}</span>
                        <span>Time: {{ todo.time }}</span>
                    </div>
                </div>
                <div class="todo-tags-container">
                    <h4>Tags</h4>
                    <div class="todo-tags">
                        <!-- <Tag v-bind:tag="todo.tags[0]" /> -->
                        <Tag class="todo-tag" v-for="tag in todo.tags" v-bind:tag="tag" v-bind:key="tag.id" />
                    </div>
                </div>
            </div>
        </div>
        <transition 
            v-on:before-enter="init_expand_animation"
            v-on:enter="enter_expand_animation"
            v-on:before-leave="init_retract_animation"
        >
            <div v-if="this.expanded" class="todo-other-details">
                <h4>Notes</h4>
                <p class="todo-notes">{{ todo.note }}</p>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TodoType } from "../types"
import Tag from "../components/Tag.vue"

export default Vue.extend({
    name: "Todo",
    data() {
        return {
            expanded: false,
        }
    }, components: {
        Tag,
    }, props: {
        todo: Object as () => TodoType,
        toggle_todo_callback: Function,
        remove_todo_callback: Function,
    }, methods: {
        expand() {
            this.expanded = !this.expanded;
        }, init_expand_animation(el: HTMLElement) {
            el.classList.add("expanded");
        }, enter_expand_animation(el: HTMLElement) {
            const todo_height: number = el.scrollHeight;

            el.style.height = todo_height + "px";
        }, init_retract_animation(el: HTMLElement) {
            el.style.height = "0px";
            setTimeout(() => {
                el.classList.remove("expanded");
            }, 200);
        }, todo_id_string(str: string, todo_id: number): string {
            return `${str}-${todo_id}`;
        }, toggle_todo(evt: MouseEvent) {
            const todo_button: HTMLElement | null = evt.currentTarget as HTMLElement;

            if (todo_button != null) {
                const todo_id: number = Number.parseInt(todo_button.id.replace(/\D/g, ""));
                this.toggle_todo_callback(todo_id);
            }
        }, remove_todo(evt: Event) {
            const todo_button: HTMLElement | null = evt.currentTarget as HTMLElement;

            if (todo_button != null) {
                const todo_id: number = Number.parseInt(todo_button.id.replace(/\D/g, ""));
                this.remove_todo_callback(todo_id);
            }
        }
    }
})
</script>

<style scoped>
/* .todo:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
} */

.todo {
    padding: 1rem;
    transition: background-color 200ms;
    cursor: pointer;
}

.todo-name {
    font-size: 1.1rem;
}

.todo-glance-details {

}

.todo-glance-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.todo-tags {
    display: flex;
    max-width: 10rem;
    flex-wrap: wrap;
    margin-left: -0.25rem;
}

.todo-tag {
    margin: 0.25rem;
}

.todo-glance-bottom {
    width: 100%;
    display: flex;
    margin-top: 0.5rem;
}

.todo-glance-bottom > *:not(:first-child) {
    margin-left: 2rem;
}

.todo h4 {
    margin-bottom: 0.5rem;
}

.todo-glance-bottom span {
    font-size: 0.75rem;
    display: block;
    line-height: 2;
}

.todo-other-details {
    height: 0px;
    transition: height 200ms;
    overflow: hidden;
}

.todo-other-details h4 {
    margin-top: 1rem;
}

.todo-notes {
    font-size: 0.75rem;
    line-height: 1.5;
}

.todo-buttons {
    display: flex;
}

.todo-buttons > button {
    margin-left: 1rem;
}

.todo button {
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 200ms background-color;
    cursor: pointer;
}

.todo button:hover {
    background-color: #ddd;
}

.todo.completed {
    background-color: rgba(233, 233, 233, 0.5);
}

/* .todo:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
} */

.todo:hover {
    background-color: rgba(233, 233, 233, 0.5);
}

.todo-name {
    font-weight: 500;
}
</style>