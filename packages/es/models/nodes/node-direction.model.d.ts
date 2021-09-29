declare type DIRECTION = 'input' | 'output';
/**
 * Direction of how nodes are connected
 */
export declare class NodeDirectionModel {
    /**
     * Direction of node connection (input or output)
     */
    Direction: DIRECTION;
    /**
     * Node name being connected to
     */
    ConnectedNode: string;
}
export {};
