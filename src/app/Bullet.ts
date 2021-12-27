import {Point} from './Point';
import {Circle} from './Circle';
import {GameContext} from './GameContext';

export class Bullet extends Circle {
  private _isDeleted = false;
  private fullDistance = 0;

  constructor(
    pos: Point,
    private readonly direction: Point,
    private readonly velocity: number = 1500,
    private readonly maxDistance: number = 700
  ) {
    super(pos, 5, 'red');
  }

  update(secondsPassed: number, gameContext: GameContext): void {
    this.updatePosition(secondsPassed);
    this.checkKillingAnimals(gameContext);
  }

  private checkKillingAnimals(gameContext: GameContext) {
    for (const animal of gameContext.animals) {
      if (this.intersect(animal)) {
        animal.kill();
        this._isDeleted = true;
        return;
      }
    }
  }

  private updatePosition(secondsPassed: number) {
    const distance = this.velocity * secondsPassed;
    this.fullDistance += distance;
    if (this.fullDistance >= this.maxDistance) {
      this._isDeleted = true;
      return;
    }
    this.center = this.direction.scale(distance).add(this.center);
  }

  isDeleted(): boolean {
    return this._isDeleted;
  }
}
