import { Solution } from './solution.model';

describe('Solution.Model', () => {
  it('should create an instance', () => {
    expect(new Solution('', '', '', new Set(), new Set())).toBeTruthy();
  });

  describe('has a setter for active', () => {
    let s;
    beforeEach( () => {
       s = new Solution('', '', '', new Set(), new Set() );
    });
    it(' that should mark all blocked solutions as inactive and unavailbale if it set active to true');
    it(' that should mark all required solutions as active if it set active to true', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.requires.add(s2);
       s.active = true;
       expect(s2.active).toBeTruthy();
    });
    it(' that should raise an exception if any required solution is  unavailable if it set active to true', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s2.available = false;
       s.requires.add(s2);
       expect( () => {
         s.active = true;
       }).toThrowError();

    });
    it(' that should raise an exception if it is reuired by any active solutions when goin inactive', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.active = true;
       s2.requires.add(s);
       expect( () => {
         s.active = false;
       }).toThrowError();
    });

    it(' that should leave active as true when set to active', () => {
      s.available = true;
      s.active = true;
      expect(s.active).toBe(true);
    });
    it(' that should raise an exception if it not availble when set to active', () => {
      s.available = false;
      expect( () =>  {
        s.active = true;
      }).toThrowError();
      expect(s.active).toBeFalsy();
    });
  });
});
