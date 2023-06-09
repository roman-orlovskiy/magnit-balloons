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
const stepBallsCount = 22;
const balls = {};

function handleOnSplash() {
  score.value += 1;
  if (score.value > record.value) {
    localStorage.setItem('record', score.value.toString());
  }
}

function createBalls() {
  let counter = 0;
  pixiApp.value.ticker.add(() => {
    counter++;
    if (counter <= stepBallsCount) {
      balls[counter] = new Ball(counter, handleOnSplash);
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
  const localStorageRecord = localStorage.getItem('record');
  if (localStorageRecord !== null) {
    record.value = parseInt(localStorageRecord);
  }

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
    <div class="game__topBar">
      <div class="game__topBar-inner">
        <div class="game__topBar-content">
          <div class="game__topBar-inner game__topBar-inner--score">
            <div class="game__topBar-content game__topBar-content--score">
              <div class="game__score">
                <img src="/images/ball.svg">
                <div>
                  {{ score }}
                </div>
              </div>
              <div class="game__score">
                <img src="/images/star.svg">
                <div>
                  {{ record }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/images/topBar.svg">
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
.game__topBar-content {
  position: absolute;
  top: -4px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.game__topBar-content--score {
  position: static;
  justify-content: center;
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
  position: relative;
}
.game__topBar-inner--score {
  width: auto;
  background-image: url("/images/topBar-inner.png");
  background-size: 100% 100%;
  padding: 1.5% 5% 2% 5%;
  background-repeat: no-repeat;
}
.game__topBar-inner>img {
  display: block;
  width: 100%;
}
.game__score {
  display: flex;
  align-items: center;
  font-size: 3.2vh;
}
.game__score:first-child {
  margin-right: 2vh;
}

.game__score>img {
  display: block;
  width: 3.8vh;
  margin-right: 1.3vh;
}
</style>
