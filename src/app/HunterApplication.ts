import {GameStateUpdater} from './GameStateUpdater';
import {GameRenderer} from './GameRenderer';
import {GameContext} from './GameContext';
import {FIELD_HEIGHT, FIELD_WIDTH} from './constants';
import {Hunter} from './Hunter';
import {Circle} from './Circle';
import {Point} from './Point';
import {MouseListener} from './MouseListener';
import {AnimalsProvider} from './AnimalsProvider';

export class HunterApplication {
  private secondsPassed = 0;
  private oldTimeStamp = 0;

  private readonly animalsProvider = new AnimalsProvider();

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
    const hunter = this.animalsProvider.getHunter();
    this.gameContext = new GameContext(
      hunter,
      [...this.animalsProvider.getAnimals(), hunter],
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
      this.initGame();
    }
    window.requestAnimationFrame(timestamp => this.gameLoop(timestamp));
  }
}
