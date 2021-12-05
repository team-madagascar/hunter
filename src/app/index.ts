import {
  BG_COLOR,
  SCALE,
  GRID_COUNT,
  GRID_WIDTH,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  UPDATE_FPS,
} from './constants';
import {Vec2} from './vector';
import {Player} from './player';

let isMousePressed = false;

const KeyCodsDirectionCorrespondence: Record<number, Vec2> = {
  65: new Vec2(-10, 0), // a
  87: new Vec2(0, -10), // w
  68: new Vec2(10, 0), // d
  83: new Vec2(0, 10), // s
};

const currentDirections: Map<number, Vec2> = new Map();

let visibleWidth = window.innerWidth;
let visibleHeight = window.window.innerHeight;
let hunter: Player | null = null;

const canvas = document.getElementById('game-field') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let hunterPosition = new Vec2(0, 0);
const mousePos = new Vec2(0, 0);

const drawCircle = (vector: {x: number; y: number}, radius: number) => {
  ctx?.arc(vector.x, vector.y, radius, 0, Math.PI * 2);
};

const drawLine = (
  vectorStart: {x: number; y: number},
  vectorEnd: {x: number; y: number}
) => {
  ctx?.moveTo(vectorStart.x, vectorStart.y);
  ctx?.lineTo(vectorEnd.x, vectorEnd.y);
};

function draw() {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, visibleWidth, visibleHeight);

  hunterPosition = hunter!.position;

  ctx.save();

  ctx.translate(visibleWidth / 2, visibleHeight / 2);
  ctx.scale(SCALE, SCALE);
  ctx.translate(-hunterPosition.x, -hunterPosition.y);
  ctx.beginPath();

  for (let i = -GRID_COUNT; i <= GRID_COUNT; i++) {
    ctx.moveTo(i * GRID_WIDTH, -FIELD_WIDTH / 2);
    ctx.lineTo(i * GRID_WIDTH, FIELD_WIDTH / 2);
    ctx.moveTo(-FIELD_HEIGHT / 2, i * GRID_WIDTH);
    ctx.lineTo(FIELD_HEIGHT / 2, i * GRID_WIDTH);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.stroke();

  if (hunter?.isAlive) {
    hunter.draw();
  } else {
    alert('game over');
  }

  ctx.restore();

  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';

  ctx.fillStyle = 'red';
  ctx.beginPath();
  drawCircle(mousePos, 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.translate(mousePos.x, mousePos.y);
  ctx.strokeStyle = 'red';
  const len = 20;
  drawLine(new Vec2(-len, 0), new Vec2(len, 0));
  drawLine(new Vec2(0, -len), new Vec2(0, len));
  ctx.stroke();
  ctx.restore();

  if (hunter?.isAlive) {
    requestAnimationFrame(draw);
  }
}

const init = () => {
  hunter = new Player({
    position: new Vec2(FIELD_WIDTH / 4, FIELD_HEIGHT / 4),
    ctx,
  });
};

const initCanvas = () => {
  visibleWidth = canvas.width = window.innerWidth;
  visibleHeight = canvas.height = window.innerHeight;
};

function update() {
  let delta: Vec2 | null = null;

  if (currentDirections.size) {
    const moveVector = Array.from(currentDirections.values()).reduce(
      (acc: Vec2, currentVector: Vec2) => acc.add(currentVector)
    );
    delta = moveVector.unit.mul(hunter!.speed);
  } else if (isMousePressed) {
    delta = mousePos
      .sub(new Vec2(visibleWidth / 2, visibleHeight / 2))
      .unit.mul(hunter!.speed);
  }

  if (delta) {
    hunter!.update(delta);
  }
}

const onLoad = () => {
  initCanvas();
  init();
  requestAnimationFrame(draw);
  setInterval(update, 1000 / UPDATE_FPS);
};

const onMouseMove = (evt: any) => {
  mousePos.set(evt.x, evt.y);
};

const onKeyDown = (e: any) => {
  if (!currentDirections.has(e.keyCode)) {
    currentDirections.set(e.keyCode, KeyCodsDirectionCorrespondence[e.keyCode]);
  }
};

const onKeyUp = (e: any) => {
  currentDirections.delete(e.keyCode);
};

const onMouseDown = () => {
  isMousePressed = true;
};

const onMouseUp = () => {
  isMousePressed = false;
};

window.addEventListener('load', onLoad);
window.addEventListener('resize', initCanvas);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

export {};
