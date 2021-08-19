export class DrawFlowModel {
    public Data: any;
    public Module!: string;

    constructor(opts: DrawFlowModel) {
        Object.assign(this, opts); // destructure values
    }
}