import {Hunter} from '../../../src/app/hunter';

describe('Hunter', () => {
  it('should decrement bullets count when shoot', () => {
    const hunter = new Hunter(10);
    hunter.shoot();
    expect(hunter.bulletsCount).toBe(9);
  });
  it('should throw error when shoot without bullets', () => {
    const hunter = new Hunter(0);
    const f = () => hunter.shoot();
    expect(f).toThrow('Hunter has no bullets to shoot');
  });
});
