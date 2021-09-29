import { ContainerEvent } from '../models/nodes/container-event.model.js';
import { DataFlowBaseClass } from '../base-classes/data-flow-base-class.js';
export default class FlowToolOriginal02 extends DataFlowBaseClass {
    /**
     * List of event listeners
     */
    protected eventListeners: Array<ContainerEvent>;
    constructor(container: HTMLElement, render?: null, parent?: null);
    start(): void;
    load(): void;
    registerNode(name: any, html: any, props?: null, options?: null): void;
    addNode(name: any, num_in: any, num_out: any, ele_pos_x: any, ele_pos_y: any, classoverride: any, data: any, html: any, typenode?: boolean): any;
    addNodeImport(dataNode: any, precanvas: any): void;
    addRerouteImport(dataNode: any): void;
    updateNodeDataFromId(id: any, data: any): void;
    addNodeInput(id: any): void;
    addNodeOutput(id: any): void;
    removeNodeInput(id: any, input_class: any): void;
    removeNodeOutput(id: any, output_class: string): void;
    removeSingleConnection(id_output: any, id_input: any, output_class: any, input_class: any): boolean;
    addModule(name: any): void;
    changeModule(name: any): void;
    removeModule(name: any): void;
    clearModuleSelected(): void;
    clear(): void;
    export(): void;
    import(data: any, notifi?: boolean): void;
    on(event: any, callback: any): false | undefined;
    removeListener(event: any, callback: any): false | undefined;
    getUuid(): string;
}
