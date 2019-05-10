export class Solution {

    private _active = false;
    public get active() {
        return this._active;
    }
    public set active(newv) {
        if (!this.available) {
            throw Error(`${this.name} is not available`);
        }
        for ( const s of this.requires ) {
            s.active = true;
        }
        this._active = newv;
    }

    public available = true;

    constructor(
        public name: string,
        public summary: string,
        public description: string,
        public blocks: Set<Solution>,
        public requires: Set<Solution>
    ) {}

}
