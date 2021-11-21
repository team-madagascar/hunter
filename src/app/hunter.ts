export class Hunter {
  constructor(private _bulletsCount: number) {}

  get bulletsCount(): number {
    return this._bulletsCount;
  }

  shoot() {
    if (!this.hasBullets()) {
      throw new Error('Hunter has no bullets to shoot');
    }
    this._bulletsCount--;
  }

  hasBullets(): boolean {
    return this._bulletsCount > 0;
  }
}
