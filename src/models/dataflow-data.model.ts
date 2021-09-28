import { NodeModel } from "./nodes/node.model";

export class DataFlowDataModel {
    public Data!: Array<NodeModel>;
    public Module!: string;

    constructor(opts: DataFlowDataModel) {
        Object.assign(this, opts); // destructure values
    }
}