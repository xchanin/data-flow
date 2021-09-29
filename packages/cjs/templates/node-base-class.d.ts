import { NodeModel } from "../models/nodes/node.model.js";
import { BaseFunctions } from '../base-classes/base-functions.js';
export declare class LocalNodesModel {
    Parent: HTMLElement;
    Node: HTMLElement;
    Inputs: HTMLElement;
    Outputs: HTMLElement;
    constructor(opts: LocalNodesModel);
}
export declare class NodeBaseClass extends BaseFunctions {
    static LoadNodeFromConfig(arg0: any, PreCanvas: any): void;
    constructor();
    /**
     * Create parent div to attach to
     *
     * @returns HTMLElement
     */
    protected createParent(): HTMLElement;
    /**
     * Create node
     *
     * @param id node id
     * @returns HTMLElement
     */
    protected createNode(id: string): HTMLElement;
    /**
     * Create input and output connectors for each node
     *
     * @param classlist list of styles for connectors
     * @returns HTMLElement
     */
    protected createConnector(classlist: Array<string>): HTMLElement;
    /**
     * Create nodes and connectors
     *
     * @param id node id
     * @param inputsClasslist list of styles for input connectors
     * @param outputsClasslist list of styles for outpus connectors
     * @returns LocalNodesModel
     */
    protected setupNodes(id: string, inputsClasslist: Array<string>, outputsClasslist: Array<string>): LocalNodesModel;
    /**
     * Loading nodes from data config
     *
     * @param dataNode
     * @param precanvas
     */
    LoadNodesFromConfig(dataNode: NodeModel, precanvas: HTMLElement): void;
    /**
   * When dragging a node onto the canvas
   *
   * @param val Node model
   * @returns node id
   */
    AddNode(val: NodeModel): string;
}
