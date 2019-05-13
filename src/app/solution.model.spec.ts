import { Solution } from './solution.model';

describe('the Solution model', () => {
  it('should create an instance', () => {
    expect(new Solution('', '', '', new Set(), new Set())).toBeTruthy();
  });

  describe('has a setter for available', () => {
    let s: Solution;
    beforeEach( () => {
       s = new Solution('', '', '', new Set(), new Set() );
    });
    it(' should raise an error if active when set to unavailable', () => {
      s.active = true;
      expect(() => {
        s.available = false;
      }).toThrowError();
    });
    it(' should raise an error if any blockers are active when set to available', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.blocks.add(s2);
       s.active = true;
       expect( ()  => {
         s2.available = true;
       }).toThrowError();
    });
  });
  describe('has a setter for active', () => {
    let s;
    beforeEach( () => {
       s = new Solution('root', '', '', new Set(), new Set() );
    });
    it(' that should mark all blocked solutions as inactive and unavailbale if it set active to true', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.blocks.add(s2);
       s.active = true;
       expect(s2.available).toBeFalsy();
    });
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
    it(' that should not set requirements as true when going inactive', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s2.available = true;
       s.active = true;
       s.requires.add(s2);
       s.active = false;
       expect(s2.active).toBeFalsy();
    });
    it(' that should attempt to mark blocked as available when going inactive', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.blocks.add(s2);
       s.active = true;
       s.active = false;
       expect(s2.available).toBeTruthy();
    });
    it(` that should attempt to mark blocked as available when going inactive leaving anything with
        another bocker still unavailable with throwing an  exception`, () => {
       const s2 = new Solution('2', '', '', new Set(), new Set() ); 
       const s3 = new Solution('3', '', '', new Set(), new Set() ); 
       s.blocks.add(s2);
       s3.blocks.add(s2);
       s.active = true;
       s3.active = true;
       s.active = false;
       expect(s2.available).toBeFalsy();
    });
    it(' that should raise an exception if it is required by any active solutions when going inactive', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s2.requires.add(s);
       s2.active = true;
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
