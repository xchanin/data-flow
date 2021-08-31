import { DataFlowDataModel } from "../models/dataflow-data.model.js";
import { MenuTemplateModel } from "../models/menu/menu-template.model.js";

type EditMode = 'fixed' | 'edit' | 'view';

export class Variables {

    /**
     * Current module
     */
    public static ActiveModule: string = 'Home';

    /**
     * ?
     */
    public static CanvasX: number = 0;

    /**
     * ?
     */
    public static CanvasY: number = 0;

    /**
     * When a connection between nodes is set
     */
    public static Connection: boolean = false;

    /**
     * Element being connected
     */
    public static ConnectionElement: HTMLElement | any; 

    /**
     * How much curve is in the connection line
     */
    public static Curvature: number = 0.5;

    /**
     * List of data flow module data
     */
    public static DataFlowModuleData: Array<DataFlowDataModel> = [];


    /**
     * Are these draggable inputs
     */
    public static DraggableInputs: boolean = true;


    /**
     * When an element is being dragged
     */
    public static Dragging: boolean = false;

    /**
     * ?
     */
    public static DragPoint: boolean = false;

    /**
     * When editor is selected?
     */
    public static EditorIsSelected: boolean = false;

    /**
     * What type of mode we are in
     * 
     * View, Fixed, Edit
     */
    public static EditorMode: EditMode = 'edit';

    

    // Mobile
    /**
     * Event cache
     */
    public static EVCache = new Array();

    // public static Events: Array<DispatchedEventsModel>;

    /**
     * List of UI events
     */
    public static Events: any = {};

    /**
     * First element clicked?
     */
        public static FirstClickedElement: HTMLElement;

    /**
     * ?
     */
    public static ForceFirstInput: boolean = false;

    /**
     * Main canvas container
     */
    public static MainContainer: HTMLElement | any;


    /**
     * List of draggable menu items
     */
    public static MenuTemplates: Array<MenuTemplateModel>;

    /**
     * Mouse X position
     */
    public static MouseX: number = 0;

    /**
     * Mouse Y position
     */
    public static MouseY: number = 0;

    /**
     * Node id
     */
    public static NodeId: number = 1;

    /**
     * Cloned node?
     */
    public static NodeRegister: HTMLElement | any;

    /**
     * Parent element for the flow tool
     */
    public static Parent: any;

    /**
     * ?
     */
    public static PrevDiff: number = -1;

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
     * pre canvas container that holds nodes
     */
    public static PreCanvas: HTMLElement | any;

    /**
     * ?
     */
    public static Render: any;

    /**
     * ?
     */
    public static Reroute: boolean = false;

    /**
    * ?
    */
    public static RerouteCurvature: number = 0.5;

    /**
    * ?
    */
    public static RerouteCurvatureStartEnd: number = 0.5;

    /**
    * ?
    */
    public static RerouteFixCurvature: boolean = false;

    /**
    * ?
    */
    public static RerouteWidth: number = 6;

    /**
     * Selected connection
     */
    public static SelectedConnection: HTMLElement | any;

    /**
     * ?
     */
    public static SelectedElement: HTMLElement | any;

    /**
     * ?
     */
    public static SelectedNode: HTMLElement | any;

    /**
     * Whether or not to use UUID
     */
    public static UseUUID: boolean = false;

    /**
     * Zoom level
     */
    public static Zoom: number = 1;

    /**
     * ?
     */
    public static ZoomLastValue: number = 1;

    /**
     * Maximum zoom level
     */
    public static ZoomMax: number = 1.6;

    /**
     * Minimum zoom level
     */
    public static ZoomMin: number = 0.5;

    /**
     * ?
     */
    public static ZoomValue: number = 0.1;

    constructor() {
        
    }
}