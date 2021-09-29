/**
 * Node types that can be created
 */
declare type NodeType = 'REQUEST' | 'ACTION' | 'PROJECT' | 'ROUTER_FILTER' | 'MODIFIER' | 'JOIN' | 'SPLIT' | 'DECISION' | 'EVENT';
/**
 * Model for Node properties
 */
export declare class NodeModel {
    /**
     * Styles
     */
    ClassList: Array<string>;
    /**
     * Internal node data
     */
    Data: any;
    /**
     * HTML string that builds the nodes
     */
    HTML: string | HTMLElement | HTMLTemplateElement;
    /**
     * Node id
     */
    ID: string;
    /**
     * Input direction and connected nodes
     */
    Inputs?: any;
    /**
     * Node name
     */
    Name: string;
    /**
     * Number of inputs per node
     */
    NumOfInputs: number;
    /**
     * Number of outputs per node
     */
    NumOfOutputs: number;
    /**
     * Output direction and connected nodes
     */
    Outputs?: any;
    /**
     * Node 'Y' position
     */
    PosY: number | string;
    /**
     * Node 'X' position
     */
    PosX: number | string;
    /**
     * Node connection rules; types we can connect to
     */
    Rules?: Array<string>;
    /**
     * Node Type
     */
    Type?: NodeType;
    /**
     * I believe TypeNode is used to determine when
     * the node HTML value is either a string or an HTML Element (template, div, etc.)
     *
     * I have added logic to check whether or not HTML is a string or else; need to look
     * at this a little more - shannon
     */
    TypeNode: boolean;
    constructor(opts: NodeModel);
}
export {};
