export class Solution {

    public active = false;

    constructor(
        public name: string,
        public summary: string,
        public description: string,
        public blocks: Set<Solution>,
        public requires: Set<Solution>
    ) {}
}
