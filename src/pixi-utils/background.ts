import * as PIXI from 'pixi.js';
import getPixiApp from "./getPixiApp";

class Background {
  item: PIXI.Sprite;
  pixiApp: PIXI.Application;

  constructor() {
    const backTexture = PIXI.Texture.from('/images/background.svg');

    this.pixiApp = getPixiApp();
    this.item = new PIXI.Sprite(backTexture);
    this.updateSizes();
    this.pixiApp.stage.addChild(this.item);
  }

  updateSizes() {
    this.item.x = 0;
    this.item.y = 0;
    this.item.width = this.pixiApp.screen.width;
    this.item.height = this.pixiApp.screen.height;
  }
}

export default Background;
