<template>
    <footer>
        <div class="footer-container">
            <h4>Colophon</h4>
            <p>Designed by Alex Stiles</p>
            <p>&copy; 2021</p>
        </div>
        <div class="footer-container">
            <h4>Purpose</h4>
            <p>Demonstration of a simple Vue app with persistent state.</p>
        </div>
        <div class="footer-container">
            <h4>Acknowledgements</h4>
            <p>There are no major acknowledgements for this website.</p>
        </div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "Footer",
});
</script>

<style scoped>
footer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 4rem;
    padding: 3rem;
    background-color: #ffe082;
}

.footer-container > * {
    line-height: 1.5;
}

.footer-container h4 {
    font-size: 1rem;
    font-weight: 600;
}

.footer-container > *:not(:first-child) {
    margin-top: 0.5rem;
}
.footer-container p {
    font-size: 0.9rem;
}
</style>
