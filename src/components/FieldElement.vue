<script setup lang="ts">import { BUTTON_TYPE } from '../model/ButtonType';
import { Field } from '../model/Field';
import CellElement from './CellElement.vue'

type Props = {
    field: Field
    clicked: (index: number, button_type: BUTTON_TYPE) => void
    cellSize: number
    index: number
    selected: boolean
}
const props = defineProps<Props>()
const cellSize = props.cellSize
const FieldSize = props.field.Size() * cellSize
const mouseClick = (e: MouseEvent) => {
    const x = e.offsetX
    const y = e.offsetY
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) {
        clicked(x, y, "menu")
    } else {
        clicked(x, y, e.button === 0 ? "open" : "flag")
    }
    e.preventDefault()
}
const contextMenu = (e: MouseEvent) => {
    const x = e.offsetX
    const y = e.offsetY
    clicked(x, y, "flag")
    e.preventDefault()
    return false
}
const clicked = (x: number, y: number, button_type: BUTTON_TYPE) => {
    const index = Math.floor(x / cellSize) + Math.floor(y / cellSize) * props.field.Size()
    props.clicked(index, button_type)
}
const getCells = () => {
    return props.field.Cells.map((cell, index) => {
        const x = index % props.field.Size() * cellSize
        const y = Math.floor(index / props.field.Size()) * cellSize
        return { x, y, cell, index }
    })
}

</script>
<template>
    <svg :width="FieldSize" :height="FieldSize" @click="mouseClick" @contextmenu="contextMenu">
        <CellElement v-for="cell in getCells()" :key="cell.index" :cell="cell.cell" :x="cell.x" :y="cell.y"
            :cellSize="cellSize" :selected="props.selected && props.index === index" />
        <rect x="0" y="0" :width="FieldSize" :height="FieldSize" opacity="0"></rect>
    </svg>
</template>
<style scoped>
svg {
    border-style: ridge;
    border-width: 5px;
}
</style>