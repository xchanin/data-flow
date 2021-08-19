import { Variables } from './../utils/variables.js';
import { DrawingUtils } from "../utils/drawing.utils.js";
import { BaseFunctions } from "./base-functions.js";

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
        e_pos_x = Variables.mouse_x;
        e_pos_y = Variables.mouse_y;
        ele_last = document.elementFromPoint(e_pos_x, e_pos_y);
      } else {
        e_pos_x = event.clientX;
        e_pos_y = event.clientY;
        ele_last = event.target;
      }
  
      if(Variables.drag) {
        if(Variables.pos_x_start != e_pos_x || Variables.pos_y_start != e_pos_y) {
          this.Dispatch('nodeMoved', Variables.ele_selected.id.slice(5));
        }
      }
  
      if(Variables.drag_point) {
        Variables.ele_selected.classList.remove("selected");
          if(Variables.pos_x_start != e_pos_x || Variables.pos_y_start != e_pos_y) {
            this.Dispatch('rerouteMoved', Variables.ele_selected.parentElement.classList[2].slice(14));
          }
      }
  
      if(Variables.editor_selected) {
        Variables.canvas_x = Variables.canvas_x + (-(Variables.pos_x - e_pos_x));
        Variables.canvas_y = Variables.canvas_y + (-(Variables.pos_y - e_pos_y));
        Variables.editor_selected = false;
      }
      if(Variables.connection === true) {
        if(ele_last.classList[0] === 'input' || (Variables.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node'))) {
  
          if(Variables.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node')) {
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
         var output_id = Variables.ele_selected.parentElement.parentElement.id;
         var output_class = Variables.ele_selected.classList[1];
  
          if(output_id !== input_id && input_class !== false) {
  
            if(Variables.container.querySelectorAll('.connection.node_in_'+input_id+'.node_out_'+output_id+'.'+output_class+'.'+input_class).length === 0) {
            // Conection no exist save connection
  
            Variables.connection_ele.classList.add("node_in_"+input_id);
            Variables.connection_ele.classList.add("node_out_"+output_id);
            Variables.connection_ele.classList.add(output_class);
            Variables.connection_ele.classList.add(input_class);
            var id_input = input_id.slice(5);
            var id_output = output_id.slice(5);
  
            this.activeModule(Variables.module).Data[id_output].outputs[output_class].connections.push( {"node": id_input, "output": input_class});
            this.activeModule(Variables.module).Data[id_input].inputs[input_class].connections.push( {"node": id_output, "input": output_class});
            this.updateConnectionNodes('node-'+id_output);
            this.updateConnectionNodes('node-'+id_input);
            this.Dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class:  output_class, input_class: input_class});
  
          } else {
            this.Dispatch('connectionCancel', true);
            Variables.connection_ele.remove();
          }
  
            Variables.connection_ele = null;
        } else {
          // Connection exists Remove Connection;
          this.Dispatch('connectionCancel', true);
          Variables.connection_ele.remove();
          Variables.connection_ele = null;
        }
  
        } else {
          // Remove Connection;
          this.Dispatch('connectionCancel', true);
          Variables.connection_ele.remove();
          Variables.connection_ele = null;
        }
      }
  
      Variables.drag = false;
      Variables.drag_point = false;
      Variables.connection = false;
      Variables.ele_selected = null;
      Variables.editor_selected = false;
  
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
  
      if(Variables.connection) {
        this.updateConnection(e_pos_x, e_pos_y);
      }
      if(Variables.editor_selected) {
        x =  Variables.canvas_x + (-(Variables.pos_x - e_pos_x))
        y = Variables.canvas_y + (-(Variables.pos_y - e_pos_y))
        this.Dispatch('translate', { x: x, y: y});
        Variables.precanvas.style.transform = "translate("+x+"px, "+y+"px) scale("+Variables.zoom+")";
      }
      if(Variables.drag) {
  
        var x = (Variables.pos_x - e_pos_x) * Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom);
        var y = (Variables.pos_y - e_pos_y) * Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom);
        Variables.pos_x = e_pos_x;
        Variables.pos_y = e_pos_y;
  
        Variables.ele_selected.style.top = (Variables.ele_selected.offsetTop - y) + "px";
        Variables.ele_selected.style.left = (Variables.ele_selected.offsetLeft - x) + "px";
  
        this.activeModule(Variables.module).Data[Variables.ele_selected.id.slice(5)].pos_x = (Variables.ele_selected.offsetLeft - x);
        this.activeModule(Variables.module).Data[Variables.ele_selected.id.slice(5)].pos_y = (Variables.ele_selected.offsetTop - y);
  
        this.updateConnectionNodes(Variables.ele_selected.id)
      }
  
      if(Variables.drag_point) {
  
        var x = (Variables.pos_x - e_pos_x) * Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom);
        var y = (Variables.pos_y - e_pos_y) * Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom);
        Variables.pos_x = e_pos_x;
        Variables.pos_y = e_pos_y;
  
        var pos_x = Variables.pos_x * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().x * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)));
        var pos_y = Variables.pos_y * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().y * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)));
  
        Variables.ele_selected.setAttributeNS(null, 'cx', pos_x);
        Variables.ele_selected.setAttributeNS(null, 'cy', pos_y);
  
        const nodeUpdate = Variables.ele_selected.parentElement.classList[2].slice(9);
        const nodeUpdateIn = Variables.ele_selected.parentElement.classList[1].slice(13);
        const output_class = Variables.ele_selected.parentElement.classList[3];
        const input_class = Variables.ele_selected.parentElement.classList[4];
  
        let numberPointPosition = Array.from(Variables.ele_selected.parentElement.children).indexOf(Variables.ele_selected)-1;
  
        if(Variables.reroute_fix_curvature) {
          const numberMainPath = Variables.ele_selected.parentElement.querySelectorAll(".main-path").length-1;
          numberPointPosition -= numberMainPath;
          if(numberPointPosition < 0) {
            numberPointPosition = 0;
          }
        }
  
        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections.findIndex(function(item: any,i: any) {
          return item.node ===  nodeUpdateIn && item.output === input_class;
        });
  
        this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points[numberPointPosition] = { pos_x: pos_x, pos_y: pos_y };
  
        const parentSelected = Variables.ele_selected.parentElement.classList[2].slice(9);
  
        this.updateConnectionNodes(parentSelected);
      }
  
      if (event.type === "touchmove") {
        Variables.mouse_x = e_pos_x;
        Variables.mouse_y = e_pos_y;
      }
      this.Dispatch('mouseMove', {x: e_pos_x,y: e_pos_y });
    }

    /**
     * Click node event
     * @param e event
     * @returns ?
     */
    public Click(event: any): any {
      this.Dispatch('click', event);
      if(Variables.editor_mode === 'fixed') {
        //return false;
         if(event.target.classList[0] === 'parent-drawflow' || event.target.classList[0] === 'drawflow') {
            Variables.ele_selected = event.target.closest(".parent-drawflow");
         } else {
           return false;
         }
      } else if(Variables.editor_mode === 'view') {
        if(event.target.closest(".drawflow") != null || event.target.matches('.parent-drawflow')) {
            Variables.ele_selected = event.target.closest(".parent-drawflow");
          event.preventDefault();
        }
      } else {
        Variables.first_click = event.target;
        Variables.ele_selected = event.target;
        if(event.button === 0) {
          this.contextmenuDel();
        }
  
        if(event.target.closest(".drawflow_content_node") != null) {
            Variables.ele_selected = event.target.closest(".drawflow_content_node").parentElement;
        }
      }
      switch (Variables.ele_selected.classList[0]) {
        case 'drawflow-node':
          if(Variables.node_selected != null) {
            Variables.node_selected.classList.remove("selected");
            if(Variables.node_selected != Variables.ele_selected) {
              this.Dispatch('nodeUnselected', true);
            }
          }
          if(Variables.connection_selected != null) {
            Variables.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.connection_selected = null;
          }
          if(Variables.node_selected != Variables.ele_selected) {
            this.Dispatch('nodeSelected', Variables.ele_selected.id.slice(5));
          }
          Variables.node_selected = Variables.ele_selected;
          Variables.node_selected.classList.add("selected");
          if(!Variables.draggable_inputs) {
            if(event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA' && event.target.tagName !== 'SELECT' && event.target.hasAttribute('contenteditable') !== true) {
                Variables.drag = true;
            }
          } else {
            if(event.target.tagName !== 'SELECT') {
                Variables.drag = true;
            }
          }
          break;
        case 'output':
            Variables.connection = true;
          if(Variables.node_selected != null) {
            Variables.node_selected.classList.remove("selected");
            Variables.node_selected = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.connection_selected != null) {
            Variables.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.connection_selected = null;
          }
          DrawingUtils.DrawConnection(event.target, this.Dispatch);
          break;
        case 'parent-drawflow':
          if(Variables.node_selected != null) {
            Variables.node_selected.classList.remove("selected");
            Variables.node_selected = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.connection_selected != null) {
            Variables.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.connection_selected = null;
          }
          Variables.editor_selected = true;
          break;
        case 'drawflow':
          if(Variables.node_selected != null) {
            Variables.node_selected.classList.remove("selected");
            Variables.node_selected = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.connection_selected != null) {
            Variables.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.connection_selected = null;
          }
          Variables.editor_selected = true;
          break;
        case 'main-path':
          if(Variables.node_selected != null) {
            Variables.node_selected.classList.remove("selected");
            Variables.node_selected = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.connection_selected != null) {
            Variables.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.connection_selected = null;
          }
          Variables.connection_selected = Variables.ele_selected;
          Variables.connection_selected.classList.add("selected");
          const listclassConnection = Variables.connection_selected.parentElement.classList;
          this.Dispatch('connectionSelected', { output_id: listclassConnection[2].slice(14), input_id: listclassConnection[1].slice(13), output_class: listclassConnection[3], input_class: listclassConnection[4] });
          if(Variables.reroute_fix_curvature) {
            Variables.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
              item.classList.add("selected");
            });
          }
        break;
        case 'point':
            Variables.drag_point = true;
            Variables.ele_selected.classList.add("selected");
        break;
        case 'drawflow-delete':
          if(Variables.node_selected ) {
            this.removeNodeId(Variables.node_selected.id);
          }
  
          if(Variables.connection_selected) {
            this.removeConnection();
          }
  
          if(Variables.node_selected != null) {
            Variables.node_selected.classList.remove("selected");
            Variables.node_selected = null;
            this.Dispatch('nodeUnselected', true);
          }
          if(Variables.connection_selected != null) {
            Variables.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            Variables.connection_selected = null;
          }
  
        break;
        default:
      }
      if (event.type === "touchstart") {
        Variables.pos_x = event.touches[0].clientX;
        Variables.pos_x_start = event.touches[0].clientX;
        Variables.pos_y = event.touches[0].clientY;
        Variables.pos_y_start = event.touches[0].clientY;
      } else {
        Variables.pos_x = event.clientX;
        Variables.pos_x_start = event.clientX;
        Variables.pos_y = event.clientY;
        Variables.pos_y_start = event.clientY;
      }
      this.Dispatch('clickEnd', event);
    }

    public Contextmenu(event: any): any {
      this.Dispatch('contextmenu', event);
      event.preventDefault();
      if(Variables.editor_mode === 'fixed' || Variables.editor_mode === 'view') {
        return false;
      }
      if(Variables.precanvas.getElementsByClassName("drawflow-delete").length) {
        Variables.precanvas.getElementsByClassName("drawflow-delete")[0].remove()
      };
      if(Variables.node_selected || Variables.connection_selected) {
        var deletebox = document.createElement('div');
        deletebox.classList.add("drawflow-delete");
        deletebox.innerHTML = "x";
        if(Variables.node_selected) {
          Variables.node_selected.appendChild(deletebox);
  
        }
        if(Variables.connection_selected) {
          deletebox.style.top = event.clientY * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().y *  ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) ) + "px";
          deletebox.style.left = event.clientX * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().x *  ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) ) + "px";
  
          Variables.precanvas.appendChild(deletebox);
  
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
      if(Variables.editor_mode === 'fixed' || Variables.editor_mode === 'view') {
        return false;
      }
      if (event.key === 'Delete' || (event.key === 'Backspace' && event.metaKey)) {
        if(Variables.node_selected != null) {
          if(Variables.first_click.tagName !== 'INPUT' && Variables.first_click.tagName !== 'TEXTAREA' && Variables.first_click.hasAttribute('contenteditable') !== true) {
            this.removeNodeId(Variables.node_selected.id);
          }
        }
        if(Variables.connection_selected != null) {
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
                  var target = this.activeModule(Variables.module).Data[event.target.closest(".drawflow_content_node").parentElement.id.slice(5)].data;
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
      if(Variables.connection_selected != null && Variables.reroute) {
          this.createReroutePoint(Variables.connection_selected);
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
      Variables.evCache.push(event);
   }

   /**
    * Pointer move
    * 
    * @param e event
    */
   public PointerMove(event: any): void {
    for (var i = 0; i < Variables.evCache.length; i++) {
      if (event.pointerId == Variables.evCache[i].pointerId) {
       Variables.evCache[i] = event;
      break;
      }
    }
 
    if (Variables.evCache.length == 2) {
      // Calculate the distance between the two pointers
      var curDiff = Math.abs(Variables.evCache[0].clientX - Variables.evCache[1].clientX);
 
      if (Variables.prevDiff > 100) {
        if (curDiff > Variables.prevDiff) {
          // The distance between the two pointers has increased
 
          this.Zoom_In();
        }
        if (curDiff < Variables.prevDiff) {
          // The distance between the two pointers has decreased
          this.Zoom_Out();
        }
      }
      Variables.prevDiff = curDiff;
    }
   }

   /**
    * Pointer up
    * 
    * @param event event
    */
   public PointerUp(event: any): void {
    this.Remove_Event(event);
    if (Variables.evCache.length < 2) {
      Variables.prevDiff = -1;
    }
  }
}