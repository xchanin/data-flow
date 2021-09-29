"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variables = void 0;
class Variables {
    constructor() {
    }
}
exports.Variables = Variables;
/**
 * Current module
 */
Variables.ActiveModule = 'NapkinIDE';
/**
 * ?
 */
Variables.CanvasX = 0;
/**
 * ?
 */
Variables.CanvasY = 0;
/**
 * When a connection between nodes is set
 */
Variables.Connection = false;
/**
 * How much curve is in the connection line
 */
Variables.Curvature = 0.2;
/**
 * List of data flow module data
 */
Variables.DataFlowModuleData = [];
/**
 * Are these draggable inputs
 */
Variables.DraggableInputs = true;
/**
 * When an element is being dragged
 */
Variables.Dragging = false;
/**
 * ?
 */
Variables.DragPoint = false;
/**
 * When editor is selected?
 */
Variables.EditorIsSelected = false;
/**
 * What type of mode we are in
 *
 * View, Fixed, Edit
 */
Variables.EditorMode = 'edit';
// Mobile
/**
 * Event cache
 */
Variables.EVCache = new Array();
// public static Events: Array<DispatchedEventsModel>;
/**
 * List of UI events
 */
Variables.Events = {};
/**
 * ?
 */
Variables.ForceFirstInput = false;
/**
 * Mouse X position
 */
Variables.MouseX = 0;
/**
 * Mouse Y position
 */
Variables.MouseY = 0;
/**
 * Class name for node styles
 */
// public static NodeClass: string = 'drawflow-node';
Variables.NodeClass = 'fathym-node';
/**
 * Node id
 */
Variables.NodeId = 1;
/**
 * ?
 */
Variables.PrevDiff = -1;
/**
 * ?
 */
Variables.PosX = 0;
/**
 * ?
 */
Variables.PosXStart = 0;
/**
 * ?
 */
Variables.PosY = 0;
/**
 * ?
 */
Variables.PosYStart = 0;
/**
 * ?
 */
Variables.Reroute = false;
/**
* ?
*/
Variables.RerouteCurvature = 0.5;
/**
* ?
*/
Variables.RerouteCurvatureStartEnd = 0.5;
/**
* ?
*/
Variables.RerouteFixCurvature = false;
/**
* ?
*/
Variables.RerouteWidth = 6;
/**
 * Whether or not to use UUID
 */
Variables.UseUUID = false;
/**
 * Zoom level
 */
Variables.Zoom = 1;
/**
 * ?
 */
Variables.ZoomLastValue = 1;
/**
 * Maximum zoom level
 */
Variables.ZoomMax = 1.6;
/**
 * Minimum zoom level
 */
Variables.ZoomMin = 0.5;
/**
 * ?
 */
Variables.ZoomValue = 0.1;
