import { BehaviorSubject, Observable } from 'rxjs';

export class Solution {

// tslint:disable: variable-name
    private _active = false;
    private _activeSubject: BehaviorSubject<boolean>;

    private _available = true;
    private _availableSubject: BehaviorSubject<boolean>;
    public requiredBy: Set<Solution> = new Set();
    public blockedBy: Set<Solution> = new Set();
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
        if (!this.isAvailable) {
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
                s.setAvailable(false);
            }
            // We shouldn't be available if any of this are active; so
            // it should be safe to mark them as unavilable;
            for (const b of this.blockedBy ) {
                b.setAvailable(false);
            }
        } else {
            // Check if inactive pre-req's (are we required by something active)
            for (const s of this.requiredBy ) {
                if (s.isActive) {
                    throw Error(`${this.name} requires ${s.name}`);
                }
            }
            // Attempt to undo any reverse blocking ,but don't propagate
            // any erros; as they will be cause by blockages form other routes.
            for (const b of this.blockedBy ) {
                try {
                    b.setAvailable(true);
                } catch { /* do nothing */ }
            }
        }
        this._active = newValue;
        this._activeSubject.next( newValue );

        if ( !this.isActive) {
            // Attempt to Reset any blocks
            for ( const s of this.blocks ) {
                s.markBlockedBy(this);
                try {
                    s.setAvailable(true);
                } catch { /* do nothing */}
            }
        }
    }

    public get available() {
        return this._availableSubject.asObservable();
    }

    public get isAvailable() {
        return this._availableSubject.getValue();
    }

    public setAvailable(newValue) {
        if (this.isActive  && !newValue) {
            throw Error(`Cannot mark ${this.name} unavailable as it is active`);
        } else if (newValue) {
            for (const s of this.blockedBy) {
                if (s.isActive) {
                    throw Error(`Cannot mark ${this.name} available as it is blocked by ${s.name}`);
                }
            }
        }
        this._available = newValue;
        this._availableSubject.next( newValue );

    }
    constructor(
        public name: string,
        public summary: string,
        public description: string,
        public blocks: Set<Solution>,
        public requires: Set<Solution>
    ) {
        this._activeSubject = new BehaviorSubject(this._active);
        this._availableSubject = new BehaviorSubject(this._available);

        this.updateLinks();
    }

    /**
     * Must be called after any changes to the blocks or required lists.
     */
    public updateLinks() {
        for (const b of this.blocks ) {
            b.markBlockedBy(this);
        }
    }

    private markRequiredBy( soln: Solution ) {
        this.requiredBy.add(soln);
    }
    private markBlockedBy( soln: Solution ) {
        this.blockedBy.add(soln);
    }
}
