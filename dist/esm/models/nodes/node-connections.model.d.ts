import { NodeDirectionModel } from './node-direction.model';
/**
 * Determines nodes being connected to each other
 *
 * Name is '5' that's an input and goes out to node 'output_1'
 * {"node":"5","input":"output_1"}
 */
export declare class NodeConnectionsModel {
    /**
     * Node name
     */
    Node: number;
    /**
     * Whether the node is an input or output from its connection
     *
     */
    Direction: NodeDirectionModel;
}
