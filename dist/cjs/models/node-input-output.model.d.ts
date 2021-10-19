import { NodeConnectionsModel } from './nodes/node-connections.model';
/**
 * Node connection
 */
export declare class NodeInputOutputModel {
    /**
     * Id of current node
     */
    Id: string;
    /**
     * Connection type, input or output and what node
     * it connects to
     */
    Connections: Array<NodeConnectionsModel>;
}
