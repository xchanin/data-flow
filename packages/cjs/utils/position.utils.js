"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionUtils = void 0;
const variables_js_1 = require("./variables.js");
class PositionUtils {
    static DraggedNodeEndXPos(x) {
        return x * (variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom)) - (variables_js_1.Variables.PreCanvas.getBoundingClientRect().x * (variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom)));
    }
    static DraggedNodeEndYPos(y) {
        return y * (variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom)) - (variables_js_1.Variables.PreCanvas.getBoundingClientRect().y * (variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom)));
    }
}
exports.PositionUtils = PositionUtils;
