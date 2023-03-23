<script>
import ballImg from '../assets/ball.png';
import { defineComponent } from 'vue';
import * as PIXI from 'pixi.js';

export default defineComponent({
  data() {
    return {
      score: 0,
    };
  },
  mounted() {
    const gameContainer = this.$refs.game;

    const renderer = new PIXI.Application({
      width: gameContainer.offsetWidth,
      height: gameContainer.offsetHeight,
      antialias: true,
      transparent: true,
      resolution: 1,
    });

    this.$refs.game__renderer.appendChild(renderer.view);
    window.addEventListener('resize', () => {
      renderer.renderer.resize(gameContainer.offsetWidth, gameContainer.offsetHeight);
    });

    const ballTexture = PIXI.Texture.from(ballImg);
    const balls = [];

    function createBall() {
      const ball = new PIXI.Sprite(ballTexture);
      ball.anchor.set(0.5);
      ball.x = Math.random() * renderer.screen.width;
      ball.y = Math.random() * renderer.screen.height;
      ball.interactive = true;
      ball.buttonMode = true;
      ball.on('pointerdown', () => {
        renderer.ticker.add(() => {
          ball.alpha -= 0.1;
          if (ball.alpha <= 0) {
            renderer.ticker.remove(() => {});
            renderer.stage.removeChild(ball);
          }
        });
      });
      return ball;
    }

    function addBall() {
      const ball = createBall();
      balls.push(ball);
      renderer.stage.addChild(ball);
    }

    renderer.ticker.add(() => {
      if (balls.length < 10) {
        addBall();
      }
    });
  },
});

</script>

<template>
  <div
    ref="game"
    class="game"
  >
    <div
      ref="game__renderer"
      class="game__renderer"
    >
    </div>
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
