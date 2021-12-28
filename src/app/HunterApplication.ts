import {GameStateUpdater} from './GameStateUpdater';
import {GameRenderer} from './GameRenderer';
import {GameContext} from './GameContext';
import {
  ANIMALS_COUNT,
  BULLETS_COUNT,
  FIELD_HEIGHT,
  FIELD_WIDTH,
} from './constants';
import {Animal} from './Animal';
import {Hunter} from './Hunter';
import {Circle} from './Circle';
import {Point} from './Point';
import {MouseListener} from './MouseListener';

interface Deferred<T> extends Promise<T> {
  resolve(value: unknown): void;

  reject(reason?: never): void;
}

function createDeferredPromise<T>(): Deferred<T> {
  let resolve;
  let reject;

  const promise = new Promise((thisResolve, thisReject) => {
    resolve = thisResolve;
    reject = thisReject;
  });
  return Object.assign(promise, {resolve, reject}) as unknown as Deferred<T>;
}

function addAnimals() {
  const animals = [];
  for (let i = 0; i < ANIMALS_COUNT; i++) {
    animals.push(new Animal());
  }
  return animals;
}

export class HunterApplication {
  private secondsPassed = 0;
  private oldTimeStamp = 0;
  private end = createDeferredPromise<never>();

  private updater: GameStateUpdater;
  private drawer: GameRenderer;
  private gameContext: GameContext;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D
  ) {
    this.initGame();
  }

  private initGame() {
    const hunter = new Hunter(
      new Circle(Point.of(FIELD_WIDTH / 4, FIELD_HEIGHT / 4), 15, 'black')
    );

    const animals = addAnimals();
    this.gameContext = new GameContext(
      hunter,
      [hunter, ...animals],
      this.canvas
    );
    const mouseListener = new MouseListener(this.gameContext);
    this.updater = new GameStateUpdater(this.gameContext, mouseListener);
    this.drawer = new GameRenderer(
      this.ctx,
      this.canvas,
      this.gameContext,
      mouseListener
    );
  }

  run() {
    requestAnimationFrame(timestamp => this.gameLoop(timestamp));
  }

  private gameLoop(timestamp: number) {
    this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timestamp;
    this.updater.update(this.secondsPassed);
    this.drawer.draw();
    if (this.gameContext.gameOver) {
      this.drawer.gameOver();
      this.end.resolve({});
      this.initGame();
    }
    window.requestAnimationFrame(timestamp => this.gameLoop(timestamp));
  }
}
