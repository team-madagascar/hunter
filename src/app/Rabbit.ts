import {Point} from './Point';
import {GameContext} from './GameContext';
import {
  RABBIT_COLOR,
  RABBIT_RADIUS,
  RABBIT_SAFE_RADIUS,
  RABBIT_RUN_VELOCITY,
  RABBIT_WALK_VELOCITY,
} from './constants';
import {RandomUtils} from './RandomUtils';
import {Hunter} from './Hunter';
import {Animal} from './Animal';
import {Entity} from './Entity';
import {Wolf} from './Wolf';

export class Rabbit extends Animal {
  protected _isAlive = true;
  protected maxDistanceInOneDirection = Rabbit.DISTANCE_IN_DIRECTION;

  static DISTANCE_IN_DIRECTION = 500;

  constructor(
    center: Point | null = null,
    velocity = RABBIT_RUN_VELOCITY,
    _direction: Point | null = null,
    radius = RABBIT_RADIUS,
    color = RABBIT_COLOR
  ) {
    super(center, velocity, _direction, radius, color);
    if (center === null) {
      this.center = RandomUtils.randomPosition();
    }
    this._direction = RandomUtils.randomDirection();
  }

  update(secondsPassed: number, gameContext: GameContext) {
    const hunter = gameContext.hunter;
    const enemy = this.getEnemy(gameContext);
    const distanceToHunter = enemy.center.distance(this.center);
    if (distanceToHunter < RABBIT_SAFE_RADIUS) {
      this.runAway(secondsPassed, hunter);
    } else {
      this.velocity = RABBIT_WALK_VELOCITY;
      this.moveToRandomDirection(secondsPassed);
    }
    this._isAlive = !this.checkBoundary();
  }

  private getEnemy(gameContext: GameContext): Entity {
    const hunter = gameContext.hunter;
    const wolfs = gameContext.animals.filter(a => a instanceof Wolf);
    const enemies = [hunter, ...wolfs] as Entity[];
    return enemies.sort(
      (a, b) => this.center.distance(a.center) - this.center.distance(b.center)
    )[0];
  }

  private runAway(secondsPassed: number, hunter: Hunter) {
    this.velocity = RABBIT_RUN_VELOCITY;
    const distance = this.velocity * secondsPassed;
    const direction = Point.vector(hunter.position, this.center).unit();
    this._direction = direction;
    this.center = direction.scale(distance).add(this.center);
  }
}
