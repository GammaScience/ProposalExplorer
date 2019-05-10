import { PainPoint } from './painpoint.model';

describe('Painpoint.Model', () => {
  it('should create an instance', () => {
    expect(new PainPoint('', '', '')).toBeTruthy();
  });
});
