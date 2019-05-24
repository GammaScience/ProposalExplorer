import { PainPoint } from './painpoint.model';
import { Solution } from './solution.model';

describe('Painpoint.Model', () => {
  it('should create an instance', () => {
    expect(new PainPoint('', '', '')).toBeTruthy();
  });
  it('should be unsovled if there are no solutions', () => {
    expect(new PainPoint('', '', '').isSolved).toBeFalsy();
  });
  it('should be unsovled if there are one inactive solutions', () => {
    const s = new Solution('', '', '', new Set(), new Set());
    const p = new PainPoint('', '', '');
    s.setActive(false);
    p.solvedBy.add(s);
    expect(p.isSolved).toBeFalsy();
  });
  it('should be nsovled if there are one active solutions', () => {
    const s = new Solution('', '', '', new Set(), new Set());
    const p = new PainPoint('', '', '');
    s.setActive(true);
    p.solvedBy.add(s);
    expect(p.isSolved).toBeTruthy();
  });
  it('should be nsovled if there is one active  an on inactive solutions', () => {
    const s1 = new Solution('', '', '', new Set(), new Set());
    const s2 = new Solution('', '', '', new Set(), new Set());
    const p = new PainPoint('', '', '');
    s1.setActive(true);
    s2.setActive(false);
    p.solvedBy.add(s1);
    p.solvedBy.add(s2);
    expect(p.isSolved).toBeFalsy();
  });



});
