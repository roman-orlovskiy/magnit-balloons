<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import getPixiApp from '../pixi-utils/getPixiApp';
import Background from '../pixi-utils/background';
import Ball from '../pixi-utils/ball';

const game = ref(null);
const gameView = ref(null);
const pixiApp = ref(null);
const background = ref(null);
const score = ref(0);
const record = ref(0);
const stepBallsCount = 20;
const balls = {};
let counter = 0;

function handleOnSplash(ball) {
  delete balls[ball.id];
  counter++;
  balls[counter] = new Ball(counter, handleOnSplash);
  score.value += 1;
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

function saveScore() {
  const localStorageRecord = localStorage.getItem('record');
  if (localStorageRecord === null || score.value > parseInt(localStorageRecord)) {
    localStorage.setItem('record', score.value.toString());
  }
}


onMounted(() => {
  pixiApp.value = getPixiApp();
  pixiApp.value.renderer.resize(game.value.offsetWidth, game.value.offsetHeight);
  gameView.value.appendChild(pixiApp.value.view);
  const localStorageRecord = localStorage.getItem('record');
  if (localStorageRecord !== null) {
    record.value = parseInt(localStorageRecord);
  }

  background.value = new Background();

  createBalls();
  window.addEventListener('resize', handleResize);
  window.addEventListener('beforeunload', saveScore);
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
    <div class="game__topBar">
      <div class="game__topBar-inner">
        <div class="game__score">
          <span>
            {{ score }}
          </span>
          <span>
            {{ record }}
          </span>
        </div>
        <img src="/images/topBar.png">
      </div>
    </div>
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
.game__topBar {
  position: absolute;
  z-index: 2000;
  top: 10vh;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.game__topBar-inner {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 3.3vh;
}
.game__topBar-inner>img {
  display: block;
  width: 100%;
}
.game__score {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 6% 1% 11%;
  align-items: center;
  justify-content: space-evenly;
}
</style>
