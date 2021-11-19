<template>
    <div class="todo">
        <span class="todo-name">{{ todo.name }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TodoType } from "../types"

export default Vue.extend({
    name: "Todo",
    props: {
        todo: Object as () => TodoType
    }
})
</script>

<style scoped>
.todo:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.todo {
    padding: 1rem;
    transition: background-color 200ms;
    cursor: pointer;
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