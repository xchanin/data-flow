import { NodeInputOutputModel } from "./node-input-output.model";

/**
 * Model for Node properties
 */
export class NodeModel {

    
    /**
     * Styles 
     */
    public Class!: string;

    /**
     * Internal node data
     */
    public Data!: {};
    /**
     * HTML string that builds the nodes
     */
    public HTML!: string;

    /**
     * Node id
     */
    public Id!: string;

    /**
     * Input direction and connected nodes
     */
    public Inputs!: NodeInputOutputModel;

    /**
     * Node name
     */
    public Name!: string;

    /**
     * Output direction and connected nodes
     */
    public Outputs!: NodeInputOutputModel;

    /**
     * Node 'Y' position
     */
    public PosY!: number;

    /**
     * Node 'X' position
     */
    public PosX!: number;

    /**
     * Not sure what this is yet
     */
    public TypeNode!: boolean;
    
    constructor(opts: NodeModel) {
        Object.assign(this, opts); // destructure values
    }
}