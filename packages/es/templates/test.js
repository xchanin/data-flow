import { BaseFunctions } from "../base-classes/base-functions";
import { NodeModel } from "../models/nodes/node.model";
import { Variables } from "../utils/variables";
export class Test extends BaseFunctions {
    constructor() {
        super();
    }
    static tt() {
        const nodeModel = new NodeModel({
            Name: 'val.Name',
            ID: 'val.Name',
            Data: 'val.Name',
            ClassList: [],
            HTML: 'val.Name',
            TypeNode: false,
            Inputs: 'val.Name',
            Outputs: 'val.Name',
            PosX: 50,
            PosY: 50,
            NumOfInputs: 0,
            NumOfOutputs: 1
        });
        this.activeModule(Variables.ActiveModule).Data['3'] = nodeModel;
    }
}
