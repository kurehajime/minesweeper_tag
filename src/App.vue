<script setup lang="ts">
import Game from './components/Game.vue';

</script>

<template>
  <div className='container'>
    <div className='outbox'>
      <Game />
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
