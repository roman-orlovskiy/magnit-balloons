import * as PIXI from 'pixi.js';
import getPixiApp from "./getPixiApp";

class Ball {
  item: PIXI.Sprite;
  pixiApp: PIXI.Application;
  constructor() {
    const ballTexture = PIXI.Texture.from('/images/ball.svg');

    this.pixiApp = getPixiApp();
    this.item = new PIXI.Sprite(ballTexture);
    this.item.x = 30;
    this.item.y = 130;
    this.pixiApp.stage.addChild(this.item);
  }
}

export default Ball;
