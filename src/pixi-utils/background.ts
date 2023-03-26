import * as PIXI from 'pixi.js';
import getPixiApp from "./getPixiApp";

const backTexture = PIXI.Texture.from('/images/background.svg');
const back = new PIXI.Sprite(backTexture);

function setBackground() {
  const pixiApp = getPixiApp();
  back.x = 0;
  back.y = 0;
  back.width = pixiApp.screen.width;
  back.height = pixiApp.screen.height;
}

function getBackground() {
  return back;
}

export { setBackground, getBackground };
