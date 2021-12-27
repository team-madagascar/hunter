import {Point} from '../../../src/app/point';

describe('Point', () => {
  it('should plus points', () => {
    const p1 = Point.of(1, 1);
    const p2 = Point.of(1, 1);
    expect(p1.add(p2)).toEqual(Point.of(2, 2));
  });
  it('should subtract points', () => {
    const p1 = Point.of(2, 2);
    const p2 = Point.of(1, 1);
    expect(p1.subtract(p2)).toEqual(Point.of(1, 1));
  });
});
