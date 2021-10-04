import { Variables } from './variables.js';

export class DragDropUtils {
    
    constructor() {}

    public static PositionMobile(ev: Event): void {
      Variables.MobileLastMove = ev;
    }

    public static AllowDrop(ev: Event): void {
      ev.preventDefault();
    }

    /**
     * When dragging begins
     * 
     * @param e DragEvent
     */
    public static Drag(e: DragEvent): void {

        const target: HTMLElement = <HTMLElement>e.target;
        const closest: HTMLElement = <HTMLElement>target.closest('.drag-item');

        if (e.type === 'touchstart') {
            if (closest) {
                Variables.MobileItemSelected = closest.getAttribute('data-node');
            }
        } else {
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
    public static Drop(e: DragEvent, callback: (name: string, x: number, y: number) => {}): void  {

        if (e.type === 'touchend') {
            const lastMoveClientX: number = Variables.MobileLastMove.touches[0].clientX;
            const lastMoveClientY: number = Variables.MobileLastMove.touches[0].clientY;
            const elPoint: Element = <Element>document.elementFromPoint(lastMoveClientX, lastMoveClientY);

            if (document && elPoint) {
                const parentdrawflow: HTMLElement = <HTMLElement>elPoint.closest('#drawflow');

                if (parentdrawflow != null) {
                    callback
                    (
                        Variables.MobileItemSelected, 
                        Variables.MobileLastMove.touches[0].clientX, 
                        Variables.MobileLastMove.touches[0].clientY
                    );
                }

                Variables.MobileItemSelected = '';
            }
        } else {

          e.preventDefault();

          if (e.dataTransfer) {
            callback(e.dataTransfer.getData('node'), e.clientX, e.clientY);
          }  
        }
      }
      
}