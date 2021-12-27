import {GameStateUpdater} from './GameStateUpdater';
import {GameRenderer} from './GameRenderer';

export class GameLoop {
  private secondsPassed;
  private oldTimeStamp;

  constructor(
    private readonly updater: GameStateUpdater,
    private readonly drawer: GameRenderer
  ) {}

  run() {
    requestAnimationFrame(timestamp => this.gameLoop(timestamp));
  }

  private gameLoop(timestamp: number) {
    this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timestamp;
    this.updater.update(this.secondsPassed);
    this.drawer.draw();
    window.requestAnimationFrame(timestamp => this.gameLoop(timestamp));
  }
}
