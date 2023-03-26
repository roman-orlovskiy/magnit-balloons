import * as PIXI from 'pixi.js';
import { SVG } from 'pixi-svg';
import getPixiApp from './getPixiApp';
import getRandomInt from '../utils/getRandomInt';

const getBallSVG = (color: string) => `
<svg id="ball-svg" width="95" height="125" viewBox="0 0 95 125" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M47.7518 116.984C65.4743 116.654 94.956 84.5135 94.956 51.5082C94.956 26.1675 73.9776 0.345734 47.478 0.345734C20.9784 0.345734 0 26.1675 0 51.5082C0 81.8057 27.7035 114.564 45.544 116.859C45.488 117.051 45.5208 117.267 45.6551 117.44L45.6793 117.471C45.8852 117.735 45.7888 118.129 45.513 118.319C44.7973 118.812 43.8758 119.746 43.5668 121.134C43.063 121.721 42.3074 123.12 43.3149 124.025C44.5742 125.156 46.5892 125.156 48.4783 124.654C50.3673 124.151 52.0045 123.271 51.6267 122.014C51.2489 120.757 50.6192 120.38 50.3673 120.254C50.3025 120.222 50.2543 120.123 50.1842 119.979C49.985 119.569 49.6085 118.795 48.1686 118.148C48.1242 118.128 48.0812 118.102 48.0432 118.072L47.8068 117.883C47.6089 117.725 47.5427 117.454 47.6457 117.222L47.7518 116.984Z" fill="${color}"/>
  <path d="M47.7518 116.984C65.4743 116.654 94.956 84.5135 94.956 51.5082C94.956 26.1675 73.9776 0.345734 47.478 0.345734C20.9784 0.345734 0 26.1675 0 51.5082C0 81.8057 27.7035 114.564 45.544 116.859C45.488 117.051 45.5208 117.267 45.6551 117.44L45.6793 117.471C45.8852 117.735 45.7888 118.129 45.513 118.319C44.7973 118.812 43.8758 119.746 43.5668 121.134C43.063 121.721 42.3074 123.12 43.3149 124.025C44.5742 125.156 46.5892 125.156 48.4783 124.654C50.3673 124.151 52.0045 123.271 51.6267 122.014C51.2489 120.757 50.6192 120.38 50.3673 120.254C50.3025 120.222 50.2543 120.123 50.1842 119.979C49.985 119.569 49.6085 118.795 48.1686 118.148C48.1242 118.128 48.0812 118.102 48.0432 118.072L47.8068 117.883C47.6089 117.725 47.5427 117.454 47.6457 117.222L47.7518 116.984Z" fill="black" fill-opacity="0.1"/>
  <path d="M43.9515 96.3733C68.2254 96.3733 87.9033 73.9764 87.9033 46.3485C87.9033 31.7562 82.4138 18.6232 73.6572 9.47871C66.1833 3.82341 57.2019 0.345734 47.4769 0.345734C21.829 0.345734 1.35314 24.5343 0.063385 49.0642C1.30261 75.4293 20.4781 96.3733 43.9515 96.3733Z" fill="${color}"/>
  <path d="M13.5965 32.631C15.7126 25.1665 22.1912 17.7286 26.0607 14.1722C26.3411 13.9145 26.7118 13.7795 27.093 13.7877C28.5019 13.8178 29.1464 15.6417 28.1501 16.6361C22.3136 22.4615 20.1721 28.5135 19.669 32.3068C19.4866 33.6822 18.7129 34.9776 17.4392 35.5311C15.2817 36.4686 12.9556 34.8918 13.5965 32.631Z" fill="${color}"/>
  <path d="M13.5965 32.631C15.7126 25.1665 22.1912 17.7286 26.0607 14.1722C26.3411 13.9145 26.7118 13.7795 27.093 13.7877C28.5019 13.8178 29.1464 15.6417 28.1501 16.6361C22.3136 22.4615 20.1721 28.5135 19.669 32.3068C19.4866 33.6822 18.7129 34.9776 17.4392 35.5311C15.2817 36.4686 12.9556 34.8918 13.5965 32.631Z" fill="white" fill-opacity="0.8"/>
</svg>
`;

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
      this.item.y -= this.speed;
    });
    window.addEventListener('resize', () => this.updateSize);
  }
}

export default Ball;
