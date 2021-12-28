import {HunterApplication} from './HunterApplication';

const canvas = document.getElementById('game-field') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const onLoad = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const application = new HunterApplication(canvas, ctx);
  application.run();
};

window.addEventListener('load', onLoad);
export {};
