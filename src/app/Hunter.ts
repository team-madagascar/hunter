import {Drawable} from './Drawable';
import {Circle} from './Circle';
import {Point} from './Point';
import {FrameRenderingContext} from './FrameRenderingContext';
import {FIELD_HEIGHT, FIELD_WIDTH} from './constants';
import {GameContext} from './GameContext';

export class Hunter implements Drawable {
  constructor(
    private _bulletsCount: number,
    private readonly shape: Circle,
    private _direction: Point | null,
    private _velocity: number,
    private _isAlive: boolean = true
  ) {}

  get bulletsCount(): number {
    return this._bulletsCount;
  }

  shoot() {
    if (!this.hasBullets()) {
      throw new Error('Hunter has no bullets to shoot');
    }
    this._bulletsCount--;
  }

  hasBullets(): boolean {
    return this._bulletsCount > 0;
  }

  render(context: FrameRenderingContext): void {
    this.shape.render(context);
  }

  update(secondsPassed: number, gameContext: GameContext): void {
    if (this._direction !== null) {
      this.checkBoundary();
      this.shape.center = this._direction
        .scale(this.velocity * secondsPassed)
        .add(this.shape.center);
    }
  }

  checkBoundary() {
    if (
      this.position.x - this.shape.radius < -FIELD_WIDTH / 2 ||
      this.position.x + this.shape.radius > FIELD_WIDTH / 2 ||
      this.position.y - this.shape.radius < -FIELD_HEIGHT / 2 ||
      this.position.y + this.shape.radius > FIELD_HEIGHT / 2
    ) {
      this._isAlive = false;
    }
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  get velocity(): number {
    return this._velocity;
  }

  get position(): Point {
    return this.shape.center;
  }

  set position(newPos: Point) {
    this.shape.center = newPos;
  }

  get moveDirection(): Point {
    return this._direction;
  }

  set moveDirection(direction: Point | null) {
    this._direction = direction;
  }

  isDeleted(): boolean {
    return false;
  }
}
