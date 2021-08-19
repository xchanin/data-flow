import { Variables as variables} from './../utils/variables.js';
import { Events } from './../utils/events.js';
import { ContainerEvent } from '../models/nodes/container-event.model.js';
import { DrawFlowModel } from './../models/drawflow.model';

export class FlowTool {

    // protected variables: Variables = new Variables();
    
    /**
     * List of event listeners
     */
    protected eventListeners: Array<ContainerEvent>;

    constructor(container: HTMLElement ) {
  
        variables.container = container;

        this.eventListeners = [
            {
                Event: 'mouseup', 
                Action: this.dragEnd.bind(this)
            },
            {
                Event: 'mousemove', 
                Action: this.position.bind(this)
            },
            {
                Event: 'mousedown', 
                Action: this.click.bind(this)
            },
            {
                Event: 'touchend', 
                Action: this.dragEnd.bind(this)
            },
            {
                Event: 'touchmove', 
                Action: this.position.bind(this)
            },
            {
                Event: 'touchstart', 
                Action: this.click.bind(this)
            },
            {
                Event: 'contextmenu', 
                Action: this.contextmenu.bind(this)
            },
            {
                Event: 'keydown', 
                Action: this.key.bind(this)
            },
            {
                Event: 'wheel', 
                Action: this.zoom_enter.bind(this)
            },
            {
                Event: 'input', 
                Action: this.updateNodeValue.bind(this)
            },
            {
                Event: 'dblclick', 
                Action: this.dblclick.bind(this)
            },
            {
                Event: 'onpointerdown',
                Action: this.pointerdown_handler.bind(this)
            },
            {
                Event: 'onpointermove',
                Action: this.pointermove_handler.bind(this)
            },
            {
                Event: 'onpointerup',
                Action: this.pointerup_handler.bind(this)
            },
            {
                Event: 'onpointercancel',
                Action: this.pointerup_handler.bind(this)
            },
            {
                Event: 'onpointerout',
                Action: this.pointerup_handler.bind(this)
            },
            {
                Event: 'onpointerleave',
                Action: this.pointerup_handler.bind(this)
            }
        ]
    }

    /**
     * Setup flow tool
     */
    public Init(): void {
        variables.container.classList.add('parent-drawflow');
        variables.container.tabIndex = 0;
        variables.precanvas = document.createElement('div');
        variables.precanvas.classList.add('drawflow');
        variables.container.appendChild(variables.precanvas);

        /**
         * add eventlisteners to the container
         */
        Events.AddEventListeners(variables.container, this.eventListeners);

        this.load();

    }

    // Helpers

    protected load(): void {

        const module: DrawFlowModel | undefined = variables.drawflow.find((x: DrawFlowModel) => 
        {
            return x.Module === variables.module
        });
        
        if (module) {
            for (const key in module.Data) {
                const val: any = module.Data[key];
                this.addNodeImport(module.Data[key], variables.precanvas);
            }

            if (variables.reroute) {
                for (const key in module.Data) {
                    this.addRerouteImport(module.Data[key]);
                }
            }

            for (const key in module.Data) {
                this.updateConnectionNodes('node-' + key);
            }

            let number: number = 1;

            Object.keys(module).map((moduleName, index) => {
                Object.keys(module.Data).map((id, index2) => {
                  if(parseInt(id) >= number) {
                    number = parseInt(id)+1;
                  }
                });
            });

            variables.nodeId = number;
        }
    }

    protected addNodeImport(dataNode: any, precanvas: HTMLElement): void {

    }

    protected addRerouteImport(dataNode: any): void {

    }

    protected updateConnectionNodes(id: string): void {

    }









    /**
     * Event listeners
     */
    protected dragEnd(): void {
        console.log('dragEnd')
    }

    protected position(): void {
        console.log('dragEnd')
    }

    protected click(): void {
        console.log('dragEnd')
    }

    protected contextmenu(): void {
        console.log('dragEnd')
    }

    protected key(): void {
        console.log('dragEnd')
    }

    protected zoom_enter(): void {
        console.log('dragEnd')
    }

    protected updateNodeValue(): void {
        console.log('dragEnd')
    }

    protected dblclick(): void {
        console.log('dragEnd')
    }

    /**
     * Pointer event listeners
     */

     protected pointerdown_handler(): void {
        console.log('dragEnd')
    }

    protected pointermove_handler(): void {
        console.log('dragEnd')
    }

    protected pointerup_handler(): void {
        console.log('dragEnd')
    }
}