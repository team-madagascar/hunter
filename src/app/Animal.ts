import {Circle} from './Circle';
import {Point} from './Point';
import {GameContext} from './GameContext';

export class Animal extends Circle {
  private _isAlive = true;

  constructor(
    center: Point,
    public readonly velocity = 600,
    private _direction: Point | null = null,
    radius = 15,
    color = 'blue'
  ) {
    super(center, radius, color);
  }

  update(secondsPassed: number, gameContext: GameContext) {
    if (this._direction !== null) {
      const distance = this.velocity * secondsPassed;
      this.center = this._direction.scale(distance).add(this.center);
    }
  }

  kill() {
    this._isAlive = false;
  }

  get direction(): Point {
    return this._direction;
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  isDeleted(): boolean {
    return !this.isAlive;
  }
}
