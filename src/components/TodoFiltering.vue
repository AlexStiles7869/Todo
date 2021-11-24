<template>
    <div class="todo-filtering">
        <div class="todo-completion-filtering">
          <h4>Completion Filters</h4>
          <!-- <div class="completion-filters">
          </div> -->
        </div>
        <div class="todo-tag-filtering">
          <h4>Tag Filters</h4>
          <div v-if="filtering_tags.length" class="tag-filters">
            <Tag class="tag-filter" 
                v-for="tag in filtering_tags" 
                v-bind:tag="tag" 
                v-bind:key="tag.id" 
                v-on:click="add_tag_filter"
            />
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Tag from "./Tag.vue"

import { TagType } from "../types"

export default Vue.extend({
    name: "TodoFiltering",
    components: {
        Tag,
    },
    props: {
        filtering_tags: Array as () => TagType[],
    }, data() {
        return {
            tag_filters: new Array(),
            completition_filter: new Object(),
        }
    }, methods: {
        add_tag_filter() {
            
        }
    }
})
</script>

<style scoped>
/* Filtering */

.todo-filtering {
  padding: 1rem;;
  border-bottom: 1px solid #eee;
  display: flex;
}

.todo-filtering > *:not(:first-child) {
  margin-left: 2rem;
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
</style>