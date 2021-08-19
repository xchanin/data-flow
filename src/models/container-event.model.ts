/**
 * Model for container events
 */
export class ContainerEvent {

    public Action!: () => void;
    public Event!: string;
}