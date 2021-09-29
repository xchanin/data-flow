import { BaseFunctions } from "./base-functions.js";
export declare class DataFlowBaseClass extends BaseFunctions {
    constructor();
    /**
     *
     * @param event Event
     */
    DragEnd(event: any): void;
    /**
     * Mouse position
     *
     * @param e event
     */
    Position(event: any): void;
    /**
     * Click node event
     * @param event MouseEvent
     * @returns ?
     */
    Click(event: any): any;
    Contextmenu(event: any): any;
    /**
     * Keydown event
     *
     * @param e event
     * @returns ?
     */
    KeyDown(event: any): any;
    /**
     * Event for zoom
     *
     * @param event event
     * @param delta mouse wheel stuff
     */
    Zoom_Enter(event: any, delta: any): void;
    /**
     * Input changes
     *
     * @param event event
     */
    UpdateNodeValue(event: any): void;
    /**
     * Double click event
     *
     * @param event event
     */
    DblClick(event: any): void;
    /**
     * Pointer down
     * @param event event
     */
    PointerDown(event: any): void;
    /**
     * Pointer move
     *
     * @param e event
     */
    PointerMove(event: any): void;
    /**
     * Pointer up
     *
     * @param event event
     */
    PointerUp(event: any): void;
}
