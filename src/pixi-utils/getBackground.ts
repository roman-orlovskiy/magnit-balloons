import * as PIXI from 'pixi.js';

const backTexture = PIXI.Texture.from('/images/background.svg');
const back = new PIXI.Sprite(backTexture);

function setBackground(pixiApp) {
  back.x = 0;
  back.y = 0;
  back.width = pixiApp.screen.width;
  back.height = pixiApp.screen.height;
}

function getBackground(pixiApp) {
  setBackground(pixiApp);

  return back;
}

export { setBackground, getBackground };
