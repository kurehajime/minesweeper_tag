<script setup lang="ts">
import GameElement from './GameElement.vue';
type Props = {
    width: number
    bomb: number
    cellSize: number
}

const props = defineProps<Props>()
</script>

<template>
    <GameElement :width="props.width" :bomb="props.bomb" :cellSize="props.cellSize"></GameElement>
</template>
<style>
@font-face {
    font-family: 'DSEG7Classic-Bold';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('DSEG7Classic-Bold'),
        url('../assets/DSEG7Classic-Bold.woff2') format('woff2');
}

.bar {
    background-color: lightgray;
    width: 500px;
    display: flex;
    border-style: ridge;
    border-width: 5px;
}

.title_bar {
    width: 500px;
    border-style: ridge;
    border-width: 5px;
    background-color: blue;
    display: flex;
}

.title {
    width: calc(100% / 2);
    color: white;
    font-weight: bolder;
    padding-top: 5px;
}

.help {
    color: black;
    margin-left: auto;
    font-weight: bolder;
}

.item {
    width: calc(100% / 3);
    text-align: center;
    list-style: none;
    border-style: ridge;
    border-width: 2px;
}

.num {
    background-color: rgb(50, 30, 30);
    color: red;
    text-align: right;
    padding-right: 5px;
    padding-top: 5px;
    font-family: 'DSEG7Classic-Bold', sans-serif;
    font-size: 18px;
}

.center {
    display: flex;
    justify-content: center;
}

.button {
    appearance: none;
    border-style: solid;
    border-width: 3px;
    background-color: lightgray;
    border-top-color: whitesmoke;
    border-left-color: whitesmoke;
    border-bottom-color: gray;
    border-right-color: gray;
    width: 30px;
}

svg {
    border-style: ridge;
    border-width: 5px;
}

.menu {
    position: sticky;
    margin-top: -550px;
    margin-left: -0px;
    height: 550px;
    width: 550px;
    border-width: 0px;
    border-style: none;
}
</style>
