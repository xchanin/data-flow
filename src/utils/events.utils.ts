import { DispatchedEventsModel } from '../models/events/dispatched-events.model.js';
import { ContainerEvent } from '../models/nodes/container-event.model.js';
import { ConstantUtils } from './constants.utils.js';
import { Variables } from './variables.js';

export class EventsUtils {
    
    /**
     * @param parent HTMLElement
     * @param events list of event listeners to add 
     */
    public static AddEventListeners(parent: HTMLElement, events: Array<ContainerEvent>): void {
        
        for (const e of events) {
            parent.addEventListener(e.Event, e.Action);
        }
    }

    public static OnEvent(event: string, callback: any): void | boolean {
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
        if (Variables.Events[event] === undefined) {
            Variables.Events[event] = 
            {
                listeners: []
            }
        }

        Variables.Events[event].listeners.push(callback);
    }

    public static Dispatch(event: any, details: any): boolean | void {
        // Check if this event not exists
        if (Variables.Events[event] === undefined) {
            // console.error(`This event: ${event} does not exist`);
            return false;
        }
        Variables.Events[event].listeners.forEach((listener: any) => {
            listener(details);
        });
    }

 /**
     * Events that are dispatched from base-functions.Dispatch
    */
    public static InitializeDispatchedEvents(): void {
       
        for (const e of ConstantUtils.DISPATCHED_EVENTS) {
            // events.OnEvent(e.Event, e.Callback);
            EventsUtils.OnEvent(e.Event, (val: DispatchedEventsModel["Params"] | string) => {
                if (val && e.Params && e.Params.length > 0) {
                    for (let v of e.Params) {

                        /**
                         * have to explicitly type 'v,' so we can index properly - shannon
                         * this currently only outputs to the console, but we can do whatever
                         * when one of the events occur
                         */
                       
                        // console.log(e.Message + ' ' + v + ': ' + val[v as keyof DispatchedEventsModel['Params']]);
                    }
                } else {
                    // console.log(e.Message + ' ' + val);
                }
            })
        }
    }
}