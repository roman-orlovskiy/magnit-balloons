import * as PIXI from 'pixi.js';
import { SVG } from 'pixi-svg';
import getPixiApp from './getPixiApp';
import getRandomInt from '../utils/getRandomInt';
import getBallSVG from './getBallSVG';

class Ball {
  item: SVG;
  pixiApp: PIXI.Application;

  relativeWidth: number;

  relativeIndent: number;

  speed: number;

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

  constructor() {
    this.pixiApp = getPixiApp();
    const color = this.getRandomColor();
    this.item = new SVG(getBallSVG(color));
    const { width, height } = this.item;
    this.hw = height / width;
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
        this.pixiApp.stage.removeChild(this.item);
      } else {
        this.item.y -= this.speed;
      }
    });
    window.addEventListener('resize', this.updateSize.bind(this));
  }
}

export default Ball;
