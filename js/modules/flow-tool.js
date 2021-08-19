import { Variables } from "./variables.js";

export class FlowTool extends Variables {

    constructor(parent) {
        super();
        // let variable = new Variables(parent);
        // debugger;
        super.tester = 'this is a test';
        console.log(this.tester);
    }
}