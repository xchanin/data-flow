import { NodeConnectionsModel } from "./node-connections.model";

/**
 * Node connection
 */
export class NodeInputOutputModel {

    /**
     * Id of current node
     */
    public Id!: string;

    /**
     * Connection type, input or output and what node
     * it connects to
     */
    public Connections!: Array<NodeConnectionsModel>;
}