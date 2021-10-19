import { ContainerEvent } from '../models/nodes/container-event.model';
export declare class EventsUtils {
    /**
     * @param parent HTMLElement
     * @param events list of event listeners to add
     */
    static AddEventListeners(parent: HTMLElement, events: Array<ContainerEvent>): void;
    static OnEvent(event: string, callback: any): void | boolean;
    static Dispatch(event: any, details: any): boolean | void;
    /**
        * Events that are dispatched from base-functions.Dispatch
       */
    static InitializeDispatchedEvents(): void;
}
