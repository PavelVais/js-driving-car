<template>
    <div class="hello">
        <canvas id="game"></canvas>

    </div>
</template>

<script>

import {Game} from "@/components/js/Game";

export default {
    name: 'CanvasPage',
    props: {
        msg: String
    },
    mounted() {
        const game = new Game("game");
        game.run();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

canvas {
    background-color: #8d8d8d;
}
</style>
