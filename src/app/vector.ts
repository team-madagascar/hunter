export class Vec2 {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
  add(v: Vec2) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }
  sub(v: Vec2) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
  mul(s: number) {
    return new Vec2(this.x * s, this.y * s);
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
  equal(v: Vec2) {
    return this.x === v.x && this.y === v.y;
  }
  get unit(): Vec2 {
    return this.length ? this.mul(1 / this.length) : new Vec2(0, 0);
  }
}
