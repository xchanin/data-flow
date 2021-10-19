export declare class DrawingUtils {
    /**
     * Draw connection line
     *
     * @param ele selected output element
     * @param callback function to callback
     */
    static DrawConnection(ele: any, callback: (val: string, output: {}) => void): void;
    static CreateCurvature(start_pos_x: any, start_pos_y: any, end_pos_x: any, end_pos_y: any, curvature_value: any, type: any): string;
    static UpdateConnection(eX: number, eY: number): void;
}
