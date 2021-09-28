import { Variables } from './../utils/variables.js';
import { DrawingUtils } from "../utils/drawing.utils.js";
import { BaseFunctions } from "./base-functions.js";
import { NodeModel } from '../models/nodes/node.model.js';

export class DataFlowBaseClass extends BaseFunctions {

  constructor() {
    super();
  }

  /**
   * 
   * @param event Event
   */
    public DragEnd(event: any): void {
        let e_pos_x: number;
        let e_pos_y: number;
        let ele_last: any;
        let input_class: any;
        
      if (event.type === "touchend") {
        e_pos_x = Variables.MouseX;
        e_pos_y = Variables.MouseY;
        ele_last = document.elementFromPoint(e_pos_x, e_pos_y);
      } else {
        e_pos_x = event.clientX;
        e_pos_y = event.clientY;
        ele_last = event.target;
      }
  
      if(Variables.Dragging) {
        if(Variables.PosXStart != e_pos_x || Variables.PosYStart != e_pos_y) {
          this.Dispatch('nodeMoved', Variables.SelectedElement.id.slice(5));
        }
      }
  
      if(Variables.DragPoint) {
        Variables.SelectedElement.classList.remove("selected");
          if(Variables.PosXStart != e_pos_x || Variables.PosYStart != e_pos_y) {
            this.Dispatch('rerouteMoved', Variables.SelectedElement.parentElement.classList[2].slice(14));
          }
      }
  
      if(Variables.EditorIsSelected) {
        Variables.CanvasX = Variables.CanvasX + (-(Variables.PosX - e_pos_x));
        Variables.CanvasY = Variables.CanvasY + (-(Variables.PosY - e_pos_y));
        Variables.EditorIsSelected = false;
      }
      
      if(Variables.Connection === true) {

        /**
         * Check if the connection line is being set to an input connection
         */
        if(ele_last.classList[0] === 'input' || (Variables.ForceFirstInput && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === Variables.NodeClass))) {
  
          if(Variables.ForceFirstInput && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === Variables.NodeClass)) {
            if(ele_last.closest(".drawflow_content_node") != null) {
              var input_id = ele_last.closest(".drawflow_content_node").parentElement.id;
            } else {
              var input_id = ele_last.id;
            }
           if(Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0) {
             input_class = false;
           } else {
            input_class = "input_1";
           }
  
  
         } else {
           // Fix connection;
           var input_id = ele_last.parentElement.parentElement.id;
           input_class = ele_last.classList[1];
         }
         var output_id = Variables.SelectedElement.parentElement.parentElement.id;
         var output_class = Variables.SelectedElement.classList[1];
  
          if(output_id !== input_id && input_class !== false) {
  
            if(Variables.MainContainer.querySelectorAll('.connection.node_in_'+input_id+'.node_out_'+output_id+'.'+output_class+'.'+input_class).length === 0) {
            // Conection no exist save connection
  
            Variables.ConnectionElement.classList.add("node_in_"+input_id);
            Variables.ConnectionElement.classList.add("node_out_"+output_id);
            Variables.ConnectionElement.classList.add(output_class);
            Variables.ConnectionElement.classList.add(input_class);
            var id_input = input_id.slice(5);
            var id_output = output_id.slice(5);

            /**
             * Get the output element
             */
            let outputElement = this.activeModule(Variables.ActiveModule).Data.filter((obj: NodeModel) => {
              return obj.ID === id_output;
            })

            /**
             * Get the input element
             */
             let inputElement = this.activeModule(Variables.ActiveModule).Data.filter((obj: NodeModel) => {
              return obj.ID === id_input;
            })
  
            outputElement[0].Outputs[output_class].Connections.push( {"node": id_input, "output": input_class});
            inputElement[0].Inputs[input_class].Connections.push( {"node": id_output, "input": output_class});

            // this.activeModule(Variables.ActiveModule).Data[id_output].Outputs[output_class].Connections.push( {"node": id_input, "output": input_class});
            // this.activeModule(Variables.ActiveModule).Data[id_input].Inputs[input_class].Connections.push( {"node": id_output, "input": output_class});
           
            this.updateConnectionNodes('node-'+id_output);
            this.updateConnectionNodes('node-'+id_input);
            this.Dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class:  output_class, input_class: input_class});
  
          } else {
            this.Dispatch('connectionCancel', true);
            Variables.ConnectionElement.remove();
          }
  
           // Variables.ConnectionElement = null; - testing without this, shannon
        } else {
          // Connection exists Remove Connection;
          this.Dispatch('connectionCancel', true);
          Variables.ConnectionElement.remove();
          // Variables.ConnectionElement = null; - testing without this, shannon
        }
  
        } else {
          // Remove Connection;
          this.Dispatch('connectionCancel', true);
          Variables.ConnectionElement.remove();
          // Variables.ConnectionElement = null; - testing without this, shannon
        }
      }
  
      Variables.Dragging = false;
      Variables.DragPoint = false;
      Variables.Connection = false;
      Variables.SelectedElement = null;
      Variables.EditorIsSelected = false;
  
    }

    /**
     * Mouse position
     * 
     * @param e event
     */
    public Position(event: any): void {
      if (event.type === "touchmove") {
        var e_pos_x = event.touches[0].clientX;
        var e_pos_y = event.touches[0].clientY;
      } else {
        var e_pos_x = event.clientX;
        var e_pos_y = event.clientY;
      }
  
      if(Variables.Connection) {
        this.updateConnection(e_pos_x, e_pos_y);
      }
      if(Variables.EditorIsSelected) {
        x =  Variables.CanvasX + (-(Variables.PosX - e_pos_x))
        y = Variables.CanvasY + (-(Variables.PosY - e_pos_y))
        this.Dispatch('translate', { x: x, y: y});
        Variables.PreCanvas.style.transform = "translate("+x+"px, "+y+"px) scale("+Variables.Zoom+")";
      }
      if(Variables.Dragging) {
  
        var x = (Variables.PosX - e_pos_x) * Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom);
        var y = (Variables.PosY - e_pos_y) * Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom);
        Variables.PosX = e_pos_x;
        Variables.PosY = e_pos_y;
  
        Variables.SelectedElement.style.top = (Variables.SelectedElement.offsetTop - y) + "px";
        Variables.SelectedElement.style.left = (Variables.SelectedElement.offsetLeft - x) + "px";
  
        /**
         * Get the selected item
         */
        let selectedElement = this.activeModule(Variables.ActiveModule).Data.filter((obj: NodeModel) => {
          return obj.ID === Variables.SelectedElement.id.slice(5);
        })

          selectedElement.PosX = (Variables.SelectedElement.offsetLeft - x);
          selectedElement.PosY = (Variables.SelectedElement.offsetTop - y);

        // this.activeModule(Variables.ActiveModule).Data[selectedElementIndex].PosX = (Variables.SelectedElement.offsetLeft - x);
        // this.activeModule(Variables.ActiveModule).Data[selectedElementIndex].PosY = (Variables.SelectedElement.offsetTop - y);
  
        this.updateConnectionNodes(Variables.SelectedElement.id)
      }
  
      if(Variables.DragPoint) {
  
        var x = (Variables.PosX - e_pos_x) * Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom);
        var y = (Variables.PosY - e_pos_y) * Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom);
        Variables.PosX = e_pos_x;
        Variables.PosY = e_pos_y;
  
        var pos_x = Variables.PosX * ( Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().x * ( Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)));
        var pos_y = Variables.PosY * ( Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().y * ( Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)));
  
        Variables.SelectedElement.setAttributeNS(null, 'cx', pos_x);
        Variables.SelectedElement.setAttributeNS(null, 'cy', pos_y);
  
        const nodeUpdate = Variables.SelectedElement.parentElement.classList[2].slice(9);
        const nodeUpdateIn = Variables.SelectedElement.parentElement.classList[1].slice(13);
        const output_class = Variables.SelectedElement.parentElement.classList[3];
        const input_class = Variables.SelectedElement.parentElement.classList[4];
  
        let numberPointPosition = Array.from(Variables.SelectedElement.parentElement.children).indexOf(Variables.SelectedElement)-1;
  
        if(Variables.RerouteFixCurvature) {
          const numberMainPath = Variables.SelectedElement.parentElement.querySelectorAll(".main-path").length-1;
          numberPointPosition -= numberMainPath;
          if(numberPointPosition < 0) {
            numberPointPosition = 0;
          }
        }
  
        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].Connections.findIndex(function(item: any,i: any) {
          return item.node ===  nodeUpdateIn && item.output === input_class;
        });
  
        this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].Connections[searchConnection].points[numberPointPosition] = { pos_x: pos_x, pos_y: pos_y };
  
        const parentSelected = Variables.SelectedElement.parentElement.classList[2].slice(9);
  
        this.updateConnectionNodes(parentSelected);
      }
  
      if (event.type === "touchmove") {
        Variables.MouseX = e_pos_x;
        Variables.MouseY = e_pos_y;
      }
      this.Dispatch('mouseMove', {x: e_pos_x,y: e_pos_y });
    }

    // protected getAllDescendants(selectedNode: HTMLElement): void {
    //   const descendants: Array<any> = [];
    //   let t: NodeListOf<ChildNode> = selectedNode.childNodes;

    //   for (let i = 0; i < t.length; i++) {
    //     if (t[i].nodeType === 1) {
    //       this.recurseAndAdd(t[i], descendants);
    //     }
    //   }
    // }

    // protected recurseAndAdd(el: any, desc?: Array<any>): void {
    //   if ( desc)
    //     desc.push(el.id);
      
    //   const children: any = el.childNodes;

    //   for (let i = 0; i < children; i++) {

    //     /**
    //      * nodeType 1 is element node
    //      */
    //     if (children[i].nodeType === 1) {
    //       this.recurseAndAdd(children);
    //     }
    //   }

    //   debugger;
    // }

    /**
     * Click node event
     * @param event MouseEvent
     * @returns ?
     */
    public Click(event: any): any {
 
      this.Dispatch('click', event);

      if(Variables.EditorMode === 'fixed') {
        //return false;
         if(event.target.classList[0] === 'parent-drawflow' || event.target.classList[0] === 'drawflow') {
            Variables.SelectedElement = event.target.closest(".parent-drawflow");

         } else {

           return false;
         }

      } else if(Variables.EditorMode === 'view') {
        
        if(event.target.closest(".drawflow") != null || event.target.matches('.parent-drawflow')) {
            Variables.SelectedElement = event.target.closest(".parent-drawflow");
          event.preventDefault();
        }
      } else {
        Variables.FirstClickedElement = event.target;
        Variables.SelectedElement = event.target;
        if(event.button === 0) {
          this.contextmenuDel();
        }
  
        if(event.target.closest(".drawflow_content_node") != null) {
            Variables.SelectedElement = event.target.closest(".drawflow_content_node").parentElement;
        }
      }
      switch (Variables.SelectedElement.classList[0]) {
        case Variables.NodeClass:
          if(Variables.SelectedNode != null) {
            Variables.SelectedNode.classList.remove("selected");
            if(Variables.SelectedNode != Variables.SelectedElement) {
              this.Dispatch('nodeUnselected', true);
            }
          }
          if(Variables.SelectedConnection != null) {
            Variables.SelectedConnection.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.SelectedConnection = null;
          }
          if(Variables.SelectedNode != Variables.SelectedElement) {
            this.Dispatch('nodeSelected', Variables.SelectedElement.id.slice(5));
          }
          Variables.SelectedNode = Variables.SelectedElement;
          Variables.SelectedNode.classList.add("selected");
          if(!Variables.DraggableInputs) {
            if(event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA' && event.target.tagName !== 'SELECT' && event.target.hasAttribute('contenteditable') !== true) {
                Variables.Dragging = true;
            }
          } else {
            if(event.target.tagName !== 'SELECT') {
                Variables.Dragging = true;
            }
          }
          break;
        case 'output':
            Variables.Connection = true;
          if(Variables.SelectedNode != null) {
            Variables.SelectedNode.classList.remove("selected");
            Variables.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.SelectedConnection != null) {
            Variables.SelectedConnection.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.SelectedConnection = null;
          }
          DrawingUtils.DrawConnection(event.target, this.Dispatch);
          break;
        case 'parent-drawflow':
          if(Variables.SelectedNode != null) {
            Variables.SelectedNode.classList.remove("selected");
            Variables.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.SelectedConnection != null) {
            Variables.SelectedConnection.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.SelectedConnection = null;
          }
          Variables.EditorIsSelected = true;
          break;
        case 'drawflow':
          if(Variables.SelectedNode != null) {
            Variables.SelectedNode.classList.remove("selected");
            Variables.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.SelectedConnection != null) {
            Variables.SelectedConnection.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.SelectedConnection = null;
          }
          Variables.EditorIsSelected = true;
          break;
        case 'main-path':
          if(Variables.SelectedNode != null) {
            Variables.SelectedNode.classList.remove("selected");
            Variables.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.SelectedConnection != null) {
            Variables.SelectedConnection.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.SelectedConnection = null;
          }
          Variables.SelectedConnection = Variables.SelectedElement;
          Variables.SelectedConnection.classList.add("selected");
          const listclassConnection = Variables.SelectedConnection.parentElement.classList;
          this.Dispatch('connectionSelected', { output_id: listclassConnection[2].slice(14), input_id: listclassConnection[1].slice(13), output_class: listclassConnection[3], input_class: listclassConnection[4] });
          if(Variables.RerouteFixCurvature) {
            Variables.SelectedConnection.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
              item.classList.add("selected");
            });
          }
        break;
        case 'point':
            Variables.DragPoint = true;
            Variables.SelectedElement.classList.add("selected");
        break;
        case 'drawflow-delete':
          if(Variables.SelectedNode ) {
            this.removeNodeId(Variables.SelectedNode.id);
          }
  
          if(Variables.SelectedConnection) {
            this.removeConnection();
          }
  
          if(Variables.SelectedNode != null) {
            Variables.SelectedNode.classList.remove("selected");
            Variables.SelectedNode = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.SelectedConnection != null) {
            Variables.SelectedConnection.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.SelectedConnection = null;
          }
  
        break;
        default:
      }
      if (event.type === "touchstart") {
        Variables.PosX = event.touches[0].clientX;
        Variables.PosXStart = event.touches[0].clientX;
        Variables.PosY = event.touches[0].clientY;
        Variables.PosYStart = event.touches[0].clientY;
      } else {
        Variables.PosX = event.clientX;
        Variables.PosXStart = event.clientX;
        Variables.PosY = event.clientY;
        Variables.PosYStart = event.clientY;
      }
      this.Dispatch('clickEnd', event);
    }

    public Contextmenu(event: any): any {
      this.Dispatch('contextmenu', event);
      event.preventDefault();
      if(Variables.EditorMode === 'fixed' || Variables.EditorMode === 'view') {
        return false;
      }
      if(Variables.PreCanvas.getElementsByClassName("drawflow-delete").length) {
      
        Variables.PreCanvas.getElementsByClassName("drawflow-delete")[0].remove()
      };
      if(Variables.SelectedNode || Variables.SelectedConnection) {
        var deletebox = document.createElement('div');
        deletebox.classList.add("drawflow-delete");
        deletebox.innerHTML = "x";
        if(Variables.SelectedNode) {
          Variables.SelectedNode.appendChild(deletebox);
  
        }
        if(Variables.SelectedConnection) {
          deletebox.style.top = event.clientY * ( Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().y *  ( Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) ) + "px";
          deletebox.style.left = event.clientX * ( Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().x *  ( Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) ) + "px";
  
          Variables.PreCanvas.appendChild(deletebox);
  
        }
  
      }
  
    }

    /**
     * Keydown event
     * 
     * @param e event
     * @returns ?
     */
    public KeyDown(event: any): any {
      this.Dispatch('keydown', event);
      if(Variables.EditorMode === 'fixed' || Variables.EditorMode === 'view') {
        return false;
      }
      if (event.key === 'Delete' || (event.key === 'Backspace' && event.metaKey)) {
        if(Variables.SelectedNode != null) {
          if(Variables.FirstClickedElement.tagName !== 'INPUT' && Variables.FirstClickedElement.tagName !== 'TEXTAREA' && Variables.FirstClickedElement.hasAttribute('contenteditable') !== true) {
            this.removeNodeId(Variables.SelectedNode.id);
          }
        }
        if(Variables.SelectedConnection != null) {
          this.removeConnection();
        }
      }
    }

    /**
     * Event for zoom
     * 
     * @param event event
     * @param delta mouse wheel stuff
     */
    public Zoom_Enter(event: any, delta: any): void {
      if (event.ctrlKey) {
        event.preventDefault()
        if(event.deltaY > 0) {
          // Zoom Out
          this.Zoom_Out();
        } else {
          // Zoom In
          this.Zoom_In();
        }
      }
    }

    /**
     * Input changes
     * 
     * @param event event
     */
    public UpdateNodeValue(event: any): void {
      var attr = event.target.attributes
      for (var i = 0; i < attr.length; i++) {
              if (attr[i].nodeName.startsWith('df-')) {
                  var keys = attr[i].nodeName.slice(3).split("-");
                  var target = this.activeModule(Variables.ActiveModule).Data[event.target.closest(".drawflow_content_node").parentElement.id.slice(5)].data;
                  for (var index = 0; index < keys.length - 1; index += 1) {
                      if (target[keys[index]] == null) {
                          target[keys[index]] = {};
                      }
                      target = target[keys[index]];
                  }
                  target[keys[keys.length - 1]] = event.target.value;
                  this.Dispatch('nodeDataChanged', event.target.closest(".drawflow_content_node").parentElement.id.slice(5));
            }
      }
    }

    /**
     * Double click event
     * 
     * @param event event
     */
    public DblClick(event: any): void {
      if(Variables.SelectedConnection != null && Variables.Reroute) {
          this.createReroutePoint(Variables.SelectedConnection);
      }
  
      if(event.target.classList[0] === 'point') {
          this.removeReroutePoint(event.target);
      }
    }

    /* Mobile zoom */

    /**
     * Pointer down
     * @param event event
     */
    public PointerDown(event: any): void {
      Variables.EVCache.push(event);
   }

   /**
    * Pointer move
    * 
    * @param e event
    */
   public PointerMove(event: any): void {
    for (var i = 0; i < Variables.EVCache.length; i++) {
      if (event.pointerId == Variables.EVCache[i].pointerId) {
       Variables.EVCache[i] = event;
      break;
      }
    }
 
    if (Variables.EVCache.length == 2) {
      // Calculate the distance between the two pointers
      var curDiff = Math.abs(Variables.EVCache[0].clientX - Variables.EVCache[1].clientX);
 
      if (Variables.PrevDiff > 100) {
        if (curDiff > Variables.PrevDiff) {
          // The distance between the two pointers has increased
 
          this.Zoom_In();
        }
        if (curDiff < Variables.PrevDiff) {
          // The distance between the two pointers has decreased
          this.Zoom_Out();
        }
      }
      Variables.PrevDiff = curDiff;
    }
   }

   /**
    * Pointer up
    * 
    * @param event event
    */
   public PointerUp(event: any): void {
    this.Remove_Event(event);
    if (Variables.EVCache.length < 2) {
      Variables.PrevDiff = -1;
    }
  }
}