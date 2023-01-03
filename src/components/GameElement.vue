<script setup lang="ts">
import { Ref, ref } from 'vue';
import { BUTTON_TYPE } from '../model/ButtonType';
import { Field } from '../model/Field';
import FieldElement from './FieldElement.vue'
import BarElement from './BarElement.vue'
import MenuElement from './MenuElement.vue'
import boopSfx from '../assets/Tada-sound.mp3';

type Props = {
    cols: number
    bomb: number
    cellSize: number
    beep: boolean
}

const props = defineProps<Props>()
const audio = new Audio(boopSfx)
const field = ref(Field.GetRandomField(props.cols, props.bomb)) as Ref<Field>
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
    clearInterval(intervalId.value)
}
const pauseScore = () => {
    clearInterval(intervalId.value)
}
const play = () => {
    if (props.beep) {
        audio.playbackRate = 1.5
        audio.play()
    }
}
const newGame = () => {
    resetScore()
    field.value = Field.GetRandomField(props.cols, props.bomb)
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
    <MenuElement :show="showMenu" :x="Field.indexToXy(selectIndex, field.Size())[0] * cellSize"
        :y="Field.indexToXy(selectIndex, field.Size())[1] * cellSize" :index="selectIndex" :cols="cols"
        :clicked="clicked">
    </MenuElement>
</template>
<style scoped>

</style>
