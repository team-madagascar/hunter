import {Hunter} from './Hunter';
import {Drawable} from './Drawable';
import {Point} from './Point';
import {Animal} from './Animal';
import {Bullet} from './Bullet';

export class GameContext {
  constructor(
    public readonly hunter: Hunter,
    private _drawables: Drawable[],
    private readonly canvas: HTMLCanvasElement,
    public gameOver: boolean = false
  ) {}

  mapCanvasPointToGameFieldPoint(canvasPoint: Point): Point {
    return Point.of(
      canvasPoint.x + this.hunter.position.x - this.canvas.width / 2,
      canvasPoint.y + this.hunter.position.y - this.canvas.height / 2
    );
  }

  addDrawable(d: Drawable) {
    this._drawables.push(d);
  }

  get drawables(): ReadonlyArray<Drawable> {
    this._drawables = this._drawables.filter(d => !d.isDeleted());
    return this._drawables;
  }

  get animals(): ReadonlyArray<Animal> {
    return this.drawables.filter(d => d instanceof Animal) as Animal[];
  }

  get bullets(): ReadonlyArray<Bullet> {
    return this.drawables.filter(d => d instanceof Bullet) as Bullet[];
  }
}
