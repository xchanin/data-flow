import { ContainerEvent } from '../models/nodes/container-event.model';

export class Events {
    
    /**
     * @param parent HTMLElement
     * @param events list of event listeners to add 
     */
    public static AddEventListeners(parent: HTMLElement, events: Array<ContainerEvent>): void {
        
        for (const e of events) {
            parent.addEventListener(e.Event, e.Action);
        }
    }

    public static UiOnEvent(el: any, event: string, type: any, message: string,): void {
        el.OnEvent(event, (e: any) => {
            console.log(message + ': ' + e);
          })

        //   flowTool.OnEvent('nodeMoved', function(id) {
        //     console.log("Node moved " + id);
        //   })
    }
}