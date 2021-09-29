"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawflow_model_js_1 = require("../models/drawflow.model.js");
const events_js_1 = require("./../utils/events.js");
const data_flow_base_class_js_1 = require("../base-classes/data-flow-base-class.js");
const variables_js_1 = require("../utils/variables.js");
class FlowToolOriginal02 extends data_flow_base_class_js_1.DataFlowBaseClass {
    constructor(container, render = null, parent = null) {
        super();
        variables_js_1.Variables.parent = parent;
        variables_js_1.Variables.render = render;
        variables_js_1.Variables.container = container;
        this.eventListeners = [
            {
                Event: 'mouseup',
                Action: this.DragEnd.bind(this)
            },
            {
                Event: 'mousemove',
                Action: this.Position.bind(this)
            },
            {
                Event: 'mousedown',
                Action: this.Click.bind(this)
            },
            {
                Event: 'touchend',
                Action: this.DragEnd.bind(this)
            },
            {
                Event: 'touchmove',
                Action: this.Position.bind(this)
            },
            {
                Event: 'touchstart',
                Action: this.Click.bind(this)
            },
            {
                Event: 'contextmenu',
                Action: this.Contextmenu.bind(this)
            },
            {
                Event: 'keydown',
                Action: this.KeyDown.bind(this)
            },
            {
                Event: 'wheel',
                Action: this.Zoom_Enter.bind(this)
            },
            {
                Event: 'input',
                Action: this.UpdateNodeValue.bind(this)
            },
            {
                Event: 'dblclick',
                Action: this.DblClick.bind(this)
            },
            {
                Event: 'onpointerdown',
                Action: this.PointerDown.bind(this)
            },
            {
                Event: 'onpointermove',
                Action: this.PointerMove.bind(this)
            },
            {
                Event: 'onpointerup',
                Action: this.PointerUp.bind(this)
            },
            {
                Event: 'onpointercancel',
                Action: this.PointerUp.bind(this)
            },
            {
                Event: 'onpointerout',
                Action: this.PointerUp.bind(this)
            },
            {
                Event: 'onpointerleave',
                Action: this.PointerUp.bind(this)
            }
        ];
    }
    start() {
        // console.info("Start Drawflow!!");
        variables_js_1.Variables.container.classList.add("parent-drawflow");
        variables_js_1.Variables.container.tabIndex = 0;
        variables_js_1.Variables.precanvas = document.createElement('div');
        variables_js_1.Variables.precanvas.classList.add("drawflow");
        variables_js_1.Variables.container.appendChild(variables_js_1.Variables.precanvas);
        /**
         * add eventlisteners to the container
         */
        events_js_1.Events.AddEventListeners(variables_js_1.Variables.container, this.eventListeners);
        // Variables.load();
    }
    /* Mobile zoom */
    // pointerdown_handler(ev: any) {
    //     Variables.evCache.push(ev);
    // }
    // pointermove_handler(ev: any) {
    //  for (var i = 0; i < Variables.evCache.length; i++) {
    //    if (ev.pointerId == Variables.evCache[i].pointerId) {
    //     Variables.evCache[i] = ev;
    //    break;
    //    }
    //  }
    //  if (Variables.evCache.length == 2) {
    //    // Calculate the distance between the two pointers
    //    var curDiff = Math.abs(Variables.evCache[0].clientX - Variables.evCache[1].clientX);
    //    if (Variables.prevDiff > 100) {
    //      if (curDiff > Variables.prevDiff) {
    //        // The distance between the two pointers has increased
    //        this.zoom_in();
    //      }
    //      if (curDiff < Variables.prevDiff) {
    //        // The distance between the two pointers has decreased
    //        this.zoom_out();
    //      }
    //    }
    //    Variables.prevDiff = curDiff;
    //  }
    // }
    // pointerup_handler(ev: any) {
    //   this.remove_event(ev);
    //   if (Variables.evCache.length < 2) {
    //     Variables.prevDiff = -1;
    //   }
    // }
    // remove_event(ev: any) {
    //  // Remove this event from the target's cache
    //  for (var i = 0; i < Variables.evCache.length; i++) {
    //    if (Variables.evCache[i].pointerId == ev.pointerId) {
    //     Variables.evCache.splice(i, 1);
    //      break;
    //    }
    //  }
    // }
    // protected activeModule(module?: string): DrawFlowModel | any {
    //     const t = Variables.drawflowTest.find((e: DrawFlowModel) => {
    //         if (module) {
    //             return e.Module === module;
    //         }
    //         return e.Module === Variables.module;
    //     })
    //    return t;
    // }
    /* End Mobile Zoom */
    load() {
        for (var key in this.activeModule(variables_js_1.Variables.module).Data) {
            this.addNodeImport(this.activeModule(variables_js_1.Variables.module).Data[key], variables_js_1.Variables.precanvas);
        }
        for (var key in this.activeModule(variables_js_1.Variables.module).Data) {
            this.addNodeImport(this.activeModule(variables_js_1.Variables.module).Data[key], variables_js_1.Variables.precanvas);
        }
        if (variables_js_1.Variables.reroute) {
            for (var key in this.activeModule(variables_js_1.Variables.module).Data) {
                this.addRerouteImport(this.activeModule(variables_js_1.Variables.module).Data[key]);
            }
        }
        for (var key in this.activeModule(variables_js_1.Variables.module).Data) {
            this.updateConnectionNodes('node-' + key);
        }
        const editor = this.activeModule(variables_js_1.Variables.module);
        let number = 1;
        Object.keys(editor).map(function (key, index) {
            Object.keys(editor[key]).map(function (id, index2) {
                if (parseInt(id) >= number) {
                    number = parseInt(id) + 1;
                }
            });
        });
        variables_js_1.Variables.nodeId = number;
    }
    // removeReouteConnectionSelected(){
    //   this.Dispatch('connectionUnselected', true);
    //   if(Variables.reroute_fix_curvature) {
    //     Variables.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
    //       item.classList.remove("selected");
    //     });
    //   }
    // }
    // click(e: any) {
    //   this.Dispatch('click', e);
    //   if(Variables.editor_mode === 'fixed') {
    //     //return false;
    //      if(e.target.classList[0] === 'parent-drawflow' || e.target.classList[0] === 'drawflow') {
    //         Variables.ele_selected = e.target.closest(".parent-drawflow");
    //      } else {
    //        return false;
    //      }
    //   } else if(Variables.editor_mode === 'view') {
    //     if(e.target.closest(".drawflow") != null || e.target.matches('.parent-drawflow')) {
    //         Variables.ele_selected = e.target.closest(".parent-drawflow");
    //       e.preventDefault();
    //     }
    //   } else {
    //     Variables.first_click = e.target;
    //     Variables.ele_selected = e.target;
    //     if(e.button === 0) {
    //       this.contextmenuDel();
    //     }
    //     if(e.target.closest(".drawflow_content_node") != null) {
    //         Variables.ele_selected = e.target.closest(".drawflow_content_node").parentElement;
    //     }
    //   }
    //   switch (Variables.ele_selected.classList[0]) {
    //     case 'drawflow-node':
    //       if(Variables.node_selected != null) {
    //         Variables.node_selected.classList.remove("selected");
    //         if(Variables.node_selected != Variables.ele_selected) {
    //           this.Dispatch('nodeUnselected', true);
    //         }
    //       }
    //       if(Variables.connection_selected != null) {
    //         Variables.connection_selected.classList.remove("selected");
    //         this.removeReouteConnectionSelected();
    //         Variables.connection_selected = null;
    //       }
    //       if(Variables.node_selected != Variables.ele_selected) {
    //         this.Dispatch('nodeSelected', Variables.ele_selected.id.slice(5));
    //       }
    //       Variables.node_selected = Variables.ele_selected;
    //       Variables.node_selected.classList.add("selected");
    //       if(!Variables.draggable_inputs) {
    //         if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT' && e.target.hasAttribute('contenteditable') !== true) {
    //             Variables.drag = true;
    //         }
    //       } else {
    //         if(e.target.tagName !== 'SELECT') {
    //             Variables.drag = true;
    //         }
    //       }
    //       break;
    //     case 'output':
    //         Variables.connection = true;
    //       if(Variables.node_selected != null) {
    //         Variables.node_selected.classList.remove("selected");
    //         Variables.node_selected = null;
    //         this.Dispatch('nodeUnselected', true);
    //       }
    //       if(Variables.connection_selected != null) {
    //         Variables.connection_selected.classList.remove("selected");
    //         this.removeReouteConnectionSelected();
    //         Variables.connection_selected = null;
    //       }
    //       this.drawConnection(e.target);
    //       break;
    //     case 'parent-drawflow':
    //       if(Variables.node_selected != null) {
    //         Variables.node_selected.classList.remove("selected");
    //         Variables.node_selected = null;
    //         this.Dispatch('nodeUnselected', true);
    //       }
    //       if(Variables.connection_selected != null) {
    //         Variables.connection_selected.classList.remove("selected");
    //         this.removeReouteConnectionSelected();
    //         Variables.connection_selected = null;
    //       }
    //       Variables.editor_selected = true;
    //       break;
    //     case 'drawflow':
    //       if(Variables.node_selected != null) {
    //         Variables.node_selected.classList.remove("selected");
    //         Variables.node_selected = null;
    //         this.Dispatch('nodeUnselected', true);
    //       }
    //       if(Variables.connection_selected != null) {
    //         Variables.connection_selected.classList.remove("selected");
    //         this.removeReouteConnectionSelected();
    //         Variables.connection_selected = null;
    //       }
    //       Variables.editor_selected = true;
    //       break;
    //     case 'main-path':
    //       if(Variables.node_selected != null) {
    //         Variables.node_selected.classList.remove("selected");
    //         Variables.node_selected = null;
    //         this.Dispatch('nodeUnselected', true);
    //       }
    //       if(Variables.connection_selected != null) {
    //         Variables.connection_selected.classList.remove("selected");
    //         this.removeReouteConnectionSelected();
    //         Variables.connection_selected = null;
    //       }
    //       Variables.connection_selected = Variables.ele_selected;
    //       Variables.connection_selected.classList.add("selected");
    //       const listclassConnection = Variables.connection_selected.parentElement.classList;
    //       this.Dispatch('connectionSelected', { output_id: listclassConnection[2].slice(14), input_id: listclassConnection[1].slice(13), output_class: listclassConnection[3], input_class: listclassConnection[4] });
    //       if(Variables.reroute_fix_curvature) {
    //         Variables.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
    //           item.classList.add("selected");
    //         });
    //       }
    //     break;
    //     case 'point':
    //         Variables.drag_point = true;
    //         Variables.ele_selected.classList.add("selected");
    //     break;
    //     case 'drawflow-delete':
    //       if(Variables.node_selected ) {
    //         this.removeNodeId(Variables.node_selected.id);
    //       }
    //       if(Variables.connection_selected) {
    //         this.removeConnection();
    //       }
    //       if(Variables.node_selected != null) {
    //         Variables.node_selected.classList.remove("selected");
    //         Variables.node_selected = null;
    //         this.Dispatch('nodeUnselected', true);
    //       }
    //       if(Variables.connection_selected != null) {
    //         Variables.connection_selected.classList.remove("selected");
    //         this.removeReouteConnectionSelected();
    //         Variables.connection_selected = null;
    //       }
    //     break;
    //     default:
    //   }
    //   if (e.type === "touchstart") {
    //     Variables.pos_x = e.touches[0].clientX;
    //     Variables.pos_x_start = e.touches[0].clientX;
    //     Variables.pos_y = e.touches[0].clientY;
    //     Variables.pos_y_start = e.touches[0].clientY;
    //   } else {
    //     Variables.pos_x = e.clientX;
    //     Variables.pos_x_start = e.clientX;
    //     Variables.pos_y = e.clientY;
    //     Variables.pos_y_start = e.clientY;
    //   }
    //   this.Dispatch('clickEnd', e);
    // }
    // position(e: any) {
    //   if (e.type === "touchmove") {
    //     var e_pos_x = e.touches[0].clientX;
    //     var e_pos_y = e.touches[0].clientY;
    //   } else {
    //     var e_pos_x = e.clientX;
    //     var e_pos_y = e.clientY;
    //   }
    //   if(Variables.connection) {
    //     this.updateConnection(e_pos_x, e_pos_y);
    //   }
    //   if(Variables.editor_selected) {
    //     x =  Variables.canvas_x + (-(Variables.pos_x - e_pos_x))
    //     y = Variables.canvas_y + (-(Variables.pos_y - e_pos_y))
    //     this.Dispatch('translate', { x: x, y: y});
    //     Variables.precanvas.style.transform = "translate("+x+"px, "+y+"px) scale("+Variables.zoom+")";
    //   }
    //   if(Variables.drag) {
    //     var x = (Variables.pos_x - e_pos_x) * Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom);
    //     var y = (Variables.pos_y - e_pos_y) * Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom);
    //     Variables.pos_x = e_pos_x;
    //     Variables.pos_y = e_pos_y;
    //     Variables.ele_selected.style.top = (Variables.ele_selected.offsetTop - y) + "px";
    //     Variables.ele_selected.style.left = (Variables.ele_selected.offsetLeft - x) + "px";
    //     this.activeModule(Variables.module).Data[Variables.ele_selected.id.slice(5)].pos_x = (Variables.ele_selected.offsetLeft - x);
    //     this.activeModule(Variables.module).Data[Variables.ele_selected.id.slice(5)].pos_y = (Variables.ele_selected.offsetTop - y);
    //     this.updateConnectionNodes(Variables.ele_selected.id)
    //   }
    //   if(Variables.drag_point) {
    //     var x = (Variables.pos_x - e_pos_x) * Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom);
    //     var y = (Variables.pos_y - e_pos_y) * Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom);
    //     Variables.pos_x = e_pos_x;
    //     Variables.pos_y = e_pos_y;
    //     var pos_x = Variables.pos_x * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().x * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)));
    //     var pos_y = Variables.pos_y * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().y * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)));
    //     Variables.ele_selected.setAttributeNS(null, 'cx', pos_x);
    //     Variables.ele_selected.setAttributeNS(null, 'cy', pos_y);
    //     const nodeUpdate = Variables.ele_selected.parentElement.classList[2].slice(9);
    //     const nodeUpdateIn = Variables.ele_selected.parentElement.classList[1].slice(13);
    //     const output_class = Variables.ele_selected.parentElement.classList[3];
    //     const input_class = Variables.ele_selected.parentElement.classList[4];
    //     let numberPointPosition = Array.from(Variables.ele_selected.parentElement.children).indexOf(Variables.ele_selected)-1;
    //     if(Variables.reroute_fix_curvature) {
    //       const numberMainPath = Variables.ele_selected.parentElement.querySelectorAll(".main-path").length-1;
    //       numberPointPosition -= numberMainPath;
    //       if(numberPointPosition < 0) {
    //         numberPointPosition = 0;
    //       }
    //     }
    //     const nodeId = nodeUpdate.slice(5);
    //     const searchConnection = this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections.findIndex(function(item: any,i: any) {
    //       return item.node ===  nodeUpdateIn && item.output === input_class;
    //     });
    //     this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points[numberPointPosition] = { pos_x: pos_x, pos_y: pos_y };
    //     const parentSelected = Variables.ele_selected.parentElement.classList[2].slice(9);
    //     this.updateConnectionNodes(parentSelected);
    //   }
    //   if (e.type === "touchmove") {
    //     Variables.mouse_x = e_pos_x;
    //     Variables.mouse_y = e_pos_y;
    //   }
    //   this.Dispatch('mouseMove', {x: e_pos_x,y: e_pos_y });
    // }
    // dragEnd(e: any) {
    //     let e_pos_x: number;
    //     let e_pos_y: number;
    //     let ele_last: any;
    //     let input_class: any;
    //   if (e.type === "touchend") {
    //     e_pos_x = Variables.mouse_x;
    //     e_pos_y = Variables.mouse_y;
    //     ele_last = document.elementFromPoint(e_pos_x, e_pos_y);
    //   } else {
    //     e_pos_x = e.clientX;
    //     e_pos_y = e.clientY;
    //     ele_last = e.target;
    //   }
    //   if(Variables.drag) {
    //     if(Variables.pos_x_start != e_pos_x || Variables.pos_y_start != e_pos_y) {
    //       this.Dispatch('nodeMoved', Variables.ele_selected.id.slice(5));
    //     }
    //   }
    //   if(Variables.drag_point) {
    //     Variables.ele_selected.classList.remove("selected");
    //       if(Variables.pos_x_start != e_pos_x || Variables.pos_y_start != e_pos_y) {
    //         this.Dispatch('rerouteMoved', Variables.ele_selected.parentElement.classList[2].slice(14));
    //       }
    //   }
    //   if(Variables.editor_selected) {
    //     Variables.canvas_x = Variables.canvas_x + (-(Variables.pos_x - e_pos_x));
    //     Variables.canvas_y = Variables.canvas_y + (-(Variables.pos_y - e_pos_y));
    //     Variables.editor_selected = false;
    //   }
    //   if(Variables.connection === true) {
    //     if(ele_last.classList[0] === 'input' || (Variables.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node'))) {
    //       if(Variables.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node')) {
    //         if(ele_last.closest(".drawflow_content_node") != null) {
    //           var input_id = ele_last.closest(".drawflow_content_node").parentElement.id;
    //         } else {
    //           var input_id = ele_last.id;
    //         }
    //        if(Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0) {
    //          input_class = false;
    //        } else {
    //         input_class = "input_1";
    //        }
    //      } else {
    //        // Fix connection;
    //        var input_id = ele_last.parentElement.parentElement.id;
    //        input_class = ele_last.classList[1];
    //      }
    //      var output_id = Variables.ele_selected.parentElement.parentElement.id;
    //      var output_class = Variables.ele_selected.classList[1];
    //       if(output_id !== input_id && input_class !== false) {
    //         if(Variables.container.querySelectorAll('.connection.node_in_'+input_id+'.node_out_'+output_id+'.'+output_class+'.'+input_class).length === 0) {
    //         // Conection no exist save connection
    //         Variables.connection_ele.classList.add("node_in_"+input_id);
    //         Variables.connection_ele.classList.add("node_out_"+output_id);
    //         Variables.connection_ele.classList.add(output_class);
    //         Variables.connection_ele.classList.add(input_class);
    //         var id_input = input_id.slice(5);
    //         var id_output = output_id.slice(5);
    //         this.activeModule(Variables.module).Data[id_output].outputs[output_class].connections.push( {"node": id_input, "output": input_class});
    //         this.activeModule(Variables.module).Data[id_input].inputs[input_class].connections.push( {"node": id_output, "input": output_class});
    //         this.updateConnectionNodes('node-'+id_output);
    //         this.updateConnectionNodes('node-'+id_input);
    //         this.Dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class:  output_class, input_class: input_class});
    //       } else {
    //         this.Dispatch('connectionCancel', true);
    //         Variables.connection_ele.remove();
    //       }
    //         Variables.connection_ele = null;
    //     } else {
    //       // Connection exists Remove Connection;
    //       this.Dispatch('connectionCancel', true);
    //       Variables.connection_ele.remove();
    //       Variables.connection_ele = null;
    //     }
    //     } else {
    //       // Remove Connection;
    //       this.Dispatch('connectionCancel', true);
    //       Variables.connection_ele.remove();
    //       Variables.connection_ele = null;
    //     }
    //   }
    //   Variables.drag = false;
    //   Variables.drag_point = false;
    //   Variables.connection = false;
    //   Variables.ele_selected = null;
    //   Variables.editor_selected = false;
    // }
    // contextmenu(e: any) {
    //   this.Dispatch('contextmenu', e);
    //   e.preventDefault();
    //   if(Variables.editor_mode === 'fixed' || Variables.editor_mode === 'view') {
    //     return false;
    //   }
    //   if(Variables.precanvas.getElementsByClassName("drawflow-delete").length) {
    //     Variables.precanvas.getElementsByClassName("drawflow-delete")[0].remove()
    //   };
    //   if(Variables.node_selected || Variables.connection_selected) {
    //     var deletebox = document.createElement('div');
    //     deletebox.classList.add("drawflow-delete");
    //     deletebox.innerHTML = "x";
    //     if(Variables.node_selected) {
    //       Variables.node_selected.appendChild(deletebox);
    //     }
    //     if(Variables.connection_selected) {
    //       deletebox.style.top = e.clientY * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().y *  ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) ) + "px";
    //       deletebox.style.left = e.clientX * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().x *  ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) ) + "px";
    //       Variables.precanvas.appendChild(deletebox);
    //     }
    //   }
    // }
    // contextmenuDel() {
    //   if(Variables.precanvas.getElementsByClassName("drawflow-delete").length) {
    //     Variables.precanvas.getElementsByClassName("drawflow-delete")[0].remove()
    //   };
    // }
    // key(e: any) {
    //   this.Dispatch('keydown', e);
    //   if(Variables.editor_mode === 'fixed' || Variables.editor_mode === 'view') {
    //     return false;
    //   }
    //   if (e.key === 'Delete' || (e.key === 'Backspace' && e.metaKey)) {
    //     if(Variables.node_selected != null) {
    //       if(Variables.first_click.tagName !== 'INPUT' && Variables.first_click.tagName !== 'TEXTAREA' && Variables.first_click.hasAttribute('contenteditable') !== true) {
    //         this.removeNodeId(Variables.node_selected.id);
    //       }
    //     }
    //     if(Variables.connection_selected != null) {
    //       this.removeConnection();
    //     }
    //   }
    // }
    // public zoom_enter(event: any, delta: any): void {
    //   if (event.ctrlKey) {
    //     event.preventDefault()
    //     if(event.deltaY > 0) {
    //       // Zoom Out
    //       this.zoom_out();
    //     } else {
    //       // Zoom In
    //       this.zoom_in();
    //     }
    //   }
    // }
    // zoom_refresh(){
    //   this.Dispatch('zoom', Variables.zoom);
    //   Variables.canvas_x = (Variables.canvas_x / Variables.zoom_last_value) * Variables.zoom;
    //   Variables.canvas_y = (Variables.canvas_y / Variables.zoom_last_value) * Variables.zoom;
    //   Variables.zoom_last_value = Variables.zoom;
    //   Variables.precanvas.style.transform = "translate("+Variables.canvas_x+"px, "+Variables.canvas_y+"px) scale("+Variables.zoom+")";
    // }
    // zoom_in() {
    //   if(Variables.zoom < Variables.zoom_max) {
    //       Variables.zoom+=Variables.zoom_value;
    //       this.zoom_refresh();
    //   }
    // }
    // zoom_out() {
    //   if(Variables.zoom > Variables.zoom_min) {
    //     Variables.zoom-=Variables.zoom_value;
    //       this.zoom_refresh();
    //   }
    // }
    // zoom_reset(){
    //   if(Variables.zoom != 1) {
    //     Variables.zoom = 1;
    //     this.zoom_refresh();
    //   }
    // }
    // createCurvature(start_pos_x: any, start_pos_y: any, end_pos_x: any, end_pos_y: any, curvature_value: any, type: any) {
    //   var line_x = start_pos_x;
    //   var line_y = start_pos_y;
    //   var x = end_pos_x;
    //   var y = end_pos_y;
    //   var curvature = curvature_value;
    //   //type openclose open close other
    //   switch (type) {
    //     case 'open':
    //       if(start_pos_x >= end_pos_x) {
    //         var hx1 = line_x + Math.abs(x - line_x) * curvature;
    //         var hx2 = x - Math.abs(x - line_x) * (curvature*-1);
    //       } else {
    //         var hx1 = line_x + Math.abs(x - line_x) * curvature;
    //         var hx2 = x - Math.abs(x - line_x) * curvature;
    //       }
    //       return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
    //       break
    //     case 'close':
    //       if(start_pos_x >= end_pos_x) {
    //         var hx1 = line_x + Math.abs(x - line_x) * (curvature*-1);
    //         var hx2 = x - Math.abs(x - line_x) * curvature;
    //       } else {
    //         var hx1 = line_x + Math.abs(x - line_x) * curvature;
    //         var hx2 = x - Math.abs(x - line_x) * curvature;
    //       }
    //       return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
    //       break;
    //     case 'other':
    //       if(start_pos_x >= end_pos_x) {
    //         var hx1 = line_x + Math.abs(x - line_x) * (curvature*-1);
    //         var hx2 = x - Math.abs(x - line_x) * (curvature*-1);
    //       } else {
    //         var hx1 = line_x + Math.abs(x - line_x) * curvature;
    //         var hx2 = x - Math.abs(x - line_x) * curvature;
    //       }
    //       return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
    //       break;
    //     default:
    //       var hx1 = line_x + Math.abs(x - line_x) * curvature;
    //       var hx2 = x - Math.abs(x - line_x) * curvature;
    //       return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
    //   }
    // }
    // drawConnection(ele: any) {
    //   var connection = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    //   Variables.connection_ele = connection;
    //   var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    //   path.classList.add("main-path");
    //   path.setAttributeNS(null, 'd', '');
    //   // path.innerHTML = 'a';
    //   connection.classList.add("connection");
    //   connection.appendChild(path);
    //   Variables.precanvas.appendChild(connection);
    //   var id_output = ele.parentElement.parentElement.id.slice(5);
    //   var output_class = ele.classList[1];
    //   this.Dispatch('connectionStart', { output_id: id_output, output_class:  output_class });
    // }
    // updateConnection(eX: any, eY: any) {
    //   const precanvas = Variables.precanvas;
    //   const zoom = Variables.zoom;
    //   let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
    //   precanvasWitdhZoom = precanvasWitdhZoom || 0;
    //   let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
    //   precanvasHeightZoom = precanvasHeightZoom || 0;
    //   var path = Variables.connection_ele.children[0];
    //   var line_x = Variables.ele_selected.offsetWidth/2 + (Variables.ele_selected.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //   var line_y = Variables.ele_selected.offsetHeight/2 + (Variables.ele_selected.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //   var x = eX * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().x *  ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) );
    //   var y = eY * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().y *  ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) );
    //   var curvature = Variables.curvature;
    //   var lineCurve = this.createCurvature(line_x, line_y, x, y, curvature, 'openclose');
    //   path.setAttributeNS(null, 'd', lineCurve);
    // }
    // addConnection(id_output: any, id_input: any, output_class: any, input_class: any) {
    //   var nodeOneModule: any = this.getModuleFromNodeId(id_output);
    //   var nodeTwoModule: any = this.getModuleFromNodeId(id_input);
    //   if(nodeOneModule === nodeTwoModule) {
    //     var dataNode = this.getNodeFromId(id_output);
    //     var exist = false;
    //     for(var checkOutput in dataNode.outputs[output_class].connections){
    //       var connectionSearch = dataNode.outputs[output_class].connections[checkOutput]
    //       if(connectionSearch.node == id_input && connectionSearch.output == input_class) {
    //           exist = true;
    //       }
    //     }
    //     // Check connection exist
    //     if(exist === false) {
    //       //Create Connection
    //       this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.push( {"node": id_input.toString(), "output": input_class});
    //       this.activeModule(nodeOneModule).data[id_input].inputs[input_class].connections.push( {"node": id_output.toString(), "input": output_class});
    //       if(Variables.module === nodeOneModule) {
    //       //Draw connection
    //         var connection = document.createElementNS('http://www.w3.org/2000/svg',"svg");
    //         var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    //         path.classList.add("main-path");
    //         path.setAttributeNS(null, 'd', '');
    //         // path.innerHTML = 'a';
    //         connection.classList.add("connection");
    //         connection.classList.add("node_in_node-"+id_input);
    //         connection.classList.add("node_out_node-"+id_output);
    //         connection.classList.add(output_class);
    //         connection.classList.add(input_class);
    //         connection.appendChild(path);
    //         Variables.precanvas.appendChild(connection);
    //         this.updateConnectionNodes('node-'+id_output);
    //         this.updateConnectionNodes('node-'+id_input);
    //       }
    //       this.Dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class:  output_class, input_class: input_class});
    //     }
    //   }
    // }
    // updateConnectionNodes(id: any) {
    //   // Aquí nos quedamos;
    //   const idSearch = 'node_in_'+id;
    //   const idSearchOut = 'node_out_'+id;
    //   var line_path = Variables.line_path/2;
    //   const container = Variables.container;
    //   const precanvas = Variables.precanvas;
    //   const curvature = Variables.curvature;
    //   const createCurvature = this.createCurvature;
    //   const reroute_curvature = Variables.reroute_curvature;
    //   const reroute_curvature_start_end = Variables.reroute_curvature_start_end;
    //   const reroute_fix_curvature = Variables.reroute_fix_curvature;
    //   const rerouteWidth = Variables.reroute_width;
    //   const zoom = Variables.zoom;
    //   let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
    //   precanvasWitdhZoom = precanvasWitdhZoom || 0;
    //   let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
    //   precanvasHeightZoom = precanvasHeightZoom || 0;
    //   const elemsOut = container.querySelectorAll(`.${idSearchOut}`);
    //   Object.keys(elemsOut).map(function(item: any, index) {
    //     if(elemsOut[item].querySelector('.point') === null) {
    //       var elemtsearchId_out: any = container.querySelector(`#${id}`);
    //       var id_search = elemsOut[item].classList[1].replace('node_in_', '');
    //       var elemtsearchId: any = container.querySelector(`#${id_search}`);
    //       var elemtsearch = elemtsearchId.querySelectorAll('.'+elemsOut[item].classList[4])[0]
    //       var eX = elemtsearch.offsetWidth/2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //       var eY = elemtsearch.offsetHeight/2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //       var elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+elemsOut[item].classList[3])[0]
    //       var line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //       var line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //       var x = eX;
    //       var y = eY;
    //       const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
    //       elemsOut[item].children[0].setAttributeNS(null, 'd', lineCurve );
    //     } else {
    //       const points = elemsOut[item].querySelectorAll('.point');
    //       let linecurve = '';
    //       const reoute_fix: Array<any> = [];
    //       points.forEach((item: any, i: any) => {
    //         if(i === 0 && ((points.length -1) === 0)) {
    //           var elemtsearchId_out: any = container.querySelector(`#${id}`);
    //           var elemtsearch = item;
    //           var eX =  (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var eY =  (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0]
    //           var line_x: any =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //           var line_y: any =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //           var elemtsearchId_out = item;
    //           var id_search = item.parentElement.classList[1].replace('node_in_', '');
    //           var elemtsearchId: any = container.querySelector(`#${id_search}`);
    //           var elemtsearch: any = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
    //           var elemtsearchIn: any = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
    //           var eX: any =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //           var eY: any =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //           var line_x: any = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var line_y: any = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //         } else if(i === 0) {
    //           var elemtsearchId_out: any = container.querySelector(`#${id}`);
    //           var elemtsearch = item;
    //           var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0]
    //           var line_x: any =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //           var line_y: any =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //           // SECOND
    //           var elemtsearchId_out = item;
    //           var elemtsearch: any = points[i+1];
    //           var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //         } else if (i === (points.length -1)) {
    //           var elemtsearchId_out = item;
    //           var id_search = item.parentElement.classList[1].replace('node_in_', '');
    //           var elemtsearchId: any = container.querySelector(`#${id_search}`);
    //           var elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
    //           var elemtsearchIn = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
    //           var eX: any =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //           var eY: any =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //           var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
    //           var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //         } else {
    //           var elemtsearchId_out = item;
    //           var elemtsearch: any = points[i+1];
    //           var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
    //           var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) +rerouteWidth;
    //           var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
    //           var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //         }
    //       });
    //       if(reroute_fix_curvature) {
    //         reoute_fix.forEach((itempath, i) => {
    //           elemsOut[item].children[i].setAttributeNS(null, 'd', itempath);
    //         });
    //       } else {
    //         elemsOut[item].children[0].setAttributeNS(null, 'd', linecurve);
    //       }
    //     }
    //   })
    //   const elems = container.querySelectorAll(`.${idSearch}`);
    //   Object.keys(elems).map(function(item: any, index) {
    //     if(elems[item].querySelector('.point') === null) {
    //       var elemtsearchId_in: any = container.querySelector(`#${id}`);
    //       var id_search = elems[item].classList[2].replace('node_out_', '');
    //       var elemtsearchId: any = container.querySelector(`#${id_search}`);
    //       var elemtsearch = elemtsearchId.querySelectorAll('.'+elems[item].classList[3])[0]
    //       var line_x = elemtsearch.offsetWidth/2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //       var line_y = elemtsearch.offsetHeight/2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //       var elemtsearchId_in = elemtsearchId_in.querySelectorAll('.'+elems[item].classList[4])[0]
    //       var x = elemtsearchId_in.offsetWidth/2 + (elemtsearchId_in.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //       var y = elemtsearchId_in.offsetHeight/2 + (elemtsearchId_in.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //       const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
    //       elems[item].children[0].setAttributeNS(null, 'd', lineCurve );
    //     } else {
    //       const points = elems[item].querySelectorAll('.point');
    //       let linecurve = '';
    //       const reoute_fix: Array<any> = [];
    //       points.forEach((item: any, i: any) => {
    //           let eX: any;
    //           let eY: any;
    //         if(i === 0 && ((points.length -1) === 0)) {
    //           var elemtsearchId_out: any = container.querySelector(`#${id}`);
    //           var elemtsearch = item;
    //           var line_x = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var line_y = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
    //           var elemtsearchIn = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[4])[0]
    //           eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //           eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //           var elemtsearchId_out = item;
    //           var id_search = item.parentElement.classList[2].replace('node_out_', '');
    //           var elemtsearchId: any = container.querySelector(`#${id_search}`);
    //           var elemtsearch: any = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
    //           var elemtsearchOut = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
    //           var line_x: any =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //           var line_y: any =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //           eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //         } else if(i === 0) {
    //           // FIRST
    //           var elemtsearchId_out = item;
    //           var id_search = item.parentElement.classList[2].replace('node_out_', '');
    //           var elemtsearchId: any = container.querySelector(`#${id_search}`);
    //           var elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
    //           var elemtsearchOut = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
    //           var line_x: any =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //           var line_y: any =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //           eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //           // SECOND
    //           var elemtsearchId_out = item;
    //           var elemtsearch: any = points[i+1];
    //           eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
    //           var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //         } else if (i === (points.length -1)) {
    //           var elemtsearchId_out = item;
    //           var id_search = item.parentElement.classList[1].replace('node_in_', '');
    //           var elemtsearchId: any = container.querySelector(`#${id_search}`);
    //           var elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
    //           var elemtsearchIn = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
    //           eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
    //           eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    //           var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //         } else {
    //           var elemtsearchId_out = item;
    //           var elemtsearch: any = points[i+1];
    //           eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
    //           var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
    //           var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
    //           var x = eX;
    //           var y = eY;
    //           var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
    //           linecurve += lineCurveSearch;
    //           reoute_fix.push(lineCurveSearch);
    //         }
    //       });
    //       if(reroute_fix_curvature) {
    //         reoute_fix.forEach((itempath, i) => {
    //           elems[item].children[i].setAttributeNS(null, 'd', itempath);
    //         });
    //       } else {
    //         elems[item].children[0].setAttributeNS(null, 'd', linecurve);
    //       }
    //     }
    //   })
    // }
    // dblclick(e: any) {
    //   if(Variables.connection_selected != null && Variables.reroute) {
    //       this.createReroutePoint(Variables.connection_selected);
    //   }
    //   if(e.target.classList[0] === 'point') {
    //       this.removeReroutePoint(e.target);
    //   }
    // }
    // createReroutePoint(ele: any) {
    //     Variables.connection_selected.classList.remove("selected");
    //     const nodeUpdate = Variables.connection_selected.parentElement.classList[2].slice(9);
    //     const nodeUpdateIn = Variables.connection_selected.parentElement.classList[1].slice(13);
    //     const output_class = Variables.connection_selected.parentElement.classList[3];
    //     const input_class = Variables.connection_selected.parentElement.classList[4];
    //     Variables.connection_selected = null;
    //     const point = document.createElementNS('http://www.w3.org/2000/svg',"circle");
    //     point.classList.add("point");
    //     var pos_x: any = Variables.pos_x * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().x * ( Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)));
    //     var pos_y: any = Variables.pos_y * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().y * ( Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)));
    //     point.setAttributeNS(null, 'cx', pos_x);
    //     point.setAttributeNS(null, 'cy', pos_y);
    //     point.setAttributeNS(null, 'r', Variables.reroute_width);
    //     let position_add_array_point = 0;
    //     if(Variables.reroute_fix_curvature) {
    //       const numberPoints = ele.parentElement.querySelectorAll(".main-path").length;
    //       var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    //       path.classList.add("main-path");
    //       path.setAttributeNS(null, 'd', '');
    //       ele.parentElement.insertBefore(path, ele.parentElement.children[numberPoints]);
    //       if(numberPoints === 1) {
    //         ele.parentElement.appendChild(point);
    //       }  else {
    //         const search_point = Array.from(ele.parentElement.children).indexOf(ele)
    //         position_add_array_point = search_point;
    //         ele.parentElement.insertBefore(point, ele.parentElement.children[search_point+numberPoints+1]);
    //       }
    //     } else {
    //       ele.parentElement.appendChild(point);
    //     }
    //     const nodeId = nodeUpdate.slice(5);
    //     const searchConnection = this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections.findIndex(function(item: any,i: any) {
    //       return item.node ===  nodeUpdateIn && item.output === input_class;
    //     });
    //     if(this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points === undefined)  {
    //         this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points = [];
    //     }
    //     if(Variables.reroute_fix_curvature) {
    //       //console.log(position_add_array_point)
    //       if(position_add_array_point > 0) {
    //         this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points.splice(position_add_array_point, 0, { pos_x: pos_x, pos_y: pos_y });
    //       } else {
    //         this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
    //       }
    //       ele.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
    //         item.classList.remove("selected");
    //       });
    //     } else {
    //         this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
    //     }
    //     this.Dispatch('addReroute', nodeId);
    //     this.updateConnectionNodes(nodeUpdate);
    // }
    // removeReroutePoint(ele: any) {
    //   const nodeUpdate = ele.parentElement.classList[2].slice(9)
    //   const nodeUpdateIn = ele.parentElement.classList[1].slice(13);
    //   const output_class = ele.parentElement.classList[3];
    //   const input_class = ele.parentElement.classList[4];
    //   let numberPointPosition = Array.from(ele.parentElement.children).indexOf(ele)-1;
    //   const nodeId = nodeUpdate.slice(5);
    //   const searchConnection = this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections.findIndex(function(item: any,i: any) {
    //     return item.node ===  nodeUpdateIn && item.output === input_class;
    //   });
    //   if(Variables.reroute_fix_curvature) {
    //      const numberMainPath = ele.parentElement.querySelectorAll(".main-path").length
    //      ele.parentElement.children[numberMainPath-1].remove();
    //      numberPointPosition -= numberMainPath;
    //      if(numberPointPosition < 0) {
    //        numberPointPosition = 0;
    //      }
    //   }
    //   this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points.splice(numberPointPosition,1);
    //   ele.remove();
    //   this.Dispatch('removeReroute', nodeId);
    //   this.updateConnectionNodes(nodeUpdate);
    // }
    registerNode(name, html, props = null, options = null) {
        variables_js_1.Variables.noderegister[name] = { html: html, props: props, options: options };
    }
    // getNodeFromId(id: any) {
    //   var moduleName: any = this.getModuleFromNodeId(id)
    //   return JSON.parse(JSON.stringify(this.activeModule(Variables.module).Data[id]));
    // }
    // getNodesFromName(name: any) {
    //   var nodes: Array<any> = [];
    //   const editor: any = this.activeModule(Variables.module)
    //   Object.keys(editor).map(function(moduleName, index) {
    //     for (var node in editor[moduleName].data) {
    //       if(editor[moduleName].data[node].name == name) {
    //         nodes.push(editor[moduleName].data[node].id);
    //       }
    //     }
    //   });
    //   return nodes;
    // }
    addNode(name, num_in, num_out, ele_pos_x, ele_pos_y, classoverride, data, html, typenode = false) {
        let newNodeId;
        if (variables_js_1.Variables.useuuid) {
            newNodeId = this.getUuid();
        }
        else {
            newNodeId = variables_js_1.Variables.nodeId;
        }
        const parent = document.createElement('div');
        parent.classList.add("parent-node");
        const node = document.createElement('div');
        node.innerHTML = "";
        node.setAttribute("id", "node-" + newNodeId);
        node.classList.add("drawflow-node");
        if (classoverride != '') {
            node.classList.add(classoverride);
        }
        const inputs = document.createElement('div');
        inputs.classList.add("inputs");
        const outputs = document.createElement('div');
        outputs.classList.add("outputs");
        const json_inputs = {};
        for (var x = 0; x < num_in; x++) {
            const input = document.createElement('div');
            input.classList.add("input");
            input.classList.add("input_" + (x + 1));
            json_inputs["input_" + (x + 1)] = { "connections": [] };
            inputs.appendChild(input);
        }
        const json_outputs = {};
        for (var x = 0; x < num_out; x++) {
            const output = document.createElement('div');
            output.classList.add("output");
            output.classList.add("output_" + (x + 1));
            json_outputs["output_" + (x + 1)] = { "connections": [] };
            outputs.appendChild(output);
        }
        const content = document.createElement('div');
        content.classList.add("drawflow_content_node");
        if (typenode === false) {
            content.innerHTML = html;
        }
        else if (typenode === true) {
            content.appendChild(variables_js_1.Variables.noderegister[html].html.cloneNode(true));
        }
        else {
            if (parseInt(variables_js_1.Variables.render.version) === 3) {
                //Vue 3
                let wrapper = variables_js_1.Variables.render.createApp({
                    parent: variables_js_1.Variables.parent,
                    render: (h) => variables_js_1.Variables.render.h(variables_js_1.Variables.noderegister[html].html, variables_js_1.Variables.noderegister[html].props, variables_js_1.Variables.noderegister[html].options)
                }).mount(content);
            }
            else {
                // Vue 2
                let wrapper = new variables_js_1.Variables.render(Object.assign({ parent: variables_js_1.Variables.parent, render: (h) => h(variables_js_1.Variables.noderegister[html].html, { props: variables_js_1.Variables.noderegister[html].props }) }, variables_js_1.Variables.noderegister[html].options)).$mount();
                //
                content.appendChild(wrapper.$el);
            }
        }
        Object.entries(data).forEach(function (key, value) {
            if (typeof key[1] === "object") {
                insertObjectkeys(null, key[0], key[0]);
            }
            else {
                var elems = content.querySelectorAll('[df-' + key[0] + ']');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].value = key[1];
                }
            }
        });
        function insertObjectkeys(object, name, completname) {
            if (object === null) {
                var object = data[name];
            }
            else {
                var object = object[name];
            }
            if (object !== null) {
                Object.entries(object).forEach(function (key, value) {
                    if (typeof key[1] === "object") {
                        insertObjectkeys(object, key[0], completname + '-' + key[0]);
                    }
                    else {
                        var elems = content.querySelectorAll('[df-' + completname + '-' + key[0] + ']');
                        for (var i = 0; i < elems.length; i++) {
                            elems[i].value = key[1];
                        }
                    }
                });
            }
        }
        node.appendChild(inputs);
        node.appendChild(content);
        node.appendChild(outputs);
        node.style.top = ele_pos_y + "px";
        node.style.left = ele_pos_x + "px";
        parent.appendChild(node);
        variables_js_1.Variables.precanvas.appendChild(parent);
        var json = {
            id: newNodeId,
            name: name,
            data: data,
            class: classoverride,
            html: html,
            typenode: typenode,
            inputs: json_inputs,
            outputs: json_outputs,
            pos_x: ele_pos_x,
            pos_y: ele_pos_y,
        };
        this.activeModule(variables_js_1.Variables.module).Data[newNodeId] = json;
        this.Dispatch('nodeCreated', newNodeId);
        if (!variables_js_1.Variables.useuuid) {
            variables_js_1.Variables.nodeId++;
        }
        return newNodeId;
    }
    addNodeImport(dataNode, precanvas) {
        const parent = document.createElement('div');
        parent.classList.add("parent-node");
        const node = document.createElement('div');
        node.innerHTML = "";
        node.setAttribute("id", "node-" + dataNode.id);
        node.classList.add("drawflow-node");
        if (dataNode.class != '') {
            node.classList.add(dataNode.class);
        }
        const inputs = document.createElement('div');
        inputs.classList.add("inputs");
        const outputs = document.createElement('div');
        outputs.classList.add("outputs");
        Object.keys(dataNode.inputs).map(function (input_item, index) {
            const input = document.createElement('div');
            input.classList.add("input");
            input.classList.add(input_item);
            inputs.appendChild(input);
            Object.keys(dataNode.inputs[input_item].connections).map(function (output_item, index) {
                var connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                path.classList.add("main-path");
                path.setAttributeNS(null, 'd', '');
                // path.innerHTML = 'a';
                connection.classList.add("connection");
                connection.classList.add("node_in_node-" + dataNode.id);
                connection.classList.add("node_out_node-" + dataNode.inputs[input_item].connections[output_item].node);
                connection.classList.add(dataNode.inputs[input_item].connections[output_item].input);
                connection.classList.add(input_item);
                connection.appendChild(path);
                precanvas.appendChild(connection);
            });
        });
        for (var x = 0; x < Object.keys(dataNode.outputs).length; x++) {
            const output = document.createElement('div');
            output.classList.add("output");
            output.classList.add("output_" + (x + 1));
            outputs.appendChild(output);
        }
        const content = document.createElement('div');
        content.classList.add("drawflow_content_node");
        if (dataNode.typenode === false) {
            content.innerHTML = dataNode.html;
        }
        else if (dataNode.typenode === true) {
            content.appendChild(variables_js_1.Variables.noderegister[dataNode.html].html.cloneNode(true));
        }
        else {
            if (parseInt(variables_js_1.Variables.render.version) === 3) {
                //Vue 3
                let wrapper = variables_js_1.Variables.render.createApp({
                    parent: variables_js_1.Variables.parent,
                    render: (h) => variables_js_1.Variables.render.h(variables_js_1.Variables.noderegister[dataNode.html].html, variables_js_1.Variables.noderegister[dataNode.html].props, variables_js_1.Variables.noderegister[dataNode.html].options)
                }).mount(content);
            }
            else {
                //Vue 2
                let wrapper = new variables_js_1.Variables.render(Object.assign({ parent: variables_js_1.Variables.parent, render: (h) => h(variables_js_1.Variables.noderegister[dataNode.html].html, { props: variables_js_1.Variables.noderegister[dataNode.html].props }) }, variables_js_1.Variables.noderegister[dataNode.html].options)).$mount();
                content.appendChild(wrapper.$el);
            }
        }
        Object.entries(dataNode.data).forEach(function (key, value) {
            if (typeof key[1] === "object") {
                insertObjectkeys(null, key[0], key[0]);
            }
            else {
                var elems = content.querySelectorAll('[df-' + key[0] + ']');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].value = key[1];
                }
            }
        });
        function insertObjectkeys(object, name, completname) {
            if (object === null) {
                var object = dataNode.data[name];
            }
            else {
                var object = object[name];
            }
            if (object !== null) {
                Object.entries(object).forEach(function (key, value) {
                    if (typeof key[1] === "object") {
                        insertObjectkeys(object, key[0], completname + '-' + key[0]);
                    }
                    else {
                        var elems = content.querySelectorAll('[df-' + completname + '-' + key[0] + ']');
                        for (var i = 0; i < elems.length; i++) {
                            elems[i].value = key[1];
                        }
                    }
                });
            }
        }
        node.appendChild(inputs);
        node.appendChild(content);
        node.appendChild(outputs);
        node.style.top = dataNode.pos_y + "px";
        node.style.left = dataNode.pos_x + "px";
        parent.appendChild(node);
        variables_js_1.Variables.precanvas.appendChild(parent);
    }
    addRerouteImport(dataNode) {
        const reroute_width = variables_js_1.Variables.reroute_width;
        const reroute_fix_curvature = variables_js_1.Variables.reroute_fix_curvature;
        const container = variables_js_1.Variables.container;
        Object.keys(dataNode.outputs).map(function (output_item, index) {
            Object.keys(dataNode.outputs[output_item].connections).map(function (input_item, index) {
                const points = dataNode.outputs[output_item].connections[input_item].points;
                if (points !== undefined) {
                    points.forEach((item, i) => {
                        const input_id = dataNode.outputs[output_item].connections[input_item].node;
                        const input_class = dataNode.outputs[output_item].connections[input_item].output;
                        const ele = container.querySelector('.connection.node_in_node-' + input_id + '.node_out_node-' + dataNode.id + '.' + output_item + '.' + input_class);
                        if (reroute_fix_curvature) {
                            if (i === 0) {
                                for (var z = 0; z < points.length; z++) {
                                    var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                                    path.classList.add("main-path");
                                    path.setAttributeNS(null, 'd', '');
                                    ele.appendChild(path);
                                }
                            }
                        }
                        const point = document.createElementNS('http://www.w3.org/2000/svg', "circle");
                        point.classList.add("point");
                        var pos_x = item.pos_x;
                        var pos_y = item.pos_y;
                        point.setAttributeNS(null, 'cx', pos_x);
                        point.setAttributeNS(null, 'cy', pos_y);
                        point.setAttributeNS(null, 'r', reroute_width);
                        ele.appendChild(point);
                    });
                }
                ;
            });
        });
    }
    // updateNodeValue(event: any) {
    //   var attr = event.target.attributes
    //   for (var i = 0; i < attr.length; i++) {
    //           if (attr[i].nodeName.startsWith('df-')) {
    //               var keys = attr[i].nodeName.slice(3).split("-");
    //               var target = this.activeModule(Variables.module).Data[event.target.closest(".drawflow_content_node").parentElement.id.slice(5)].data;
    //               for (var index = 0; index < keys.length - 1; index += 1) {
    //                   if (target[keys[index]] == null) {
    //                       target[keys[index]] = {};
    //                   }
    //                   target = target[keys[index]];
    //               }
    //               target[keys[keys.length - 1]] = event.target.value;
    //               this.Dispatch('nodeDataChanged', event.target.closest(".drawflow_content_node").parentElement.id.slice(5));
    //         }
    //   }
    // }
    updateNodeDataFromId(id, data) {
        var moduleName = this.getModuleFromNodeId(id);
        this.activeModule(variables_js_1.Variables.module).Data[id].data = data;
        if (variables_js_1.Variables.module === moduleName) {
            const content = variables_js_1.Variables.container.querySelector('#node-' + id);
            Object.entries(data).forEach(function (key, value) {
                if (typeof key[1] === "object") {
                    insertObjectkeys(null, key[0], key[0]);
                }
                else {
                    var elems = content.querySelectorAll('[df-' + key[0] + ']');
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].value = key[1];
                    }
                }
            });
            function insertObjectkeys(object, name, completname) {
                if (object === null) {
                    var object = data[name];
                }
                else {
                    var object = object[name];
                }
                if (object !== null) {
                    Object.entries(object).forEach(function (key, value) {
                        if (typeof key[1] === "object") {
                            insertObjectkeys(object, key[0], completname + '-' + key[0]);
                        }
                        else {
                            var elems = content.querySelectorAll('[df-' + completname + '-' + key[0] + ']');
                            for (var i = 0; i < elems.length; i++) {
                                elems[i].value = key[1];
                            }
                        }
                    });
                }
            }
        }
    }
    addNodeInput(id) {
        var moduleName = this.getModuleFromNodeId(id);
        const infoNode = this.getNodeFromId(id);
        const numInputs = Object.keys(infoNode.inputs).length;
        if (variables_js_1.Variables.module === moduleName) {
            //Draw input
            const input = document.createElement('div');
            input.classList.add("input");
            input.classList.add("input_" + (numInputs + 1));
            const parent = variables_js_1.Variables.container.querySelector('#node-' + id + ' .inputs');
            parent.appendChild(input);
            this.updateConnectionNodes('node-' + id);
        }
        this.activeModule(variables_js_1.Variables.module).Data[id].inputs["input_" + (numInputs + 1)] = { "connections": [] };
    }
    addNodeOutput(id) {
        var moduleName = this.getModuleFromNodeId(id);
        const infoNode = this.getNodeFromId(id);
        const numOutputs = Object.keys(infoNode.outputs).length;
        if (variables_js_1.Variables.module === moduleName) {
            //Draw output
            const output = document.createElement('div');
            output.classList.add("output");
            output.classList.add("output_" + (numOutputs + 1));
            const parent = variables_js_1.Variables.container.querySelector('#node-' + id + ' .outputs');
            parent.appendChild(output);
            this.updateConnectionNodes('node-' + id);
        }
        this.activeModule(variables_js_1.Variables.module).Data[id].outputs["output_" + (numOutputs + 1)] = { "connections": [] };
    }
    removeNodeInput(id, input_class) {
        var moduleName = this.getModuleFromNodeId(id);
        const infoNode = this.getNodeFromId(id);
        if (variables_js_1.Variables.module === moduleName) {
            variables_js_1.Variables.container.querySelector('#node-' + id + ' .inputs .input.' + input_class).remove();
        }
        const removeInputs = [];
        Object.keys(infoNode.inputs[input_class].connections).map(function (key, index) {
            const id_output = infoNode.inputs[input_class].connections[index].node;
            const output_class = infoNode.inputs[input_class].connections[index].input;
            removeInputs.push({ id_output, id, output_class, input_class });
        });
        // Remove connections
        removeInputs.forEach((item, i) => {
            this.removeSingleConnection(item.id_output, item.id, item.output_class, item.input_class);
        });
        delete this.activeModule(variables_js_1.Variables.module).Data[id].inputs[input_class];
        // Update connection
        const connections = [];
        const connectionsInputs = this.activeModule(variables_js_1.Variables.module).Data[id].inputs;
        Object.keys(connectionsInputs).map(function (key, index) {
            connections.push(connectionsInputs[key]);
        });
        this.activeModule(variables_js_1.Variables.module).Data[id].inputs = {};
        const input_class_id = input_class.slice(6);
        let nodeUpdates = [];
        connections.forEach((item, i) => {
            item.connections.forEach((itemx, f) => {
                nodeUpdates.push(itemx);
            });
            this.activeModule(variables_js_1.Variables.module).Data[id].inputs['input_' + (i + 1)] = item;
        });
        nodeUpdates = new Set(nodeUpdates.map((e) => JSON.stringify(e)));
        nodeUpdates = Array.from(nodeUpdates).map((e) => JSON.parse(e));
        if (variables_js_1.Variables.module === moduleName) {
            const eles = variables_js_1.Variables.container.querySelectorAll("#node-" + id + " .inputs .input");
            eles.forEach((item, i) => {
                const id_class = item.classList[1].slice(6);
                if (parseInt(input_class_id) < parseInt(id_class)) {
                    item.classList.remove('input_' + id_class);
                    item.classList.add('input_' + (id_class - 1));
                }
            });
        }
        nodeUpdates.forEach((itemx, i) => {
            this.activeModule(variables_js_1.Variables.module).Data[itemx.node].outputs[itemx.input].connections.forEach((itemz, g) => {
                if (itemz.node == id) {
                    const output_id = itemz.output.slice(6);
                    if (parseInt(input_class_id) < parseInt(output_id)) {
                        if (variables_js_1.Variables.module === moduleName) {
                            const ele = variables_js_1.Variables.container.querySelector(".connection.node_in_node-" + id + ".node_out_node-" + itemx.node + "." + itemx.input + ".input_" + output_id);
                            ele.classList.remove('input_' + output_id);
                            ele.classList.add('input_' + (output_id - 1));
                        }
                        if (itemz.points) {
                            this.activeModule(variables_js_1.Variables.module).Data[itemx.node].outputs[itemx.input].connections[g] = { node: itemz.node, output: 'input_' + (output_id - 1), points: itemz.points };
                        }
                        else {
                            this.activeModule(variables_js_1.Variables.module).Data[itemx.node].outputs[itemx.input].connections[g] = { node: itemz.node, output: 'input_' + (output_id - 1) };
                        }
                    }
                }
            });
        });
        this.updateConnectionNodes('node-' + id);
    }
    removeNodeOutput(id, output_class) {
        var moduleName = this.getModuleFromNodeId(id);
        const infoNode = this.getNodeFromId(id);
        if (variables_js_1.Variables.module === moduleName) {
            variables_js_1.Variables.container;
            variables_js_1.Variables.container.querySelector('#node-' + id + ' .outputs .output.' + output_class).remove();
        }
        const removeOutputs = [];
        Object.keys(infoNode.outputs[output_class].connections).map(function (key, index) {
            const id_input = infoNode.outputs[output_class].connections[index].node;
            const input_class = infoNode.outputs[output_class].connections[index].output;
            removeOutputs.push({ id, id_input, output_class, input_class });
        });
        // Remove connections
        removeOutputs.forEach((item, i) => {
            this.removeSingleConnection(item.id, item.id_input, item.output_class, item.input_class);
        });
        delete this.activeModule(variables_js_1.Variables.module).Data[id].outputs[output_class];
        // Update connection
        const connections = [];
        const connectionsOuputs = this.activeModule(variables_js_1.Variables.module).Data[id].outputs;
        Object.keys(connectionsOuputs).map(function (key, index) {
            connections.push(connectionsOuputs[key]);
        });
        this.activeModule(variables_js_1.Variables.module).Data[id].outputs = {};
        const output_class_id = output_class.slice(7);
        let nodeUpdates = [];
        connections.forEach((item, i) => {
            item.connections.forEach((itemx, f) => {
                nodeUpdates.push({ node: itemx.node, output: itemx.output });
            });
            this.activeModule(variables_js_1.Variables.module).Data[id].outputs['output_' + (i + 1)] = item;
        });
        nodeUpdates = new Set(nodeUpdates.map((e) => JSON.stringify(e)));
        nodeUpdates = Array.from(nodeUpdates).map((e) => JSON.parse(e));
        if (variables_js_1.Variables.module === moduleName) {
            const eles = variables_js_1.Variables.container.querySelectorAll("#node-" + id + " .outputs .output");
            eles.forEach((item, i) => {
                const id_class = item.classList[1].slice(7);
                if (parseInt(output_class_id) < parseInt(id_class)) {
                    item.classList.remove('output_' + id_class);
                    item.classList.add('output_' + (id_class - 1));
                }
            });
        }
        nodeUpdates.forEach((itemx, i) => {
            this.activeModule(variables_js_1.Variables.module).Data[itemx.node].inputs[itemx.output].connections.forEach((itemz, g) => {
                if (itemz.node == id) {
                    const input_id = itemz.input.slice(7);
                    if (parseInt(output_class_id) < parseInt(input_id)) {
                        if (variables_js_1.Variables.module === moduleName) {
                            const ele = variables_js_1.Variables.container.querySelector(".connection.node_in_node-" + itemx.node + ".node_out_node-" + id + ".output_" + input_id + "." + itemx.output);
                            ele.classList.remove('output_' + input_id);
                            ele.classList.remove(itemx.output);
                            ele.classList.add('output_' + (input_id - 1));
                            ele.classList.add(itemx.output);
                        }
                        if (itemz.points) {
                            this.activeModule(variables_js_1.Variables.module).Data[itemx.node].inputs[itemx.output].connections[g] = { node: itemz.node, input: 'output_' + (input_id - 1), points: itemz.points };
                        }
                        else {
                            this.activeModule(variables_js_1.Variables.module).Data[itemx.node].inputs[itemx.output].connections[g] = { node: itemz.node, input: 'output_' + (input_id - 1) };
                        }
                    }
                }
            });
        });
        this.updateConnectionNodes('node-' + id);
    }
    // removeNodeId(id: any) {
    //   this.removeConnectionNodeId(id);
    //   var moduleName: any = this.getModuleFromNodeId(id.slice(5))
    //   if(Variables.module === moduleName) {
    //     Variables.container.querySelector(`#${id}`).remove();
    //   }
    //   delete this.activeModule(Variables.module).Data[id.slice(5)];
    //   this.Dispatch('nodeRemoved', id.slice(5));
    // }
    // removeConnection() {
    //   if(Variables.connection_selected != null) {
    //     var listclass = Variables.connection_selected.parentElement.classList;
    //     Variables.connection_selected.parentElement.remove();
    //     //console.log(listclass);
    //     var index_out = this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function(item: any,i: any) {
    //       return item.node === listclass[1].slice(13) && item.output === listclass[4]
    //     });
    //     this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out,1);
    //     var index_in = this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function(item: any,i: any) {
    //       return item.node === listclass[2].slice(14) && item.input === listclass[3]
    //     });
    //     this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in,1);
    //     this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] } );
    //     Variables.connection_selected = null;
    //   }
    // }
    removeSingleConnection(id_output, id_input, output_class, input_class) {
        var nodeOneModule = this.getModuleFromNodeId(id_output);
        var nodeTwoModule = this.getModuleFromNodeId(id_input);
        if (nodeOneModule === nodeTwoModule) {
            // Check nodes in same module.
            // Check connection exist
            var exists = this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.findIndex(function (item, i) {
                return item.node == id_input && item.output === input_class;
            });
            if (exists > -1) {
                if (variables_js_1.Variables.module === nodeOneModule) {
                    // In same module with view.
                    variables_js_1.Variables.container.querySelector('.connection.node_in_node-' + id_input + '.node_out_node-' + id_output + '.' + output_class + '.' + input_class).remove();
                }
                var index_out = this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.findIndex(function (item, i) {
                    return item.node == id_input && item.output === input_class;
                });
                this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.splice(index_out, 1);
                var index_in = this.activeModule(nodeOneModule).data[id_input].inputs[input_class].connections.findIndex(function (item, i) {
                    return item.node == id_output && item.input === output_class;
                });
                this.activeModule(nodeOneModule).data[id_input].inputs[input_class].connections.splice(index_in, 1);
                this.Dispatch('connectionRemoved', { output_id: id_output, input_id: id_input, output_class: output_class, input_class: input_class });
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    // removeConnectionNodeId(id: any) {
    //   const idSearchIn = 'node_in_'+id;
    //   const idSearchOut = 'node_out_'+id;
    //   const elemsOut = Variables.container.querySelectorAll(`.${idSearchOut}`);
    //   for(var i = elemsOut.length-1; i >= 0; i--) {
    //     var listclass = elemsOut[i].classList;
    //     var index_in = this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function(item: any,i: any) {
    //       return item.node === listclass[2].slice(14) && item.input === listclass[3]
    //     });
    //     this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in,1);
    //     var index_out = this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function(item: any,i: any) {
    //       return item.node === listclass[1].slice(13) && item.output === listclass[4]
    //     });
    //     this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out,1);
    //     elemsOut[i].remove();
    //     this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] } );
    //   }
    //   const elemsIn = Variables.container.querySelectorAll(`.${idSearchIn}`);
    //   for(var i = elemsIn.length-1; i >= 0; i--) {
    //     var listclass = elemsIn[i].classList;
    //     var index_out = this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function(item: any,i: any) {
    //       return item.node === listclass[1].slice(13) && item.output === listclass[4]
    //     });
    //     this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out,1);
    //     var index_in = this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function(item: any,i: any) {
    //       return item.node === listclass[2].slice(14) && item.input === listclass[3]
    //     });
    //     this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in,1);
    //     elemsIn[i].remove();
    //     this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] } );
    //   }
    // }
    // getModuleFromNodeId(id: any) {
    //   var nameModule;
    //   const editor: any = this.activeModule(Variables.module)
    //   Object.keys(editor).map(function(moduleName, index) {
    //     Object.keys(editor[moduleName].data).map(function(node, index2) {
    //       if(node == id) {
    //         nameModule = moduleName;
    //       }
    //     })
    //   });
    //   return nameModule;
    // }
    addModule(name) {
        //   Variables.drawflow.drawflow[name] =  { "data": {} };
        const newModule = new drawflow_model_js_1.DrawFlowModel({
            Data: {},
            Module: name
        });
        variables_js_1.Variables.drawflowTest.push(newModule);
        this.Dispatch('moduleCreated', name);
    }
    changeModule(name) {
        this.Dispatch('moduleChanged', name);
        variables_js_1.Variables.module = name;
        variables_js_1.Variables.precanvas.innerHTML = "";
        variables_js_1.Variables.canvas_x = 0;
        variables_js_1.Variables.canvas_y = 0;
        variables_js_1.Variables.pos_x = 0;
        variables_js_1.Variables.pos_y = 0;
        variables_js_1.Variables.mouse_x = 0;
        variables_js_1.Variables.mouse_y = 0;
        variables_js_1.Variables.zoom = 1;
        variables_js_1.Variables.zoom_last_value = 1;
        variables_js_1.Variables.precanvas.style.transform = '';
        this.import(this.activeModule(variables_js_1.Variables.module), false);
    }
    removeModule(name) {
        if (variables_js_1.Variables.module === name) {
            this.changeModule('Home');
        }
        // delete Variables.drawflow.drawflow[name];
        const index = variables_js_1.Variables.drawflowTest.findIndex((e) => {
            return e.Module === 'name';
        });
        if (index !== -1) {
            variables_js_1.Variables.drawflowTest.splice(index, 1);
        }
        this.Dispatch('moduleRemoved', name);
    }
    clearModuleSelected() {
        variables_js_1.Variables.precanvas.innerHTML = "";
        variables_js_1.Variables.drawflowTest.find((e) => {
            if (e.Module === variables_js_1.Variables.module) {
                e.Data = {};
            }
        });
        // this.activeModule(Variables.module) =  { "data": {} };
    }
    clear() {
        if (variables_js_1.Variables.precanvas) {
            variables_js_1.Variables.precanvas.innerHTML = "";
            // Variables.drawflow = { "drawflow": { "Home": { "data": {} }}};
        }
    }
    export() {
        //   const dataExport = JSON.parse(JSON.stringify(Variables.drawflow));
        //   this.Dispatch('export', dataExport);
        //   return dataExport;
    }
    import(data, notifi = true) {
        this.clear();
        // Variables.drawflow = JSON.parse(JSON.stringify(data));
        const val = new drawflow_model_js_1.DrawFlowModel({
            Data: JSON.parse(JSON.stringify(data)).drawflow.Home.data,
            Module: 'Home'
        });
        variables_js_1.Variables.drawflowTest.push(val);
        this.load();
        if (notifi) {
            this.Dispatch('import', 'import');
        }
    }
    /* Events */
    on(event, callback) {
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
        if (variables_js_1.Variables.events[event] === undefined) {
            variables_js_1.Variables.events[event] = {
                listeners: []
            };
        }
        variables_js_1.Variables.events[event].listeners.push(callback);
    }
    removeListener(event, callback) {
        // Check if this event not exists
        if (variables_js_1.Variables.events[event] === undefined) {
            //console.error(`This event: ${event} does not exist`);
            return false;
        }
        variables_js_1.Variables.events[event].listeners = variables_js_1.Variables.events[event].listeners.filter((listener) => {
            return listener.toString() !== callback.toString();
        });
    }
    //  Dispatch (event: any, details: any) {
    //      // Check if this event not exists
    //      if (Variables.events[event] === undefined) {
    //          // console.error(`This event: ${event} does not exist`);
    //          return false;
    //      }
    //      Variables.events[event].listeners.forEach((listener: any) => {
    //          listener(details);
    //      });
    //  }
    getUuid() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
}
exports.default = FlowToolOriginal02;
