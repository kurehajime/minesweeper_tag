<script setup lang="ts">import { Cell } from '../model/State';

type Props = {
    cell: Cell
    x: number
    y: number
    cellSize: number
    selected: boolean
}
const props = defineProps<Props>()
const cellSize = parseInt(props.cellSize.toString())
const x = parseInt(props.x.toString())
const y = parseInt(props.y.toString())
const mark = (): string => {
    if (props.cell.Bomb) {
        return '💣'
    }
    if (props.cell.Count === 0) {
        return ''
    }

    return props.cell.Count.toString()
}

</script>
<template>
    <g>
        <rect :x="x" :y="y" :width="cellSize" :height="cellSize" stroke='black' fill='whitesmoke' />
        <text :x="x + cellSize / 2" :y="y + cellSize / 2" text-anchor="middle" dominant-baseline="central"
            stroke="black">{{ mark() }}</text>
        <g :display="props.cell.Open ? 'none' : 'block'">
            <rect :x="x" :y="y" :width="cellSize" :height="cellSize" stroke='black' fill='lightgray' />
            <line :x1="x + 0" :y1="y + 0" :x2="x + cellSize" :y2="y + 0" :stroke="props.selected ? 'blue' : 'white'"
                stroke-width="3" />
            <line :x1="x + cellSize - 3" :y1="y + 0" :x2="x + cellSize - 3" :y2="y + cellSize"
                :stroke="props.selected ? 'blue' : 'gray'" stroke-width=" 3" />
            <line :x1="x + cellSize - 3" :y1="y + cellSize - 3" :x2="x + 0" :y2="y + cellSize - 3"
                :stroke="props.selected ? 'blue' : 'gray'" stroke-width="3" />
            <line :x1="x + 0" :y1="y + cellSize" :x2="x + 0" :y2="y + 0" :stroke="props.selected ? 'blue' : 'white'"
                stroke-width="3" />
        </g>
        <text :display="props.cell.Flag ? 'block' : 'none'" :x="x + cellSize / 2" :y="y + cellSize / 2"
            text-anchor="middle" dominant-baseline="central" stroke="black">🚩</text>
    </g>
</template>
<style scoped>

</style>
