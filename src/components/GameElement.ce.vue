<script setup lang="ts">
import { Ref, ref } from 'vue';
import { BUTTON_TYPE } from '../model/ButtonType';
import { Field } from '../model/Field';
import FieldElement from './FieldElement.vue'
import BarElement from './BarElement.vue'
import boopSfx from '../assets/Tada-sound.mp3';

type Props = {
    width: number
    bomb: number
    cellSize: number
}

const props = defineProps<Props>()
const audio = new Audio(boopSfx)
const field = ref(Field.GetRandomField(props.width, props.bomb)) as Ref<Field>
const showMenu = ref(false)
const selectIndex = ref(0)
const scoreTime = ref(0)
const intervalId = ref(0)
const startScore = () => {
    intervalId.value = setInterval(() => {
        scoreTime.value += 1
    }, 1000)
}
const resetScore = () => {
    scoreTime.value = 0
}
const pauseScore = () => {
    clearInterval(intervalId.value)
}
const play = () => {
    audio.playbackRate = 1.5
    audio.play()
}
const newGame = () => {
    resetScore()
    field.value = Field.GetRandomField(10, 10)
}
const clicked = (index: number, button_type: BUTTON_TYPE) => {
    if (!field.value.IsGameOver() && !field.value.IsComplete()) {
        selectIndex.value = index
        if (button_type === 'open') {
            if (field.value.OpenCount() === 0) {
                startScore()
            }
            const newField = field.value.Open(index)
            field.value = newField
            if (newField.IsGameOver() || newField.IsComplete()) {
                pauseScore()
                if (newField.IsComplete()) {
                    play()
                }
            }
            showMenu.value = false
        } else if (button_type === 'menu') {
            if (!field.value.Cells[index].Open) {
                showMenu.value = !showMenu.value
            }
        } else {
            field.value = field.value.ToggleFlag(index)
            showMenu.value = false
        }
    }
}
</script>

<template>
    <BarElement :field="field" :clickReset="() => { newGame() }" :cellSize="cellSize" :time="scoreTime" />
    <FieldElement :field="field" :clicked="clicked" :cellSize="cellSize" :index="selectIndex" :selected="showMenu" />
</template>
<style >
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
</style>
