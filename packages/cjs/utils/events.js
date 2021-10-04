"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const constants_utils_js_1 = require("./constants.utils.js");
const variables_js_1 = require("./variables.js");
class Events {
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
        if (variables_js_1.Variables.Events[event] === undefined) {
            variables_js_1.Variables.Events[event] =
                {
                    listeners: []
                };
        }
        variables_js_1.Variables.Events[event].listeners.push(callback);
    }
    /**
        * Events that are dispatched from base-functions.Dispatch
       */
    static InitializeDispatchedEvents() {
        for (const e of constants_utils_js_1.ConstantUtils.DISPATCHED_EVENTS) {
            // events.OnEvent(e.Event, e.Callback);
            Events.OnEvent(e.Event, (val) => {
                if (val && e.Params && e.Params.length > 0) {
                    for (let v of e.Params) {
                        /**
                         * have to explicitly type 'v,' so we can index properly - shannon
                         * this currently only outputs to the console, but we can do whatever
                         * when one of the events occur
                         */
                        console.log(e.Message + ' ' + v + ': ' + val[v]);
                    }
                }
                else {
                    console.log(e.Message + ' ' + val);
                }
            });
        }
    }
}
exports.Events = Events;
