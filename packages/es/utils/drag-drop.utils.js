import { Variables } from './variables.js';
export class DragDropUtils {
    constructor() { }
    static PositionMobile(ev) {
        Variables.MobileLastMove = ev;
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
                Variables.MobileItemSelected = closest.getAttribute('data-node');
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
            const lastMoveClientX = Variables.MobileLastMove.touches[0].clientX;
            const lastMoveClientY = Variables.MobileLastMove.touches[0].clientY;
            const elPoint = document.elementFromPoint(lastMoveClientX, lastMoveClientY);
            if (document && elPoint) {
                const parentdrawflow = elPoint.closest('#drawflow');
                if (parentdrawflow != null) {
                    callback(Variables.MobileItemSelected, Variables.MobileLastMove.touches[0].clientX, Variables.MobileLastMove.touches[0].clientY);
                }
                Variables.MobileItemSelected = '';
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
