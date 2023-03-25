<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as PIXI from 'pixi.js';
import { getBackground, setBackground } from '../pixi-utils/getBackground';

const game = ref(null);
const gameView = ref(null);
onMounted(() => {
    const pixiApp = new PIXI.Application({
      width: game.value.offsetWidth,
      height: game.value.offsetHeight,
      antialias: true,
      resolution: 1,
    });

    gameView.value.appendChild(pixiApp.view);

    const background = getBackground(pixiApp);
    pixiApp.stage.addChild(background);
    window.addEventListener('resize', () => {
      pixiApp.renderer.resize(game.value.offsetWidth, game.value.offsetHeight);
      setBackground(pixiApp);
    });
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
