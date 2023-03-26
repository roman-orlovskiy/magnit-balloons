import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import * as PIXI from 'pixi.js';

const app = createApp(App);
app.config.globalProperties.pixiApp = new PIXI.Application({
  width: 0,
  height: 0,
  antialias: true,
  resolution: 1,
});

app.mount('#app')
