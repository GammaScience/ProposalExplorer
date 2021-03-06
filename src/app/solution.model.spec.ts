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
      s.setActive(true);
      expect(() => {
        s.setAvailable(false);
      }).toThrowError();
    });
    it(' should raise an error if any blockers are active when set to available', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.blocks.add(s2);
       s.setActive(true);
       expect( ()  => {
         s2.setAvailable(true);
       }).toThrowError();
    });
  });
  describe('has a fuction to_update links', () => {
      it(` which calls markBlockby on each of it's blocking solutions`);
      it(` which calls markRequiredBy on each of it's requiredby solutions`);
  });
  describe('has a setter for active', () => {
    let s: Solution;
    beforeEach( () => {
       s = new Solution('root', '', '', new Set(), new Set() );
    });

    it(' that should ensure that the observalbe is changes', (done) => {
      const s2 = new Solution('', '', '', new Set(), new Set() );
      let current = s.isActive;
      s.active.subscribe( (val) => {
        expect(val).toEqual(current);
        current = ! current;
        if (current) { done(); }
      });
      s.setActive(true);
    });

    it(' that should mark all blocked solutions as inactive and unavailbale if it set active to true', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.blocks.add(s2);
       s.setActive(true);
       expect(s2.isAvailable).toBeFalsy();
    });

    it(' that should mark all required solutions as active if it set active to true', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.requires.add(s2);
       s.setActive(true);
       expect(s2.isActive).toBeTruthy();
    });

    it(' that should raise an exception if any required solution is  unavailable if it set active to true', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s2.setAvailable(false);
       s.requires.add(s2);
       expect( () => {
         s.setActive(true);
       }).toThrowError();
    });

    it(' that should not set requirements as true when going inactive', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s2.setAvailable(true);
       s.setActive(true);
       s.requires.add(s2);
       s.setActive(false);
       expect(s2.isActive).toBeFalsy();
    });

    it(' that should attempt to mark blocked as available when going inactive', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s.blocks.add(s2);
       s.setActive(true);
       s.setActive(false);
       expect(s2.isAvailable).toBeTruthy();
    });

    it(` that should attempt to mark blocked as available when going inactive leaving anything with
        another bocker still unavailable with throwing an  exception`, () => {
       const s2 = new Solution('2', '', '', new Set(), new Set() );
       const s3 = new Solution('3', '', '', new Set(), new Set() );
       s.blocks.add(s2);
       s3.blocks.add(s2);
       s.setActive(true);
       s3.setActive(true);
       s.setActive(false);
       expect(s2.isAvailable).toBeFalsy();
    });

    it(' that should raise an exception if it is required by any active solutions when going inactive', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s2.requires.add(s);
       s2.setActive(true);
       expect( () => {
         s.setActive(false);
       }).toThrowError();
    });

    it(' that should mark a solution we block as unavailable if we become active', () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s2.blocks.add(s);
       s2.updateLinks();
       s.setActive(true);
       expect(s2.isAvailable).toBeFalsy();
    });

    it(` that should mark a solution we block as available if we become inactive if
        nothing else is preventing it from being active`, () => {
       // Repeat last test as setup.
       const s2 = new Solution('', '', '', new Set(), new Set() );
       s2.blocks.add(s);
       s2.updateLinks();
       s.setActive(true);
       expect(s2.isAvailable).toBeFalsy();
        // Now mark inactive and test
       s.setActive(false);
       expect(s2.isAvailable).toBeTruthy();
    });

    it(` that should not mark a solution we block as available if we become inactive if
        something else is preventing it from being active`, () => {
       const s2 = new Solution('', '', '', new Set(), new Set() );
       const s3 = new Solution('', '', '', new Set(), new Set() );
       s2.blocks.add(s);
       s2.updateLinks();
       s.setActive(true);
       s3.blocks.add(s2);
       s3.setActive(true);
        // Now mark inactive and test
       s.setActive(false);
       expect(s2.isAvailable).toBeFalsy();
    });

    it(' that should leave active as true when set to active', () => {
      (s as any)._available = true;
      (s as any)._availableSubject.next( true );
      expect(s.isAvailable).toBeTruthy();

      s.setActive(true);
      expect(s.isActive).toBe(true);
    });

    it(' that should raise an exception if it not availble when set to active', () => {
      (s as any)._available = false;
      (s as any)._availableSubject.next( false );
      expect(s.isAvailable).toBeFalsy();

      expect( () =>  {
        s.setActive(true);
      }).toThrowError();
      expect(s.isActive).toBeFalsy();
    });
  });
});
