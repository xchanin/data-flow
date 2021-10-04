"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawingUtils = void 0;
const variables_js_1 = require("./variables.js");
class DrawingUtils {
    /**
     * Draw connection line
     *
     * @param ele selected output element
     * @param callback function to callback
     */
    static DrawConnection(ele, callback) {
        /**
         * Create connection SVG element
         */
        const connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
        variables_js_1.Variables.ConnectionElement = connection;
        /**
         * Create the line for the connections
         */
        const path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        path.classList.add("main-path");
        path.setAttributeNS(null, 'd', '');
        /**
         * Testing adding something on the path - shannon
         */
        // path.innerHTML = 'a';
        connection.classList.add("connection");
        connection.appendChild(path);
        /**
         * Add path to the canvas
         */
        variables_js_1.Variables.PreCanvas.appendChild(connection);
        const id_output = ele.parentElement.parentElement.id.slice(5);
        const output_class = ele.classList[1];
        /**
         * TODO: need to setup callback that points to this.dispatch
         */
        callback('connectionStart', { output_id: id_output, output_class: output_class });
    }
    static CreateCurvature(start_pos_x, start_pos_y, end_pos_x, end_pos_y, curvature_value, type) {
        var line_x = start_pos_x;
        var line_y = start_pos_y;
        var x = end_pos_x;
        var y = end_pos_y;
        var curvature = curvature_value;
        //type openclose open close other
        switch (type) {
            case 'open':
                if (start_pos_x >= end_pos_x) {
                    var hx1 = line_x + Math.abs(x - line_x) * curvature;
                    var hx2 = x - Math.abs(x - line_x) * (curvature * -1);
                }
                else {
                    var hx1 = line_x + Math.abs(x - line_x) * curvature;
                    var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ' M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + '  ' + y;
                break;
            case 'close':
                if (start_pos_x >= end_pos_x) {
                    var hx1 = line_x + Math.abs(x - line_x) * (curvature * -1);
                    var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                else {
                    var hx1 = line_x + Math.abs(x - line_x) * curvature;
                    var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ' M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + '  ' + y;
                break;
            case 'other':
                if (start_pos_x >= end_pos_x) {
                    var hx1 = line_x + Math.abs(x - line_x) * (curvature * -1);
                    var hx2 = x - Math.abs(x - line_x) * (curvature * -1);
                }
                else {
                    var hx1 = line_x + Math.abs(x - line_x) * curvature;
                    var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ' M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + '  ' + y;
                break;
            default:
                var hx1 = line_x + Math.abs(x - line_x) * curvature;
                var hx2 = x - Math.abs(x - line_x) * curvature;
                return ' M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + '  ' + y;
        }
    }
    static UpdateConnection(eX, eY) {
        const precanvas = variables_js_1.Variables.PreCanvas;
        const zoom = variables_js_1.Variables.Zoom;
        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;
        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;
        var path = variables_js_1.Variables.ConnectionElement.children[0];
        var line_x = variables_js_1.Variables.SelectedElement.offsetWidth / 2 + (variables_js_1.Variables.SelectedElement.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
        var line_y = variables_js_1.Variables.SelectedElement.offsetHeight / 2 + (variables_js_1.Variables.SelectedElement.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;
        var x = eX * (variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom)) - (variables_js_1.Variables.PreCanvas.getBoundingClientRect().x * (variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom)));
        var y = eY * (variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom)) - (variables_js_1.Variables.PreCanvas.getBoundingClientRect().y * (variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom)));
        var curvature = variables_js_1.Variables.Curvature;
        var lineCurve = DrawingUtils.CreateCurvature(line_x, line_y, x, y, curvature, 'openclose');
        path.setAttributeNS(null, 'd', lineCurve);
    }
}
exports.DrawingUtils = DrawingUtils;
