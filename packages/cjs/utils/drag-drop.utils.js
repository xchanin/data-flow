"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragDropUtils = void 0;
const variables_js_1 = require("./variables.js");
class DragDropUtils {
    constructor() { }
    static PositionMobile(ev) {
        variables_js_1.Variables.MobileLastMove = ev;
    }
    static AllowDrop(ev) {
        ev.preventDefault();
    }
    /**
     * When dragging begins
     *
     * @param e DragEvent
     */
    static Drag(e) {
        const target = e.target;
        const closest = target.closest('.drag-item');
        if (e.type === 'touchstart') {
            if (closest) {
                variables_js_1.Variables.MobileItemSelected = closest.getAttribute('data-node');
            }
        }
        else {
            if (e.dataTransfer) {
                e.dataTransfer.setData('node', target.getAttribute('data-node') || '');
            }
        }
    }
    /**
     * Drop event after dragging
     *
     * @param e DragEvent
     * @param callback function to add dragged node to canvas
     */
    static Drop(e, callback) {
        if (e.type === 'touchend') {
            const lastMoveClientX = variables_js_1.Variables.MobileLastMove.touches[0].clientX;
            const lastMoveClientY = variables_js_1.Variables.MobileLastMove.touches[0].clientY;
            const elPoint = document.elementFromPoint(lastMoveClientX, lastMoveClientY);
            if (document && elPoint) {
                const parentdrawflow = elPoint.closest('#drawflow');
                if (parentdrawflow != null) {
                    callback(variables_js_1.Variables.MobileItemSelected, variables_js_1.Variables.MobileLastMove.touches[0].clientX, variables_js_1.Variables.MobileLastMove.touches[0].clientY);
                }
                variables_js_1.Variables.MobileItemSelected = '';
            }
        }
        else {
            e.preventDefault();
            if (e.dataTransfer) {
                callback(e.dataTransfer.getData('node'), e.clientX, e.clientY);
            }
        }
    }
}
exports.DragDropUtils = DragDropUtils;
