import { ContainerEvent } from '../models/nodes/container-event.model.js';
import { Variables } from './variables.js';

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

    public OnEvent(event: any, callback: any): void | boolean {
        // Check if the callback is not a function
        if (typeof callback !== 'function') {
            console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
            return false;
        }
        // Check if the event is not a string
        if (typeof event !== 'string') {
            console.error(`The event name must be a string, the given type is ${typeof event}`);
            return false;
        }
        // Check if this event not exists
        if (Variables.events[event] === undefined) {
            Variables.events[event] = {
                listeners: []
            }
        }
        
        Variables.events[event].listeners.push(callback);
    }

    // public static UiOnEvent(el: any, event: string, type: any, message: string): void {
    //     debugger;
    //     el.OnEvent(event, (e: any) => {
    //         console.log(message + ': ' + e);
    //       })

    //     //   flowTool.OnEvent('nodeMoved', function(id) {
    //     //     console.log("Node moved " + id);
    //     //   })
    // }
}