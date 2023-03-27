<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import getPixiApp from '../pixi-utils/getPixiApp';
import Background from '../pixi-utils/background';
import Ball from '../pixi-utils/ball';

const game = ref(null);
const gameView = ref(null);
const pixiApp = ref(null);
let intervalId = null;
function stop() {
  clearInterval(intervalId)
}
function play() {
  intervalId = setInterval(() => {
    new Ball();
  }, 900);
}
function handleResize() {
  pixiApp.value.renderer.resize(game.value.offsetWidth, game.value.offsetHeight);
}
onMounted(() => {
  pixiApp.value = getPixiApp();
  pixiApp.value.renderer.resize(game.value.offsetWidth, game.value.offsetHeight);
  gameView.value.appendChild(pixiApp.value.view);

  new Background();
  new Ball();
  play();

  window.addEventListener('resize', handleResize);
  window.addEventListener('focus', play);
  window.addEventListener('blur', stop);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  window.addEventListener('focus', play);
  window.addEventListener('blur', stop);
});
</script>

<template>
  <div
    ref="game"
    class="game"
  >
    <div ref="gameView" />
  </div>
</template>

<style scoped>
.game {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
