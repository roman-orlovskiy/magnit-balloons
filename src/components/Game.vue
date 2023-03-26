<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import getPixiApp from '../pixi-utils/getPixiApp';
import { getBackground, setBackground } from '../pixi-utils/background';
import { getBall } from '../pixi-utils/ball';

const game = ref(null);
const gameView = ref(null);
onMounted(() => {
  const pixiApp = getPixiApp();
  pixiApp.renderer.resize(game.value.offsetWidth, game.value.offsetHeight);
  gameView.value.appendChild(pixiApp.view);

  const background = getBackground();
  setBackground();
  pixiApp.stage.addChild(background);

  const ball = getBall();
  pixiApp.stage.addChild(ball);

  window.addEventListener('resize', () => {
    pixiApp.renderer.resize(game.value.offsetWidth, game.value.offsetHeight);
    setBackground();
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
