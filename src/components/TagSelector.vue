<template>
    <div class="tag-selector-container">
        <div class="selected-tags">
            <Tag v-bind:id="set_tag_id(tag)" v-on:click.native="remove_tag" v-for="tag in selected_tags" v-bind:tag="tag" v-bind:key="tag.id" />
        </div>
        <button type="button" v-on:click="toggle_modal" class="tag-selector-button">Tags?</button>
        <transition name="tag-selector-modal">
            <div v-if="modal_open" class="tag-selector-modal">
                <div class="tag-selector-search">
                    <input placeholder="Tag Name" type="text" name="tag-search" v-on:input="tag_search" v-model="tag_selector_search">
                </div>
                <div v-if="current_results.length" class="all-tags">
                    <Tag v-bind:id="set_tag_id(tag)" v-on:click.native="add_tag" class="selectable-tag" v-for="tag in current_results" v-bind:tag="tag" v-bind:key="tag.id" />
                </div>
                <div v-else class="no-results">
                    <span>No Results</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tag from "./Tag.vue"

import {TagType} from "../types"

export default Vue.extend({
    data() {
        return {
            modal_open: false,
            remaining_tags: JSON.parse(JSON.stringify(this.tags)),
            selected_tags: new Array,
            current_results: JSON.parse(JSON.stringify(this.tags)),
            tag_selector_search: "",
        };
    }, components: {
        Tag,
    }, props: {
        tags: Array as () => TagType[],
    }, methods: {
        toggle_modal() {
            this.modal_open = !this.modal_open;
        }, set_tag_id(tag: TagType) {
            return `tag-selector-${tag.id}`;
        }, tag_search(): void {
            const search_term: string = this.tag_selector_search.toLowerCase();
            this.current_results = this.remaining_tags.filter((remaining_tag : TagType) => remaining_tag.name.toLowerCase().includes(search_term)).sort((a : TagType, b : TagType) => a.id - b.id);
        }, add_tag(evt: Event) {
            const tag_el: HTMLElement = evt.currentTarget as HTMLElement;
            const tag_id: number = Number.parseInt(tag_el.id.replace(/\D/g, ""))
            const tag: TagType = this.tags.find((tag) => tag.id == tag_id)!;

            this.selected_tags.push(tag);
            this.remaining_tags.splice(this.remaining_tags.findIndex((remaining_tag : TagType) => remaining_tag.id == tag_id), 1);

            this.tag_search();
        }, remove_tag(evt: Event) {
            const tag_el: HTMLElement = evt.currentTarget as HTMLElement;
            const tag_id: number = Number.parseInt(tag_el.id.replace(/\D/g, ""))
            const tag: TagType = this.tags.find((normal_tag) => normal_tag.id == tag_id)!;

            this.remaining_tags.push(tag);
            this.selected_tags.splice(this.selected_tags.findIndex((selected_tag) => selected_tag.id == tag_id), 1);

            this.tag_search();
        }
    }
})
</script>

<style scoped>
.tag-selector-container {
    position: relative;
    width: 20rem;
}

.tag-selector-button {
    cursor: pointer;
    border: 2px dashed #eee;
    padding: 0.6rem 0.85rem;
    background-color: transparent;
    -webkit-apperance: none;
    border-radius: 0.5rem;
    /* font-weight: 600; */
    color: black;
}

.tag-selector-modal {
    position: absolute;
    left: calc(100% + 1rem);
    top: 0;
    background-color: white;
    border-radius: 0.5rem;
    width: 14rem;
    max-height: 8.5rem;
    border: 1px solid #eee;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.tag-selector-modal-enter-active, .tag-selector-modal-leave-active {
    transition: opacity 200ms;
}

.tag-selector-modal-enter, .tag-selector-modal-leave-to {
    opacity: 0;
}

.tag-selector-search {
    border-bottom: 1px solid #eee;
}

.tag-selector-search input {
    padding: 0.6rem;
    border-radius: 0.5rem;
    border: none;
    width: 100%;
    display: block;
    outline: none;
}

.all-tags {
    margin: 0.2rem;
    display: flex;
    flex-wrap: wrap;
}

.no-results {
    margin: 0.6rem;
    font-size: 0.8rem;
}

.selectable-tag {
    margin: 0.2rem;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 200ms;
}

.selectable-tag:hover {
    background-color: #eee;
}

/* Selected Tags */

.selected-tags {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: -0.3rem 0 0.5rem -0.3rem;
}

.selected-tags > * {
    margin: 0.3rem;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 200ms;
}

.selected-tags > *:hover {
    background-color: #eee;
}

</style>