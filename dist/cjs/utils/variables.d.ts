import { DataFlowDataModel } from "../models/dataflow-data.model.js";
import { MenuTemplateModel } from "../models/menu/menu-template.model.js";
declare type EditMode = 'fixed' | 'edit' | 'view';
export declare class Variables {
    /**
     * Current module
     */
    static ActiveModule: string;
    /**
     * ?
     */
    static CanvasX: number;
    /**
     * ?
     */
    static CanvasY: number;
    /**
     * When a connection between nodes is set
     */
    static Connection: boolean;
    /**
     * Element being connected
     */
    static ConnectionElement: HTMLElement | any;
    /**
     * How much curve is in the connection line
     */
    static Curvature: number;
    /**
     * List of data flow module data
     */
    static DataFlowModuleData: Array<DataFlowDataModel>;
    /**
     * Are these draggable inputs
     */
    static DraggableInputs: boolean;
    /**
     * When an element is being dragged
     */
    static Dragging: boolean;
    /**
     * ?
     */
    static DragPoint: boolean;
    /**
     * When editor is selected?
     */
    static EditorIsSelected: boolean;
    /**
     * What type of mode we are in
     *
     * View, Fixed, Edit
     */
    static EditorMode: EditMode;
    /**
     * Event cache
     */
    static EVCache: any[];
    /**
     * List of UI events
     */
    static Events: any;
    /**
     * First element clicked?
     */
    static FirstClickedElement: HTMLElement;
    /**
     * ?
     */
    static ForceFirstInput: boolean;
    /**
     * Main canvas container
     */
    static MainContainer: HTMLElement | any;
    /**
     * List of draggable menu items
     */
    static MenuTemplates: Array<MenuTemplateModel>;
    /**
     * Mouse X position
     */
    static MouseX: number;
    /**
     * Mouse Y position
     */
    static MouseY: number;
    /**
     * Mobile item selected
     */
    static MobileItemSelected: any;
    /**
     * Mobile item's last move
     */
    static MobileLastMove: any;
    /**
     * Class name for node styles
     */
    static NodeClass: string;
    /**
     * Node id
     */
    static NodeId: number;
    /**
     * Cloned node?
     */
    static NodeRegister: any;
    /**
     * Parent element for the flow tool
     */
    static Parent: any;
    /**
     * ?
     */
    static PrevDiff: number;
    /**
     * ?
     */
    static PosX: number;
    /**
     * ?
     */
    static PosXStart: number;
    /**
     * ?
     */
    static PosY: number;
    /**
     * ?
     */
    static PosYStart: number;
    /**
     * pre canvas container that holds nodes
     */
    static PreCanvas: HTMLElement | any;
    /**
     * ?
     */
    static Render: any;
    /**
     * ?
     */
    static Reroute: boolean;
    /**
    * ?
    */
    static RerouteCurvature: number;
    /**
    * ?
    */
    static RerouteCurvatureStartEnd: number;
    /**
    * ?
    */
    static RerouteFixCurvature: boolean;
    /**
    * ?
    */
    static RerouteWidth: number;
    /**
     * Selected connection
     */
    static SelectedConnection: HTMLElement | any;
    /**
     * ?
     */
    static SelectedElement: HTMLElement | any;
    /**
     * ?
     */
    static SelectedNode: HTMLElement | any;
    /**
     * Whether or not to use UUID
     */
    static UseUUID: boolean;
    /**
     * Zoom level
     */
    static Zoom: number;
    /**
     * ?
     */
    static ZoomLastValue: number;
    /**
     * Maximum zoom level
     */
    static ZoomMax: number;
    /**
     * Minimum zoom level
     */
    static ZoomMin: number;
    /**
     * ?
     */
    static ZoomValue: number;
    constructor();
}
export {};
