import {FIELD_HEIGHT, FIELD_WIDTH} from './constants';
import {Point} from './Point';
import {Hunter} from './Hunter';
import {Circle} from './Circle';
import {GameStateUpdater} from './GameStateUpdater';
import {GameContext} from './GameContext';
import {GameRenderer} from './GameRenderer';
import {GameLoop} from './GameLoop';
import {MouseListener} from './MouseListener';
import {Animal} from './Animal';

const canvas = document.getElementById('game-field') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const hunter = new Hunter(
  10,
  new Circle(Point.of(FIELD_WIDTH / 4, FIELD_HEIGHT / 4), 15, 'black'),
  null,
  500
);

const rabbit = new Animal(Point.of(FIELD_WIDTH / 4, FIELD_HEIGHT / 4));

const gameContext = new GameContext(hunter, [hunter, rabbit], canvas);
const mouseListener = new MouseListener(gameContext);
const updater = new GameStateUpdater(gameContext, mouseListener);
const drawer = new GameRenderer(ctx, canvas, gameContext, mouseListener);
const gameLoop = new GameLoop(updater, drawer);

const onLoad = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gameLoop.run();
};

window.addEventListener('load', onLoad);
export {};
