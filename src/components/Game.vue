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

    const app = new PIXI.Application({
      width: gameContainer.offsetWidth,
      height: gameContainer.offsetHeight,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });

    this.$refs.game__field.appendChild(app.view);
    window.addEventListener('resize', () => {
      app.renderer.resize(gameContainer.offsetWidth, gameContainer.offsetHeight);
    });

    const ballTexture = PIXI.Texture.from(ballImg);
    const balls = [];

    function createBall() {
      const ball = new PIXI.Sprite(ballTexture);
      ball.anchor.set(0.5);
      ball.x = Math.random() * app.screen.width;
      ball.y = Math.random() * app.screen.height;
      ball.interactive = true;
      ball.buttonMode = true;
      ball.on('pointerdown', () => {
        app.ticker.add(() => {
          ball.alpha -= 0.1;
          if (ball.alpha <= 0) {
            app.ticker.remove(() => {});
            app.stage.removeChild(ball);
          }
        });
      });
      return ball;
    }

    function addBall() {
      const ball = createBall();
      balls.push(ball);
      app.stage.addChild(ball);
    }

    app.ticker.add(() => {
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
      ref="game__field"
      class="game__field"
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
