import {Point} from '../../../src/app/point';

describe('Point', () => {
  it('should be equal by reference when points are equal', () => {
    expect(Point.of(0, 0)).toBe(Point.of(0, 0));
    expect(Point.of(15, 13)).toBe(Point.of(15, 13));
    expect(Point.of(3, 4)).not.toBe(Point.of(4, 3));
  });
  it('should plus points', () => {
    const p1 = Point.of(1, 1);
    const p2 = Point.of(1, 1);
    expect(p1.add(p2)).toBe(Point.of(2, 2));
  });
  it('should subtract points', () => {
    const p1 = Point.of(2, 2);
    const p2 = Point.of(1, 1);
    expect(p1.subtract(p2)).toBe(Point.of(1, 1));
  });
});
