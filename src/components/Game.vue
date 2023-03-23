<script setup>
import { ref } from 'vue'

const score = ref(0)
</script>

<template>
  <div>Score: {{ score }}</div>
  <div ref="game"></div>
</template>

<style scoped>
</style>
