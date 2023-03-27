import * as PIXI from 'pixi.js';
import getPixiApp from './getPixiApp';
import getRandomInt from '../utils/getRandomInt';
import svgBallList from './svgBallList';

class Ball {
  item: PIXI.AnimatedSprite;
  pixiApp: PIXI.Application;

  relativeWidth: number;

  relativeIndent: number;

  speed: number;

  color: string;

  relativeX: number;
  hw: number;

  getRandomColor() {
    const colors = ['#FFD43B', '#67C7FD', '#FF76C2'];
    const colorIndex = getRandomInt(0, colors.length - 1);

    return colors[colorIndex];
  }

  updateSize() {
    this.item.width = this.pixiApp.screen.width * (this.relativeWidth / 100);
    this.item.height = this.hw * this.item.width;
    this.item.x = this.pixiApp.screen.width * (this.relativeX / 100);
  }

  getTexture(svgItem) {
    const blob = new Blob([svgItem], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    return PIXI.Texture.from(url,undefined,undefined);
  }

  getTextures() {
    return svgBallList.map(item => this.getTexture(item(this.color)));
  }

  constructor() {
    this.updateSize = this.updateSize.bind(this);

    this.pixiApp = getPixiApp();
    this.color = this.getRandomColor();
    this.item = new PIXI.AnimatedSprite(this.getTextures());
    this.item.animationSpeed = 0.3;
    this.item.loop = false;
    this.hw = 125 / 95;
    this.relativeWidth = getRandomInt(18, 31);
    this.relativeIndent = 5;
    this.relativeX = getRandomInt(this.relativeIndent, 100 - this.relativeIndent - this.relativeWidth);
    this.updateSize();
    this.item.y = this.pixiApp.screen.height + getRandomInt(10, 50);
    this.pixiApp.stage.addChild(this.item);
    this.speed = getRandomInt(1, 3);
    this.pixiApp.ticker.add(() => {
      if (this.item.y < 15) {
        this.pixiApp.ticker.remove(() => {});
        this.item.play();
        this.item.onComplete = () => {
          this.pixiApp.stage.removeChild(this.item);
          window.removeEventListener('resize', this.updateSize);
        };
      } else {
        this.item.y -= this.speed;
      }
    });
    window.addEventListener('resize', this.updateSize);
  }
}

export default Ball;
