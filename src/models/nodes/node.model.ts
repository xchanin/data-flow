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
     * Types of node a node can be connected from
     */
    public AllowedInputTypes?: Array<NodeType>;

    /**
     * Types of node a node con connect to
     */
    public AllowedOutputTypes?: Array<NodeType>;

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
    public HTML!: string | HTMLElement | HTMLTemplateElement;
    // public HTML!: any;

    /**
     * Node id
     */
    public ID!: string;

    /**
     * Input direction and connected nodes
     */
    // public Inputs?: NodeInputOutputModel;
    public Inputs?: any;

    /**
     * Node name
     */
    public Name!: string;

    /**
     * Number of inputs per node
     */
    public NumOfInputs!: number;

    /**
     * Number of outputs per node
     */
    public NumOfOutputs!: number;

    /**
     * Node Type
     */
     public NodeType?: NodeType

    /**
     * Output direction and connected nodes
     */
    // public Outputs?: NodeInputOutputModel;
    public Outputs?: any;

    /**
     * Node 'Y' position
     */
    public PosY!: number | string;

    /**
     * Node 'X' position
     */
    public PosX!: number | string;

    /**
     * Node connection rules; types we can connect to
     */
    public Rules?: Array<string>;

    public Type?: string;
    /**
     * I believe TypeNode is used to determine when 
     * the node HTML value is either a string or an HTML Element (template, div, etc.)
     * 
     * I have added logic to check whether or not HTML is a string or else; need to look
     * at this a little more - shannon
     */
    public TypeNode: boolean = false;
    
    constructor(opts: NodeModel) {
        Object.assign(this, opts); // destructure values
    }
}