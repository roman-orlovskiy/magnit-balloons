import * as PIXI from 'pixi.js';
function getBackground(pixiApp) {
  const backTexture = PIXI.Texture.from('/images/background.svg');
  const back = new PIXI.Sprite(backTexture);
  back.x = 0;
  back.y = 0;
  back.width = pixiApp.screen.width;
  back.height = pixiApp.screen.height;

  return back;
}
export default getBackground;
