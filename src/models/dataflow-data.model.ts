export class DataFlowDataModel {
    public Data: any;
    public Module!: string;

    constructor(opts: DataFlowDataModel) {
        Object.assign(this, opts); // destructure values
    }
}