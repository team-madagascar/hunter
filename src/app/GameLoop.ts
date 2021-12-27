import {GameStateUpdater} from './GameStateUpdater';
import {GameRenderer} from './GameRenderer';
import {GameContext} from './GameContext';

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

export class GameLoop {
  private secondsPassed = 0;
  private oldTimeStamp = 0;
  private end = createDeferredPromise<never>();
  constructor(
    private readonly updater: GameStateUpdater,
    private readonly drawer: GameRenderer,
    private readonly gameContext: GameContext
  ) {}

  run(): Promise<never> {
    requestAnimationFrame(timestamp => this.gameLoop(timestamp));
    return this.end;
  }

  private gameLoop(timestamp: number) {
    this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timestamp;
    this.updater.update(this.secondsPassed);
    this.drawer.draw();
    if (this.gameContext.gameOver) {
      this.drawer.gameOver();
      this.end.resolve({});
      return;
    }
    window.requestAnimationFrame(timestamp => this.gameLoop(timestamp));
  }
}
