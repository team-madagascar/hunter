import {Circle} from './Circle';
import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH} from './constants';
import {Point} from './Point';

export class Entity extends Circle {
  protected _isAlive = true;
  constructor(
    center: Point,
    protected velocity,
    protected _direction: Point | null = null,
    radius,
    color
  ) {
    super(center, radius, color);
  }

  kill() {
    this._isAlive = false;
  }

  checkBoundary(): boolean {
    return (
      this.center.x - this.radius < -GAME_FIELD_WIDTH ||
      this.center.x + this.radius > GAME_FIELD_WIDTH ||
      this.center.y - this.radius < -GAME_FIELD_HEIGHT ||
      this.center.y + this.radius > GAME_FIELD_HEIGHT
    );
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
