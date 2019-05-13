import { Solution } from './solution.model';


export class PainPoint  {


        constructor(
            public name: string,
            public summary: string,
            public description: string,

            public solvedBy: Set<Solution> = new Set()
        ) {}

        get isSolved(): boolean {
            let rv = !! (this.solvedBy.size);
            for ( const s of this.solvedBy  ) {
                rv = rv && s.active;
            }
            return rv;
        }
}
