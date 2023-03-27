<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import getPixiApp from '../pixi-utils/getPixiApp';
import Background from '../pixi-utils/background';
import Ball from '../pixi-utils/ball';

const game = ref(null);
const gameView = ref(null);
const pixiApp = ref(null);
const background = ref(null);
const stepBallsCount = 20;
const balls = {};
let counter = 0;

function handleOnSplash(ball) {
  delete balls[ball.id];
  counter++;
  balls[counter] = new Ball(counter, handleOnSplash);
}

function createBalls() {
  let localCounter = 0;
  pixiApp.value.ticker.add(() => {
    counter++;
    localCounter++;
    if (localCounter <= stepBallsCount) {
      balls[counter] = new Ball(counter, handleOnSplash);
    } else {
      pixiApp.value.ticker.remove(() => {});
    }
    for (const ballsKey in balls) {
      balls[ballsKey].move();
    }
  });
}

function handleResize() {
  pixiApp.value.renderer.resize(game.value.offsetWidth, game.value.offsetHeight);
}
onMounted(() => {
  pixiApp.value = getPixiApp();
  pixiApp.value.renderer.resize(game.value.offsetWidth, game.value.offsetHeight);
  gameView.value.appendChild(pixiApp.value.view);
  background.value = new Background();

  createBalls();
  window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
  delete background.value;
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div
    ref="game"
    class="game"
  >
    <div class="game__cloud">
      <img src="/images/cloud.svg">
    </div>
    <div
      ref="gameView"
      class="game__view"
    />
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
.game__view {
  height: 100%;
  display: flex;
}
.game__cloud {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
}
.game__cloud>img {
  width: 100%;
  display: block;
}
</style>
