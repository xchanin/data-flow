export class MenuTemplateModel {

    /**
     * Container class list
     */
    public ClassList!: Array<string>;

    /**
     * Data identifier
     */
    public DataNode!: string;

    /**
     * Is this draggable
     */
    public Draggable!: boolean;

    /**
     * Callback function on drag event
     */
    public DragAction!: (e: any) => {};

    /**
     * Component id
     */
    public Id!: string;

    /**
     * Icon name
     */
    public Icon?: string;

    /**
     * Menu label
     */
    public Label!: string;

    /**
     * Class list for icon
     */
    public IconClassList!: Array<string>;

    constructor(opts: MenuTemplateModel) {

        Object.assign(this, opts); // destructure values
    }
}