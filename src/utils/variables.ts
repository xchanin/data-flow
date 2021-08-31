import { DataFlowDataModel } from "../models/dataflow-data.model.js";
import { MenuTemplateModel } from "../models/menu/menu-template.model.js";

type EditMode = 'fixed' | 'edit' | 'view';

export class Variables {
    /**
     * List of draggable menu items
     */
    public static MenuTemplates: Array<MenuTemplateModel>;

    // public static Events: Array<DispatchedEventsModel>;

    /**
     * List of UI events
     */
    public static Events: any = {};
    /**
     * Main canvas container
     */
    public static MainContainer: HTMLElement | any;

    /**
     * pre canvas container that holds nodes
     */
    public static PreCanvas: HTMLElement | any;

    /**
     * Node id
     */
    public static NodeId: number = 1;

    /**
     * ?
     */
    public static SelectedElement: HTMLElement | any;

    /**
     * ?
     */
    public static SelectedNode: HTMLElement | any;

    /**
     * When an element is being dragged
     */
    public static Dragging: boolean = false;

    /**
     * ?
     */
    public static Reroute: boolean = false;

    /**
     * ?
     */
    public static RerouteFixCurvature: boolean = false;

    /**
     * How much curve is in the connection line
     */
    public static Curvature: number = 0.5;

    /**
     * ?
     */
    public static RerouteCurvatureStartEnd: number = 0.5;

    /**
     * ?
     */
    public static RerouteCurvature: number = 0.5;

    /**
     * ?
     */
    public static RerouteWidth: number = 6;

    /**
     * ?
     */
    public static DragPoint: boolean = false;

    /**
     * When editor is selected?
     */
    public static EditorIsSelected: boolean = false;

    /**
     * When a connection between nodes is set
     */
    public static Connection: boolean = false;

    /**
     * Element being connected
     */
    // setting as HTMLElement is breaking other stuff, so setting type to 'any' for now
    public static ConnectionElement: HTMLElement | any; 

    /**
     * Selected connection
     */
    public static SelectedConnection: HTMLElement | any;

    /**
     * ?
     */
    public static CanvasX: number = 0;

    /**
     * ?
     */
    public static CanvasY: number = 0;

    /**
     * ?
     */
    public static PosX: number = 0;

    /**
     * ?
     */
    public static PosXStart: number = 0;

    /**
     * ?
     */
    public static PosY: number = 0;

    /**
     * ?
     */
    public static PosYStart: number = 0;

    /**
     * Mouse X position
     */
    public static MouseX: number = 0;

    /**
     * Mouse Y position
     */
    public static MouseY: number = 0;

    /**
     * First element clicked?
     */
    public static FirstClickedElement: HTMLElement;

    /**
     * ?
     */
    public static ForceFirstInput: boolean = false;

    /**
     * Are these draggable inputs
     */
    public static DraggableInputs: boolean = true;

    /**
     * Whether or not to use UUID
     */
    public static UseUUID: boolean = false;

    /**
     * Parent element for the flow tool
     */
    public static Parent: any;

    /**
     * Cloned node?
     */
    public static NodeRegister: HTMLElement | any;

    /**
     * ?
     */
    public static Render: any;

    /**
     * List of data flow module data
     */
    public static DataFlowModuleData: Array<DataFlowDataModel> = [];

    /**
     * ?
     */
    public static CurrentModule: string = 'Home';

    /**
     * What type of mode we are in
     * 
     * View, Fixed, Edit
     */
    public static EditorMode: EditMode = 'edit';

    /**
     * Zoom level
     */
    public static Zoom: number = 1;

    /**
     * Maximum zoom level
     */
    public static ZoomMax: number = 1.6;

    /**
     * Minmum zoom level
     */
    public static ZoomMin: number = 0.5;

    /**
     * ?
     */
    public static ZoomValue: number = 0.1;

    /**
     * ?
     */
    public static ZoomLastValue: number = 1;

    // Mobile
    /**
     * Event cache
     */
    public static EVCache = new Array();

    /**
     * ?
     */
    public static PrevDiff: number = -1;
}