import {HunterKeyboardManager} from './HunterKeyboardManager';
import {GameContext} from './GameContext';
import {Point} from './Point';
import {MouseListener} from './MouseListener';
import {Bullet} from './Bullet';

export class GameStateUpdater {
  private readonly hunterKeyboardManager = new HunterKeyboardManager();

  constructor(
    private readonly gameContext: GameContext,
    private readonly mouseListener: MouseListener
  ) {}

  update(secondsPassed: number) {
    this.updateHunterMovementDirection();
    this.updateDrawables(secondsPassed);
    this.updateGun();
    this.checkGameIsEnd();
  }

  private checkGameIsEnd() {
    if (this.gameContext.animals.length === 0) {
      this.gameContext.gameOver = true;
      this.gameContext.gameResult = 'All animals are killed!';
    }
  }

  private updateGun() {
    const hunter = this.gameContext.hunter;
    const lastPos = this.mouseListener.takeLastMouseClickGameFieldPosition;
    if (lastPos === null) {
      return;
    }
    if (!hunter.hasBullets()) {
      return;
    }
    hunter.shoot();
    this.createBullet(lastPos);
  }

  private createBullet(lastPos: Point) {
    const position = this.gameContext.hunter.position;
    const direction = Point.vector(position, lastPos).unit();
    const bullet = new Bullet(position, direction);
    this.gameContext.addDrawable(bullet);
  }

  private updateDrawables(secondsPassed: number) {
    this.gameContext.drawables.forEach(d =>
      d.update(secondsPassed, this.gameContext)
    );
  }

  private updateHunterMovementDirection() {
    const hunter = this.gameContext.hunter;
    if (this.hunterKeyboardManager.hasDirection()) {
      hunter.moveDirection = this.hunterKeyboardManager.moveDirection();
    } else {
      hunter.moveDirection = null;
    }
  }
}
