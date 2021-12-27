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

function runGame() {
  const hunter = new Hunter(
    50,
    new Circle(Point.of(FIELD_WIDTH / 4, FIELD_HEIGHT / 4), 15, 'black'),
    null,
    500
  );

  const animals = [];
  for (let i = 0; i < 15; i++) {
    animals.push(new Animal());
  }

  const gameContext = new GameContext(hunter, [hunter, ...animals], canvas);
  const mouseListener = new MouseListener(gameContext);
  const updater = new GameStateUpdater(gameContext, mouseListener);
  const drawer = new GameRenderer(ctx, canvas, gameContext, mouseListener);
  const gameLoop = new GameLoop(updater, drawer, gameContext);
  gameLoop.run().then(runGame);
}

const onLoad = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  runGame();
};

window.addEventListener('load', onLoad);
export {};
