<script setup lang="ts">import { BUTTON_TYPE } from '../model/ButtonType';

type Props = {
    show: boolean
    x: number
    y: number
    index: number
    cols: number
    clicked: (index: number, button_type: BUTTON_TYPE) => void
}
const props = defineProps<Props>()
const index = () => { return parseInt(props.index.toString()) }
const cols = () => { return parseInt(props.cols.toString()) }
const col = () => { return index() % cols() }
const row = () => { return Math.floor(index() / cols()) }
const x = () => {
    if (col() / cols() <= 0.7) {
        return parseInt(props.x.toString())
    }
    return parseInt(props.x.toString()) - 100
}

const y = () => {
    if (row() / cols() <= 0.7) {
        return parseInt(props.y.toString())
    }
    return parseInt(props.y.toString()) - 100
}
</script>
<template>
    <svg class="menu" v-if="props.show">
        <g>
            <rect x="0" y="0" width="500" height="500" fill="white" fill-opacity="0"
                @click="() => props.clicked(index(), 'menu')" />
            <circle :cx="x() + 75" :cy="y() + 25" r="25" stroke="black" fill="white"
                @click="() => props.clicked(index(), 'flag')" />
            <text :x="x() + 75" :y="y() + 25" text-anchor="middle" dominant-baseline="central" stroke="black"
                @click="() => props.clicked(index(), 'flag')">🚩</text>
            <circle :cx="x() + 75" :cy="y() + 75" r="25" stroke="black" fill="white"
                @click="() => props.clicked(index(), 'open')" />
            <text :x="x() + 75" :y="y() + 75" text-anchor="middle" dominant-baseline="central" stroke="black"
                @click="() => props.clicked(index(), 'open')">⛏</text>
        </g>
    </svg>
</template>
<style scoped>
.menu {
    position: sticky;
    margin-top: -500px;
    margin-left: -0px;
    height: 500px;
    width: 500px;
    border-width: 0px;
    border-style: none;
}
</style>