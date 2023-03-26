import * as PIXI from 'pixi.js';

function setBall() {
}

function getBall() {
  const ballTexture = PIXI.Texture.from('/images/ball.svg');
  const ball = new PIXI.Sprite(ballTexture);

  ball.x = 30;
  ball.y = 130;
  ball.width = 60;

  return ball;
}

export { setBall, getBall };
