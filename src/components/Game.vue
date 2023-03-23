<script setup>
import { ref } from 'vue';
import ballImg from '../assets/ball.png';

const score = ref(0)
</script>

<template>
  <div>Score: {{ score }}</div>
  <div ref="game">
    <img :src="ballImg">
  </div>
</template>

<style scoped>
</style>
