/**
 * Model for container events
 */
export class ContainerEvent {

    public Action!: (event?: Event, delta?: any) => void;
    public Event!: string;
}