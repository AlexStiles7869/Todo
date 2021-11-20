<template>
    <div class="todo-tag">
        <span>{{ tag.name }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TagType } from "../types"
export default Vue.extend({
    props: {
        tag: Object as () => TagType
    }
})
</script>

<style scoped>
.todo-tag {
    padding: 0.4rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    font-size: 0.75rem;
}
</style>