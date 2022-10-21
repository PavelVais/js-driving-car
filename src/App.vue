<template>
    <img style="display: none" alt="Vue logo" src="./assets/logo.png">
    <CanvasPage msg="Canvas place"/>
    <div id="brain"></div>
</template>

<script>
import CanvasPage from './components/CanvasPage.vue'

export default {
    name: 'App',
    components: {
        CanvasPage
    },
    mounted() {

    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
