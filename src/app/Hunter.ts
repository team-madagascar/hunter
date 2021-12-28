import {Drawable} from './Drawable';
import {Circle} from './Circle';
import {Point} from './Point';
import {FrameRenderingContext} from './FrameRenderingContext';
import {
  BULLETS_COUNT,
  GAME_FIELD_HEIGHT,
  GAME_FIELD_WIDTH,
  HUNTER_VELOCITY,
} from './constants';
import {GameContext} from './GameContext';

export class Hunter implements Drawable {
  constructor(
    private readonly shape: Circle,
    private _bulletsCount: number = BULLETS_COUNT,
    private _direction: Point | null = null,
    private _velocity: number = HUNTER_VELOCITY,
    private _isAlive: boolean = true
  ) {}

  private _distanceToAnimal = 0;

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
    this.checkGameOver(gameContext);
    this.calcDistanceToSomeAnimal(gameContext);
  }

  private calcDistanceToSomeAnimal(gameContext: GameContext) {
    const animals = gameContext.animals;
    if (animals.length !== 0) {
      this._distanceToAnimal = this.position.distance(animals[0].center);
    }
  }

  private checkGameOver(gameContext: GameContext) {
    gameContext.gameOver = this.checkBoundary();
    if (gameContext.gameOver) {
      gameContext.gameResult = 'You are dead!';
    }
  }

  checkBoundary(): boolean {
    return (
      this.position.x - this.shape.radius < -GAME_FIELD_WIDTH ||
      this.position.x + this.shape.radius > GAME_FIELD_WIDTH ||
      this.position.y - this.shape.radius < -GAME_FIELD_HEIGHT ||
      this.position.y + this.shape.radius > GAME_FIELD_HEIGHT
    );
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

  get distanceToAnimal(): number {
    return this._distanceToAnimal;
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
