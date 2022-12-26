<script setup lang="ts">
import GameElement from './components/GameElement.vue';

</script>

<template>
  <div className='container'>
    <div className='outbox'>
      <GameElement :width="10" :bomb="10" :cellSize="50" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
}

.outbox {
  width: 550px;
}
</style>
