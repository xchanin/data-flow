export declare class DragDropUtils {
    constructor();
    static PositionMobile(ev: Event): void;
    static AllowDrop(ev: Event): void;
    /**
     * When dragging begins
     *
     * @param e DragEvent
     */
    static Drag(e: DragEvent): void;
    /**
     * Drop event after dragging
     *
     * @param e DragEvent
     * @param callback function to add dragged node to canvas
     */
    static Drop(e: DragEvent, callback: (name: string, x: number, y: number) => {}): void;
}
