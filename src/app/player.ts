import {
  FIELD_HEIGHT,
  FIELD_WIDTH,
  HUNTER_SPEED,
  HUNTER_RADIUS,
} from './constants';
import {Vec2} from './vector';

interface PlayerArgs {
  ctx: CanvasRenderingContext2D;
  position: Vec2;
}

export class Player {
  public ctx!: CanvasRenderingContext2D;
  public id = Math.random() * 100000;
  public position!: Vec2;
  public color = `hsl(${Math.random() * 360},60%,50%)`;
  public isAlive = true;
  public speed: number = HUNTER_SPEED;
  public radius: number = HUNTER_RADIUS;

  constructor({position, ctx}: PlayerArgs) {
    this.position = position;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update(v: Vec2) {
    if (v) {
      this.position.move(v.x, v.y);
      this.checkBoundary();
    }
  }

  checkBoundary() {
    if (
      this.position.x - this.radius < -FIELD_WIDTH / 2 ||
      this.position.x + this.radius > FIELD_WIDTH / 2 ||
      this.position.y - this.radius < -FIELD_HEIGHT / 2 ||
      this.position.y + this.radius > FIELD_HEIGHT / 2
    ) {
      this.isAlive = false;
    }
  }
}
