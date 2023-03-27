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
  initY: number;
  id: number;
  handleOnSplash(item) {};

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

  clearItem() {
    this.handleOnSplash(this.item);
    this.item.y = this.initY;
    this.item.gotoAndStop(0);
  }

  splash() {
    this.item.play();
    this.item.onComplete = () => {
      this.clearItem();
    };
  }

  move() {
    if (this.item.y < -(this.item.height)) {
      this.item.y = this.initY;
    } else {
      this.item.y -= this.speed;
    }
  }

  constructor(id, handleOnSplash) {
    this.updateSize = this.updateSize.bind(this);
    this.splash = this.splash.bind(this);
    this.handleOnSplash = handleOnSplash;

    this.id = id;
    this.pixiApp = getPixiApp();
    this.color = this.getRandomColor();
    this.item = new PIXI.AnimatedSprite(this.getTextures());
    this.item.animationSpeed = 0.5;
    this.item.loop = false;
    this.hw = 125 / 95;
    this.relativeWidth = getRandomInt(18, 31);
    this.relativeIndent = 5;
    this.relativeX = getRandomInt(this.relativeIndent, 100 - this.relativeIndent - this.relativeWidth);
    this.updateSize();
    this.initY = this.pixiApp.screen.height + getRandomInt(10, 4 * this.pixiApp.screen.height);
    this.item.y = this.initY;
    this.speed = getRandomInt(3, 5);
    this.item.eventMode = 'static';
    this.item.on('pointerdown', this.splash);
    window.addEventListener('resize', this.updateSize);
    this.pixiApp.stage.addChild(this.item);
  }
}

export default Ball;
