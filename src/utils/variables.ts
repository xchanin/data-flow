import { DataFlowDataModel } from "../models/dataflow-data.model.js";
import { MenuTemplateModel } from "../models/menu/menu-template.model.js";

export class Variables {
    /**
     * List of draggable menu items
     */
    public static MenuTemplates: Array<MenuTemplateModel>;

    // public static Events: Array<DispatchedEventsModel>;
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

    public static SelectedElement: HTMLElement | any;

    public static SelectedNode: HTMLElement | any;

    /**
     * When an element is being dragged
     */
    public static Dragging: boolean = false;

    public static Reroute: boolean = false;

    public static RerouteFixCurvature: boolean = false;

    /**
     * How much curve is in the connection line
     */
    public static Curvature: number = 0.5;

    public static RerouteCurvatureStartEnd: number = 0.5;

    public static RerouteCurvature: number = 0.5;

    public static RerouteWidth: number = 6;

    public static DragPoint: boolean = false;

    public static EditorIsSelected: boolean = false;
    public static connection: boolean = false;
    public static connection_ele: any = null;
    public static connection_selected: any = null;

    public static CanvasX: number = 0;

    public static CanvasY: number = 0;

    public static PosX: number = 0;

    public static PosXStart: number = 0;

    public static PosY: number = 0;

    public static PosYStart: number = 0;

    public static MouseX: number = 0;

    public static MouseY: number = 0;

    public static line_path: any = 5;

    public static first_click: any = null;
    public static force_first_input: any = false;
    public static draggable_inputs: any = true;
    public static useuuid: any = false;
    public static parent: any;
    public static noderegister: any = {};
    public static render: any;

    public static DataFlowModuleData: Array<DataFlowDataModel> = [];

    // Configurable options
    public static CurrentModule: string = 'Home';
    public static editor_mode: string = 'edit';

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
    public static ZoomValue: number = 0.1;
    public static ZoomLastValue: number = 1;

    // Mobile
    public static evCache = new Array();
    public static prevDiff = -1;
}