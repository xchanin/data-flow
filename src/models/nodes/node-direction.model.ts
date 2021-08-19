type DIRECTION = 'input' | 'output';

/**
 * Direction of how nodes are connected
 */
export class NodeDirectionModel {

    /**
     * Direction of node connection (input or output)
     */
    public Direction!: DIRECTION;

    /**
     * Node name being connected to
     */
    public ConnectedNode!: string;
}