import {Entity} from './Entity';
import {Point} from './Point';
import {RandomUtils} from './RandomUtils';

export class Animal extends Entity {
  protected currentDistanceInOneDirection = 0;
  protected maxDistanceInOneDirection = 500;

  constructor(
    center: Point,
    velocity,
    _direction: Point | null = null,
    radius,
    color
  ) {
    super(center, velocity, _direction, radius, color);
  }

  protected moveToRandomDirection(secondsPassed: number) {
    if (this._direction !== null) {
      const distance = this.velocity * secondsPassed;
      this.currentDistanceInOneDirection += distance;
      if (
        this.currentDistanceInOneDirection >= this.maxDistanceInOneDirection
      ) {
        this.currentDistanceInOneDirection = 0;
        this.maxDistanceInOneDirection = 500;
        this._direction = RandomUtils.randomDirection();
      }
      const prevCenter = this.center;
      this.center = this._direction.scale(distance).add(this.center);
      this.goAwayFromBound(distance, prevCenter);
    }
  }

  protected goAwayFromBound(distance: number, prevCenter: Point) {
    while (this.checkBoundary()) {
      this._direction = RandomUtils.randomDirection();
      this.currentDistanceInOneDirection = 0;
      this.maxDistanceInOneDirection = 500 * 2;
      this.center = this._direction.scale(distance * 5).add(prevCenter);
    }
  }
}
