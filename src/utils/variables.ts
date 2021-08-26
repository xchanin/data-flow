import { DataFlowDataModel } from "../models/dataflow-data.model";
import { MenuTemplateModel } from "../models/menu/menu-template.model";

export class Variables {
    public static MenuTemplates: Array<MenuTemplateModel>;
    public static events: any = {};
    public static container: HTMLElement | any;
    public static precanvas: HTMLElement | any;
    public static nodeId = 1;
    public static ele_selected: any = null;

    public static node_selected: any = null;
    public static drag: any = false;
    public static reroute: any = false;
    public static reroute_fix_curvature: any = false;
    public static curvature: any = 0.5;
    public static reroute_curvature_start_end: any = 0.5;
    public static reroute_curvature: any = 0.5;
    public static reroute_width: any = 6;
    public static drag_point: any = false;
    public static editor_selected: any = false;
    public static connection: any = false;
    public static connection_ele: any = null;
    public static connection_selected: any = null;
    public static canvas_x: any = 0;
    public static canvas_y: any = 0;
    public static pos_x: any = 0;
    public static pos_x_start: any = 0;
    public static pos_y: any = 0;
    public static pos_y_start: any = 0;
    public static mouse_x: any = 0;
    public static mouse_y: any = 0;
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
    public static module: string = 'Home';
    public static editor_mode: string = 'edit';
    public static zoom: number = 1;
    public static zoom_max: number = 1.6;
    public static zoom_min: number = 0.5;
    public static zoom_value: number = 0.1;
    public static zoom_last_value: number = 1;

    // Mobile
    public static evCache = new Array();
    public static prevDiff = -1;
}