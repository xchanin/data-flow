import { Module } from 'module';
import { DrawFlowModel } from './../models/drawflow.model';


export class Variables {

    public static events: object = {};
    public static container: HTMLElement;
    public static precanvas: HTMLElement;
    public static nodeId: number = 1;
    public static ele_selected: HTMLElement;
    public static node_selected = null;
    public static drag: boolean = false;
    public static reroute: boolean = false;
    public static reroute_fix_curvature: boolean = false;
    public static curvature: number = 0.5;
    public static reroute_curvature_start_end: number = 0.5;
    public static reroute_curvature: number = 0.5;
    public static reroute_width: number = 6;
    public static drag_point: boolean = false;
    public static editor_selected: boolean = false;
    public static connection: boolean = false;
    public static connection_ele: SVGSVGElement;
    public static connection_selected = null;
    public static canvas_x: number = 0;
    public static canvas_y: number = 0;
    public static pos_x: number = 0;
    public static pos_x_start: number = 0;
    public static pos_y: number = 0;
    public static pos_y_start: number = 0;
    public static mouse_x: number = 0;
    public static mouse_y: number = 0;
    public static line_path: number = 5;
    public static first_click = null;
    public static force_first_input = false;
    public static draggable_inputs = true;
    public static useuuid: boolean = false;
    public static parent = parent;

    public static noderegister = {};
    public static render = null;
    public static drawflow: Array<DrawFlowModel> = 
    [
        {
            Module: 'Home', 
            Data: {}
        }
    ]
    // public static drawflow: object = { 
    //     "drawflow": 
    //     { 
    //         "Home": 
    //         { 
    //             "data": {} 
    //         }
    //     }
    // };
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
    public static prevDiff: number = -1;
    
    constructor() {
    }
    
}