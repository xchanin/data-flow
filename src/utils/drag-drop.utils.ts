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
     * When dragging an item from the side menu onto the canvas 
     **/
    

  // function drag(ev) {
    //   if (ev.type === "touchstart") {
    //     mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
    //   } else {
    //     ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    //   }
    // }

    /**
     * When dragging begins
     * 
     * @param e DragEvent
     */
    public static Drag(e: DragEvent) {

        const target: HTMLElement = e.target as HTMLElement;
        const closest: HTMLElement | null = target.closest('.drag-drawflow');

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

    // public static Drop(ev): void  {
    //   if (ev.type === 'touchend') {
    //     var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
    //     if (parentdrawflow != null) {
    //       addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
    //     }
    //     mobile_item_selec = '';
    //   } else {
    //     ev.preventDefault();
    //     var data = ev.dataTransfer.getData("node");
    //     addNodeToDrawFlow(data, ev.clientX, ev.clientY);
    //   }
    // }

    public static Drop(e: DragEvent, callback: (name: string, x: number, y: number) => {}): void  {

        if (e.type === 'touchend') {
            const lastMoveClientX: number = Variables.MobileLastMove.touches[0].clientX;
            const lastMoveClientY: number = Variables.MobileLastMove.touches[0].clientY;
            const elPoint: Element | null = document.elementFromPoint(lastMoveClientX, lastMoveClientY);

            if (document && elPoint) {
                const parentdrawflow: HTMLElement | null = elPoint.closest('#drawflow');

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