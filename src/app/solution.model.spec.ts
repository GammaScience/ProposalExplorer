import { Solution } from './solution.model';

describe('Solution.Model', () => {
  it('should create an instance', () => {
    expect(new Solution('', '', '', new Set(), new Set())).toBeTruthy();
  });
});
