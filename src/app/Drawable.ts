import {FrameRenderingContext} from './FrameRenderingContext';
import {GameContext} from './GameContext';

export interface Drawable {
  isDeleted(): boolean;
  render(context: FrameRenderingContext): void;
  update(secondsPassed: number, gameContext: GameContext): void;
}
