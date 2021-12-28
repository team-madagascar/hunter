import {Circle} from './Circle';
import {Point} from './Point';
import {GameContext} from './GameContext';
import {
  ANIMAL_SAFE_RADUIS,
  ANIMAL_VELOCITY,
  GAME_FIELD_HEIGHT,
  GAME_FIELD_WIDTH,
} from './constants';
import {Hunter} from './Hunter';

export class Animal extends Circle {
  private _isAlive = true;
  private currentDistance = 0;
  private maxDistance = 400;

  constructor(
    center: Point | null = null,
    public readonly velocity = ANIMAL_VELOCITY,
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
    if (distanceToHunter < ANIMAL_SAFE_RADUIS) {
      this.runAway(secondsPassed, hunter);
    } else {
      this.moveToRandomDirection(secondsPassed);
    }

    this._isAlive = !this.checkBoundary();
  }

  private runAway(secondsPassed: number, hunter: Hunter) {
    const distance = this.velocity * secondsPassed;
    const direction = Point.vector(hunter.position, this.center).unit();
    this._direction = direction;
    this.center = direction.scale(distance).add(this.center);
  }

  private moveToRandomDirection(secondsPassed: number) {
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
      this.goAwayFromBound(distance, prevCenter);
    }
  }

  private goAwayFromBound(distance: number, prevCenter: Point) {
    while (this.checkBoundary()) {
      this._direction = Animal.randomDirection();
      this.currentDistance = 0;
      this.maxDistance = 1000;
      this.center = this._direction.scale(distance * 5).add(prevCenter);
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
    const gapH = GAME_FIELD_HEIGHT / 6;
    const gapW = GAME_FIELD_WIDTH / 6;
    return Point.of(
      Animal.randomWithinInterval(gapW, GAME_FIELD_WIDTH - gapW),
      Animal.randomWithinInterval(gapH, GAME_FIELD_HEIGHT - gapH)
    );
  }

  private static randomWithinInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private static randomSign(): number {
    return Math.random() >= 0.5 ? 1 : -1;
  }
}
