/**
 * Represent point and vector
 */
export class Point {
  private constructor(readonly x: number, readonly y: number) {}

  static of(x: number, y: number): Point {
    return new Point(x, y);
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
    return this.length ? this.scale(1 / this.length) : Point.of(0, 0);
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

  equals(p: Point): boolean {
    return this.x === p.x && this.y === p.y;
  }

  toString(): string {
    return `(${this.x}:${this.y})`;
  }
}
