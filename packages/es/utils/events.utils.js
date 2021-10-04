import { ConstantUtils } from './constants.utils.js';
import { Variables } from './variables.js';
export class EventsUtils {
    /**
     * @param parent HTMLElement
     * @param events list of event listeners to add
     */
    static AddEventListeners(parent, events) {
        for (const e of events) {
            parent.addEventListener(e.Event, e.Action);
        }
    }
    static OnEvent(event, callback) {
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
                };
        }
        Variables.Events[event].listeners.push(callback);
    }
    static Dispatch(event, details) {
        // Check if this event not exists
        if (Variables.Events[event] === undefined) {
            // console.error(`This event: ${event} does not exist`);
            return false;
        }
        Variables.Events[event].listeners.forEach((listener) => {
            listener(details);
        });
    }
    /**
        * Events that are dispatched from base-functions.Dispatch
       */
    static InitializeDispatchedEvents() {
        for (const e of ConstantUtils.DISPATCHED_EVENTS) {
            // events.OnEvent(e.Event, e.Callback);
            EventsUtils.OnEvent(e.Event, (val) => {
                if (val && e.Params && e.Params.length > 0) {
                    for (let v of e.Params) {
                        /**
                         * have to explicitly type 'v,' so we can index properly - shannon
                         * this currently only outputs to the console, but we can do whatever
                         * when one of the events occur
                         */
                        // console.log(e.Message + ' ' + v + ': ' + val[v as keyof DispatchedEventsModel['Params']]);
                    }
                }
                else {
                    // console.log(e.Message + ' ' + val);
                }
            });
        }
    }
}
