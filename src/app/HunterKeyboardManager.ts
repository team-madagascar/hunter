import {Point} from './Point';

export class HunterKeyboardManager {
  private static readonly DIRECTIONS: Record<number, Point> = {
    65: Point.of(-10, 0), // a
    87: Point.of(0, -10), // w
    68: Point.of(10, 0), // d
    83: Point.of(0, 10), // s
  };
  private currentDirections: Map<number, Point> = new Map();

  constructor() {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!this.currentDirections.has(e.keyCode)) {
        this.currentDirections.set(
          e.keyCode,
          HunterKeyboardManager.DIRECTIONS[e.keyCode]
        );
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      this.currentDirections.delete(e.keyCode);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }

  hasDirection(): boolean {
    return this.currentDirections.size !== 0;
  }

  moveDirection(): Point {
    const moveVector = Array.from(this.currentDirections.values()).reduce(
      (acc: Point, currentVector: Point) => acc.add(currentVector)
    );
    return moveVector.unit();
  }
}
