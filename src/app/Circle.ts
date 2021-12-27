import {Drawable} from './Drawable';
import {Point} from './Point';
import {FrameRenderingContext} from './FrameRenderingContext';
import {GameContext} from './GameContext';

export class Circle implements Drawable {
  constructor(
    public center: Point,
    public radius: number,
    public color: string
  ) {}

  render(context: FrameRenderingContext): void {
    const ctx = context.ctx;
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    // context.strokeStyle = '#003300';
    // context.stroke();
    // ctx.closePath();
  }

  intersect(circle: Circle): boolean {
    const x1 = this.center.x;
    const y1 = this.center.y;
    const r1 = this.radius;
    const x2 = circle.center.x;
    const y2 = circle.center.y;
    const r2 = circle.radius;

    const distSq = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    const radSumSq = (r1 + r2) * (r1 + r2);

    let result;
    if (distSq === radSumSq) result = 1;
    else if (distSq > radSumSq) result = -1;
    else result = 0;

    return result >= 0;
  }

  update(secondsPassed: number, gameContext: GameContext): void {}

  isDeleted(): boolean {
    return false;
  }
}
