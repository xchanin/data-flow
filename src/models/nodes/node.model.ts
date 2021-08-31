import { NodeInputOutputModel } from "./node-input-output.model";

/**
 * Node types that can be created
 */
 type NodeType = 
    'REQUEST' | 
    'ACTION' | 
    'PROJECT' | 
    'ROUTER_FILTER' | 
    'MODIFIER' | 
    'JOIN' | 
    'SPLIT' | 
    'DECISION' |
    'EVENT';

/**
 * Model for Node properties
 */
export class NodeModel {

    /**
     * Styles 
     */
    public ClassList!: Array<string>;

    /**
     * Internal node data
     */
    public Data!: any;
    
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
    public Inputs?: NodeInputOutputModel;

    /**
     * Node name
     */
    public Name!: string;

    /**
     * Output direction and connected nodes
     */
    public Outputs?: NodeInputOutputModel;

    /**
     * Node 'Y' position
     */
    public PosY!: number;

    /**
     * Node 'X' position
     */
    public PosX!: number;

    /**
     * Node connection rules; types we can connect to
     */
    public Rules?: Array<string>;

    /**
     * Node Type
     */
     public Type!: NodeType

    /**
     * Not sure what this is yet
     */
    public TypeNode!: boolean;
    
    constructor(opts: NodeModel) {
        Object.assign(this, opts); // destructure values
    }
}