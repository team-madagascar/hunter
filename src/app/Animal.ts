import {Circle} from './Circle';
import {Point} from './Point';
import {GameContext} from './GameContext';
import {
  FIELD_HEIGHT,
  FIELD_WIDTH,
  GAME_FIELD_HEIGHT,
  GAME_FIELD_WIDTH,
} from './constants';

export class Animal extends Circle {
  private _isAlive = true;
  private currentDistance = 0;
  private maxDistance = 400;

  constructor(
    center: Point | null = null,
    public readonly velocity = 300,
    private _direction: Point | null = null,
    radius = 15,
    color = 'blue'
  ) {
    super(center, radius, color);
    if (center === null) {
      this.center = Animal.randomPosition();
    }
    this._direction = Animal.randomDirection();
  }

  update(secondsPassed: number, gameContext: GameContext) {
    const hunter = gameContext.hunter;
    const distanceToHunter = hunter.position.distance(this.center);
    if (distanceToHunter < 500) {
      const distance = this.velocity * secondsPassed;
      const direction = Point.vector(hunter.position, this.center).unit();
      this._direction = direction;
      this.center = direction.scale(distance).add(this.center);
    } else {
      this.randomDirection(secondsPassed);
    }

    this._isAlive = !this.checkBoundary();
  }

  private randomDirection(secondsPassed: number) {
    if (this._direction !== null) {
      const distance = this.velocity * secondsPassed;
      this.currentDistance += distance;
      if (this.currentDistance >= this.maxDistance) {
        this.currentDistance = 0;
        this.maxDistance = 400;
        this._direction = Animal.randomDirection();
      }
      const prevCenter = this.center;
      this.center = this._direction.scale(distance).add(this.center);

      while (this.checkBoundary()) {
        this._direction = Animal.randomDirection();
        this.currentDistance = 0;
        this.maxDistance = 1000;
        this.center = this._direction.scale(distance * 5).add(prevCenter);
      }
    }
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

  private static randomDirection() {
    return Point.of(
      Math.random() * Animal.randomSign(),
      Math.random() * Animal.randomSign()
    ).unit();
  }

  private static randomPosition() {
    const gap = 500;
    const point = Point.of(
      Animal.randomWithinInterval(gap, GAME_FIELD_WIDTH - gap),
      Animal.randomWithinInterval(gap, GAME_FIELD_HEIGHT - gap)
    );
    return point;
  }

  private static randomWithinInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private static randomSign(): number {
    return Math.random() >= 0.5 ? 1 : -1;
  }
}
