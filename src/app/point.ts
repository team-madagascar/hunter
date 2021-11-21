/**
 * Represent point and vector
 * Point implements Flyweight pattern so it can be stored in Set and used as key in Map.
 * Point.create(0, 0) === Point.create(0.0) // true
 */
export class Point {
  private static pool: Map<string, Point> = new Map();

  private constructor(readonly x: number, readonly y: number) {}

  static of(x: number, y: number): Point {
    const key = `${x}:${y}`;
    let point = this.pool.get(key);
    if (point === undefined) {
      point = new Point(x, y);
      this.pool.set(key, point);
    }
    return point;
  }

  static vector(start: Point, end: Point): Point {
    return end.subtract(start);
  }

  negate(): Point {
    return Point.of(-this.x, -this.y);
  }

  add(p: Point | number): Point {
    if (p instanceof Point) return Point.of(p.x + this.x, p.y + this.y);
    return Point.of(this.x + p, this.y + p);
  }

  divide(p: Point | number): Point {
    if (p instanceof Point) return Point.of(this.x / p.x, this.y / p.y);
    return Point.of(this.x / p, this.y / p);
  }

  subtract(p: Point | number): Point {
    if (p instanceof Point) return Point.of(this.x - p.x, this.y - p.y);
    return Point.of(this.x - p, this.y - p);
  }

  angle(v: Point): number {
    return Math.acos(this.dot(v) / (this.length * v.length));
  }

  /**
   * Скалярное произведение
   */
  dot(point: Point): number {
    return this.x * point.x + this.y * point.y;
  }

  /**
   * Единичный вектор
   */
  unit(): Point {
    return this.divide(this.length);
  }

  scale(scale: number): Point {
    return Point.of(this.x * scale, this.y * scale);
  }

  mid(point: Point): Point {
    return Point.of((this.x + point.x) / 2, (this.y + point.y) / 2);
  }

  get length(): number {
    return Math.sqrt(this.dot(this));
  }

  toString(): string {
    return `(${this.x}:${this.y})`;
  }
}
