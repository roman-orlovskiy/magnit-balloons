import * as PIXI from 'pixi.js';
import getPixiApp from "./getPixiApp";

class Background {
  item: PIXI.Sprite;

  constructor() {
    const pixiApp = getPixiApp();
    const backTexture = PIXI.Texture.from('/images/background.svg');
    this.item = new PIXI.Sprite(backTexture);
    this.updateSizes();
    pixiApp.stage.addChild(this.item);
  }

  updateSizes() {
    const pixiApp = getPixiApp();
    this.item.x = 0;
    this.item.y = 0;
    this.item.width = pixiApp.screen.width;
    this.item.height = pixiApp.screen.height;
  }
}

export default Background;
