import {Point} from './Point';
import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH} from './constants';

export class RandomUtils {
  static randomDirection() {
    return Point.of(
      Math.random() * RandomUtils.randomSign(),
      Math.random() * RandomUtils.randomSign()
    ).unit();
  }

  static randomPosition() {
    const gapH = GAME_FIELD_HEIGHT / 6;
    const gapW = GAME_FIELD_WIDTH / 6;
    return Point.of(
      RandomUtils.randomWithinInterval(gapW, GAME_FIELD_WIDTH - gapW),
      RandomUtils.randomWithinInterval(gapH, GAME_FIELD_HEIGHT - gapH)
    );
  }

  static randomWithinInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static randomSign(): number {
    return Math.random() >= 0.5 ? 1 : -1;
  }
}
