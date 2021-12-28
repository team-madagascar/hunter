import {Circle} from './Circle';
import {Point} from './Point';
import {BULLETS_COUNT, HUNTER_VELOCITY} from './constants';
import {GameContext} from './GameContext';
import {Entity} from './Entity';

export class Hunter extends Entity {
  constructor(
    shape: Circle,
    private _bulletsCount: number = BULLETS_COUNT,
    _direction: Point | null = null,
    _velocity: number = HUNTER_VELOCITY
  ) {
    super(shape.center, _velocity, _direction, shape.radius, shape.color);
  }

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

  update(secondsPassed: number, gameContext: GameContext): void {
    if (this._direction !== null) {
      this.checkBoundary();
      this.center = this._direction
        .scale(this.velocity * secondsPassed)
        .add(this.center);
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
    if (this.checkBoundary() || !this._isAlive) {
      gameContext.gameOver = true;
      gameContext.gameResult = 'You are dead!';
    }
  }

  get position(): Point {
    return this.center;
  }

  set position(newPos: Point) {
    this.center = newPos;
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
