<script setup lang="ts">import { Field } from '../model/Field';
type Props = {
    field: Field
    clickReset: () => void
    cellSize: number
    time: number
}
const props = defineProps<Props>()
const cellSize = props.cellSize
const face = () => {
    if (props.field.IsComplete()) {
        return "😎"
    }
    if (props.field.IsGameOver()) {
        return "🥺"
    }
    return "😀"
}

</script>
<template>
    <div>
        <div class="title_bar" :style="{ width: props.field.Size() * cellSize }">
            <div class="title"> Minesweeper </div>
        </div>
        <div :style="{ width: props.field.Size() * cellSize }" class="bar">
            <div class='item num'><b>{{ props.field.BombCount() }}</b></div>
            <div class='item center'>
                <div class="button" @click="() => { props.clickReset() }">{{ face() }}</div>
            </div>
            <div class='item num'><b>{{ props.time }}</b></div>
        </div>
    </div>
</template>
<style scoped>
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
</style>