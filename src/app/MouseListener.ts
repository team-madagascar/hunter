import {Point} from './Point';
import {GameContext} from './GameContext';

export class MouseListener {
  private _lastMouseClickPosition: Point | null = null;
  private _currentMousePosition: Point = Point.of(0, 0);

  constructor(private readonly gameContext: GameContext) {
    window.addEventListener('click', evt => {
      this._lastMouseClickPosition = Point.of(evt.x, evt.y);
    });

    const onMouseMove = (evt: MouseEvent) => {
      this._currentMousePosition = Point.of(evt.x, evt.y);
    };

    window.addEventListener('mousemove', onMouseMove);
  }

  get takeLastMouseClickGameFieldPosition(): Point | null {
    const pos = this._lastMouseClickPosition;
    this._lastMouseClickPosition = null;
    if (pos === null) {
      return null;
    }
    return this.gameContext.mapCanvasPointToGameFieldPoint(pos);
  }

  // get currentGameFieldMousePosition(): Point {
  //   return this.gameContext.mapCanvasPointToGameFieldPoint(
  //     this._currentMousePosition
  //   );
  // }

  get currentMousePosition(): Point {
    return this._currentMousePosition;
  }
}
