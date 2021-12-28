import {Rabbit} from './Rabbit';
import {
  RABBIT_COUNT,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  WOLF_RADIUS,
  WOLF_COUNT,
} from './constants';
import {Wolf} from './Wolf';
import {Hunter} from './Hunter';
import {Circle} from './Circle';
import {Point} from './Point';

export class AnimalsProvider {
  getAnimals(): Rabbit[] {
    const animals = [];
    for (let i = 0; i < RABBIT_COUNT; i++) {
      animals.push(new Rabbit());
    }
    for (let i = 0; i < WOLF_COUNT; i++) {
      animals.push(new Wolf());
    }

    // const wolf = new Wolf(
    //   Point.of(FIELD_WIDTH / 4 + 200, FIELD_HEIGHT / 4 + 200)
    // );
    return [...animals];
  }

  getHunter(): Hunter {
    return new Hunter(
      new Circle(Point.of(FIELD_WIDTH / 4, FIELD_HEIGHT / 4), 15, 'black')
    );
  }
}
