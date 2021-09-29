export declare class MenuTemplateModel {
    /**
     * Container class list
     */
    ClassList: Array<string>;
    /**
     * Data identifier
     */
    DataNode: string;
    /**
     * Is this draggable
     */
    Draggable: boolean;
    /**
     * Callback function on drag event
     */
    DragAction: (e: any) => {};
    /**
     * Component id
     */
    Id: string;
    /**
     * Icon name
     */
    Icon?: string;
    /**
     * Menu label
     */
    Label: string;
    /**
     * Class list for icon
     */
    IconClassList: Array<string>;
    constructor(opts: MenuTemplateModel);
}
