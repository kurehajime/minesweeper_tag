<script setup lang="ts">
import { reactive, ref } from 'vue';
import { BUTTON_TYPE } from '../model/ButtonType';
import { Field } from '../model/Field';

const props = defineProps<{ width: number, bomb: number }>()
const field = ref(Field.GetRandomField(props.width, props.bomb))
const showAssistant = ref(false)
const showMenu = ref(false)
const selectIndex = ref(0)
// TODO: タイマー処理
// TODO: サウンド処理
const startScore = () => {
    // タイマーをスタート
}
const resetScore = () => {
    // タイマーをリセット
}
const pauseScore = () => {
    // タイマーを一時停止
}
const play = () => {
    // サウンドを再生
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

</template>

<style scoped>

</style>
