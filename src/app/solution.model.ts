export class Solution {

// tslint:disable: variable-name
    private _active = false;
    private _available = true;
    private _requiredBy: Set<Solution> = new Set();
    private _blockedBy: Set<Solution> = new Set();
// tslint:enable: variable-name

    public get active() {
        return this._active;
    }
    public set active(newv) {
        if (!this.available) {
            throw Error(`${this.name} is not available`);
        }
        if (newv) {
            // Check active prereq's
            for ( const s of this.requires ) {
                s.markRequiredBy(this);
                s.active = true;
            }
            for ( const s of this.blocks ) {
                s.markBlockedBy(this);
                s.available = false;
            }
        } else {
            for (const s of this._requiredBy ) {
                if (s.active) {
                    throw Error(`${this.name} requires ${s.name}`);
                }
            }
        }
        this._active = newv;
    }

    public get available() {
        return this._available;
    }
    public set available(newValue) {
        if (this.active  && !newValue) {
            throw Error(`Cannot mark ${this.name} unavailable as it is active`);
        } else if (newValue) {
            for (const s of this._blockedBy) {
                if (s.active) {
                    throw Error(`Cannot mark ${this.name} available as it is blocked by ${s.name}`);
                }
            }
        }
        this._available = newValue;
    }
    constructor(
        public name: string,
        public summary: string,
        public description: string,
        public blocks: Set<Solution>,
        public requires: Set<Solution>
    ) {}

    public markRequiredBy( soln: Solution ) {
        this._requiredBy.add(soln);
    }
    public markBlockedBy( soln: Solution ) {
        this._blockedBy.add(soln);
    }
}