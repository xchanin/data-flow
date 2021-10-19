import { NodeModel } from './../models/nodes/node.model';
import { DataFlowBaseClass } from '../base-classes/data-flow-base-class';
import { DataFlowDataModel } from '../models/dataflow-data.model';
import { ContainerEvent } from '../models/nodes/container-event.model';
import { NodeBaseClass } from '../templates/node-base-class';
export declare class FlowTool extends DataFlowBaseClass {
    /**
     * List of event listeners
     */
    protected eventListeners: Array<ContainerEvent>;
    protected nodeBaseClass: NodeBaseClass;
    constructor(container: HTMLElement, render?: any, parent?: any);
    /**
      * Start creating nodes
      */
    protected start(): void;
    /**
     * load platform data
     */
    protected load(): void;
    /**
     * When dragging a node onto the canvas
     *
     * @param val Node model
     * @returns node id
     */
    AddNode(val: NodeModel): string;
    protected addRerouteImport(dataNode: any): void;
    /**
     * When switching modules - clicking menu tab buttons
     *
     * @param name module to load
     */
    ChangeModule(name: string): void;
    /**
     * Clear canvas to add new nodes
     */
    protected clear(): void;
    /**
     *
     * @param data DataFlow data
     * @param notifi dispatch event when data has been imported
     * @returns
     */
    Init(data: DataFlowDataModel, notify?: boolean): void;
}
