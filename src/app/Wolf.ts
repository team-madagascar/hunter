import {Point} from './Point';
import {
  WOLF_ATTACK_RADIUS,
  WOLF_COLOR,
  WOLF_HUNGRY_DEATH_TIME,
  WOLF_RADIUS,
  WOLF_VELOCITY,
} from './constants';
import {GameContext} from './GameContext';
import {RandomUtils} from './RandomUtils';
import {Entity} from './Entity';
import {Animal} from './Animal';

export class Wolf extends Animal {
  private hungryTime = 0;

  constructor(center: Point | null = null, _direction: Point | null = null) {
    super(center, WOLF_VELOCITY, _direction, WOLF_RADIUS, WOLF_COLOR);
    if (center === null) {
      this.center = RandomUtils.randomPosition();
    }
    this._direction = RandomUtils.randomDirection();
  }

  update(secondsPassed: number, gameContext: GameContext) {
    this.hungryTime += secondsPassed;
    if (this.hungryTime >= WOLF_HUNGRY_DEATH_TIME) {
      this.kill();
      return;
    }
    const enemy = this.getEnemy(gameContext);
    const distanceToEnemy = enemy.center.distance(this.center);
    if (distanceToEnemy <= WOLF_ATTACK_RADIUS) {
      const direction = Point.vector(this.center, enemy.center).unit();
      const distance = this.velocity * secondsPassed;
      this.center = direction.scale(distance).add(this.center);
      if (distanceToEnemy <= WOLF_RADIUS) {
        enemy.kill();
        this.hungryTime = 0;
      }
    } else {
      this.moveToRandomDirection(secondsPassed);
    }
    this._isAlive = !this.checkBoundary();
  }

  private getEnemy(gameContext: GameContext): Entity {
    const hunter = gameContext.hunter;
    const animals = gameContext.animals.filter(a => !(a instanceof Wolf));
    const enemies = [hunter, ...animals] as Entity[];
    return enemies.sort(
      (a, b) => this.center.distance(a.center) - this.center.distance(b.center)
    )[0];
  }
}
