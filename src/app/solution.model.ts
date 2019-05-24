import { BehaviorSubject, Observable } from 'rxjs';

export class Solution {

// tslint:disable: variable-name
    private _active = false;
    private _activeSubject: BehaviorSubject<boolean>;

    private _available = true;
    private _requiredBy: Set<Solution> = new Set();
    private _blockedBy: Set<Solution> = new Set();
// tslint:enable: variable-name

    /** Gets an observable of the active state of this slution */
    public get active() {
        return this._activeSubject.asObservable();
    }
    /** Get current state */
    public get isActive(): boolean {
        return this._activeSubject.getValue();
    }
    /** Update the state of this object */
    public setActive(inValue: boolean) {
        const newValue = !!inValue; // coerce to boolean
        if (!this.available) {
            throw Error(`${this.name} is not available`);
        }
        if (newValue) {
            // Check active prereq's
            for ( const s of this.requires ) {
                s.markRequiredBy(this);
                s.setActive(true);
            }
            for ( const s of this.blocks ) {
                s.markBlockedBy(this);
                s.available = false;
            }
        } else {
            // Check if inactive pre-req's (are we required by something active)
            for (const s of this._requiredBy ) {
                if (s.isActive) {
                    throw Error(`${this.name} requires ${s.name}`);
                }
            }
        }
        this._active = newValue;
        this._activeSubject.next( newValue );

        if ( !this.isActive) {
            // Attempt to Reset any blocks
            for ( const s of this.blocks ) {
                s.markBlockedBy(this);
                try {
                    s.available = true;
                } catch { /* do nothing */}
            }
        }
    }

    public get available() {
        return this._available;
    }
    public set available(newValue) {
        if (this.isActive  && !newValue) {
            throw Error(`Cannot mark ${this.name} unavailable as it is active`);
        } else if (newValue) {
            for (const s of this._blockedBy) {
                if (s.isActive) {
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
    ) {
        this._activeSubject = new BehaviorSubject(this._active);
    }

    public markRequiredBy( soln: Solution ) {
        this._requiredBy.add(soln);
    }
    public markBlockedBy( soln: Solution ) {
        this._blockedBy.add(soln);
    }
}
