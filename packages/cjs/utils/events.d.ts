import { ContainerEvent } from '../models/nodes/container-event.model.js';
export declare class Events {
    /**
     * @param parent HTMLElement
     * @param events list of event listeners to add
     */
    static AddEventListeners(parent: HTMLElement, events: Array<ContainerEvent>): void;
    static OnEvent(event: string, callback: any): void | boolean;
    /**
        * Events that are dispatched from base-functions.Dispatch
       */
    static InitializeDispatchedEvents(): void;
}
