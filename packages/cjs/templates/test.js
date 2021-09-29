"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const base_functions_1 = require("../base-classes/base-functions");
const node_model_1 = require("../models/nodes/node.model");
const variables_1 = require("../utils/variables");
class Test extends base_functions_1.BaseFunctions {
    constructor() {
        super();
    }
    static tt() {
        const nodeModel = new node_model_1.NodeModel({
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
        this.activeModule(variables_1.Variables.ActiveModule).Data['3'] = nodeModel;
    }
}
exports.Test = Test;
