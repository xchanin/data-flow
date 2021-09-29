"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowTool = void 0;
const variables_js_1 = require("../utils/variables.js");
const data_flow_base_class_js_1 = require("../base-classes/data-flow-base-class.js");
const dataflow_data_model_js_1 = require("../models/dataflow-data.model.js");
const events_utils_js_1 = require("../utils/events.utils.js");
const node_base_class_js_1 = require("../templates/node-base-class.js");
class FlowTool extends data_flow_base_class_js_1.DataFlowBaseClass {
    constructor(container, render = null, parent = null) {
        super();
        this.nodeBaseClass = new node_base_class_js_1.NodeBaseClass();
        variables_js_1.Variables.Parent = parent;
        variables_js_1.Variables.Render = render;
        variables_js_1.Variables.MainContainer = container;
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
    /**
      * Start creating nodes
      */
    start() {
        /**
         * Initialize UI events
         */
        events_utils_js_1.EventsUtils.InitializeDispatchedEvents();
        /**
         * Parent container
         */
        variables_js_1.Variables.MainContainer.classList.add('parent-drawflow');
        variables_js_1.Variables.MainContainer.tabIndex = 0;
        /**
         * Container that holds everything
         */
        const precanvas = document.getElementById('flow-canvas');
        /**
         * if precanvas already exists, then remove it
         */
        if (precanvas && precanvas.parentNode) {
            precanvas.parentNode.removeChild(precanvas);
        }
        variables_js_1.Variables.PreCanvas = document.createElement('div');
        variables_js_1.Variables.PreCanvas.setAttribute('id', 'flow-canvas');
        variables_js_1.Variables.PreCanvas.classList.add('drawflow');
        variables_js_1.Variables.MainContainer.appendChild(variables_js_1.Variables.PreCanvas);
        /**
         * add eventlisteners to the container
         */
        events_utils_js_1.EventsUtils.AddEventListeners(variables_js_1.Variables.MainContainer, this.eventListeners);
        // Variables.load();
    }
    /**
     * load platform data
     */
    load() {
        for (var key in this.activeModule(variables_js_1.Variables.ActiveModule).Data) {
            /**
             * Load nodes from config values
             */
            this.nodeBaseClass.LoadNodesFromConfig(this.activeModule(variables_js_1.Variables.ActiveModule).Data[key], variables_js_1.Variables.PreCanvas);
        }
        if (variables_js_1.Variables.Reroute) {
            for (var key in this.activeModule(variables_js_1.Variables.ActiveModule).Data) {
                this.addRerouteImport(this.activeModule(variables_js_1.Variables.ActiveModule).Data[key]);
            }
        }
        for (var key in this.activeModule(variables_js_1.Variables.ActiveModule).Data) {
            this.updateConnectionNodes('node-' + key);
        }
        const flowTool = this.activeModule(variables_js_1.Variables.ActiveModule);
        let number = 1;
        Object.keys(flowTool).map(function (key, index) {
            Object.keys(flowTool[key]).map(function (id, index2) {
                if (parseInt(id) >= number) {
                    number = parseInt(id) + 1;
                }
            });
        });
        variables_js_1.Variables.NodeId = number;
    }
    //  registerNode(name: any, html: any, props = null, options = null) {
    //    Variables.noderegister[name] = {html: html, props: props, options: options};
    //  }
    /**
     * When dragging a node onto the canvas
     *
     * @param val Node model
     * @returns node id
     */
    AddNode(val) {
        return this.nodeBaseClass.AddNode(val);
    }
    addRerouteImport(dataNode) {
        const reroute_width = variables_js_1.Variables.RerouteWidth;
        const reroute_fix_curvature = variables_js_1.Variables.RerouteFixCurvature;
        const container = variables_js_1.Variables.MainContainer;
        Object.keys(dataNode.outputs).map(function (output_item, index) {
            Object.keys(dataNode.outputs[output_item].Connections).map(function (input_item, index) {
                const points = dataNode.outputs[output_item].Connections[input_item].points;
                if (points !== undefined) {
                    points.forEach((item, i) => {
                        const input_id = dataNode.outputs[output_item].Connections[input_item].node;
                        const input_class = dataNode.outputs[output_item].Connections[input_item].output;
                        const ele = container.querySelector('.connection.node_in_node-' + input_id + '.node_out_node-' + dataNode.id + '.' + output_item + '.' + input_class);
                        if (reroute_fix_curvature) {
                            if (i === 0) {
                                for (var z = 0; z < points.length; z++) {
                                    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                                    path.classList.add('main-path');
                                    path.setAttributeNS(null, 'd', '');
                                    ele.appendChild(path);
                                }
                            }
                        }
                        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        point.classList.add('point');
                        var pos_x = item.pos_x;
                        var pos_y = item.pos_y;
                        point.setAttributeNS(null, 'cx', pos_x);
                        point.setAttributeNS(null, 'cy', pos_y);
                        point.setAttributeNS(null, 'r', reroute_width.toString());
                        ele.appendChild(point);
                    });
                }
                ;
            });
        });
    }
    //  updateNodeDataFromId(id: any, data: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    this.activeModule(Variables.CurrentModule).Data[id].data = data;
    //    if(Variables.CurrentModule === moduleName) {
    //      const content: any = Variables.MainContainer.querySelector('#node-'+id);
    //      Object.entries(data).forEach(function (key, value) {
    //        if(typeof key[1] === 'object') {
    //          insertObjectkeys(null, key[0], key[0]);
    //        } else {
    //          var elems = content.querySelectorAll('[df-'+key[0]+']');
    //            for(var i = 0; i < elems.length; i++) {
    //              elems[i].value = key[1];
    //            }
    //        }
    //      })
    //      function insertObjectkeys(object: any, name: any, completname: any) {
    //        if(object === null) {
    //          var object = data[name];
    //        } else {
    //          var object = object[name]
    //        }
    //        if(object !== null) {
    //          Object.entries(object).forEach(function (key, value) {
    //            if(typeof key[1] === 'object') {
    //              insertObjectkeys(object, key[0], completname+'-'+key[0]);
    //            } else {
    //              var elems = content.querySelectorAll('[df-'+completname+'-'+key[0]+']');
    //                for(var i = 0; i < elems.length; i++) {
    //                  elems[i].value = key[1];
    //                }
    //            }
    //          });
    //        }
    //      }
    //    }
    //  }
    //  addNodeInput(id: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    const numInputs: any = Object.keys(infoNode.inputs).length;
    //    if(Variables.CurrentModule === moduleName) {
    //      //Draw input
    //      const input = document.createElement('div');
    //      input.classList.add('input');
    //      input.classList.add('input_'+(numInputs+1));
    //      const parent: any = Variables.MainContainer.querySelector('#node-'+id+' .inputs');
    //      parent.appendChild(input);
    //      this.updateConnectionNodes('node-'+id);
    //    }
    //    this.activeModule(Variables.CurrentModule).Data[id].inputs['input_'+(numInputs+1)] = { 'connections': []};
    //  }
    //  addNodeOutput(id: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    const numOutputs: any = Object.keys(infoNode.outputs).length;
    //    if(Variables.CurrentModule === moduleName) {
    //      //Draw output
    //      const output = document.createElement('div');
    //      output.classList.add('output');
    //      output.classList.add('output_'+(numOutputs+1));
    //      const parent: any = Variables.MainContainer.querySelector('#node-'+id+' .outputs');
    //      parent.appendChild(output);
    //      this.updateConnectionNodes('node-'+id);
    //    }
    //    this.activeModule(Variables.CurrentModule).Data[id].outputs['output_'+(numOutputs+1)] = { 'connections': []};
    //  }
    //  removeNodeInput(id: any, input_class: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    if(Variables.CurrentModule === moduleName) {
    //      Variables.MainContainer.querySelector('#node-'+id+' .inputs .input.'+input_class).remove();
    //    }
    //    const removeInputs: any = [];
    //    Object.keys(infoNode.inputs[input_class].connections).map(function(key, index) {
    //      const id_output = infoNode.inputs[input_class].connections[index].node;
    //      const output_class = infoNode.inputs[input_class].connections[index].input;
    //      removeInputs.push({id_output, id, output_class, input_class})
    //    })
    //    // Remove connections
    //    removeInputs.forEach((item: any, i: any) => {
    //      this.removeSingleConnection(item.id_output, item.id, item.output_class, item.input_class);
    //    });
    //    delete this.activeModule(Variables.CurrentModule).Data[id].inputs[input_class];
    //    // Update connection
    //    const connections: Array<any> = [];
    //    const connectionsInputs = this.activeModule(Variables.CurrentModule).Data[id].inputs
    //    Object.keys(connectionsInputs).map(function(key, index) {
    //      connections.push(connectionsInputs[key]);
    //    });
    //    this.activeModule(Variables.CurrentModule).Data[id].inputs = {};
    //    const input_class_id = input_class.slice(6);
    //    let nodeUpdates: any = [];
    //    connections.forEach((item, i) => {
    //      item.connections.forEach((itemx: any, f: any) => {
    //        nodeUpdates.push(itemx);
    //      });
    //      this.activeModule(Variables.CurrentModule).Data[id].inputs['input_'+ (i+1)] = item;
    //    });
    //    nodeUpdates =  new Set(nodeUpdates.map((e: any) => JSON.stringify(e)));
    //    nodeUpdates = Array.from(nodeUpdates).map((e: any) => JSON.parse(e));
    //    if(Variables.CurrentModule === moduleName) {
    //      const eles = Variables.MainContainer.querySelectorAll('#node-'+id +' .inputs .input');
    //      eles.forEach((item: any, i: any) => {
    //        const id_class: any = item.classList[1].slice(6);
    //        if(parseInt(input_class_id) < parseInt(id_class)) {
    //          item.classList.remove('input_'+id_class);
    //          item.classList.add('input_'+(id_class-1));
    //        }
    //      });
    //    }
    //    nodeUpdates.forEach((itemx: any, i: any) => {
    //      this.activeModule(Variables.CurrentModule).Data[itemx.node].outputs[itemx.input].connections.forEach((itemz: any, g: any) => {
    //          if(itemz.node == id) {
    //            const output_id = itemz.output.slice(6);
    //            if(parseInt(input_class_id) < parseInt(output_id)) {
    //              if(Variables.CurrentModule === moduleName) {
    //                const ele: any = Variables.MainContainer.querySelector('.connection.node_in_node-'+id+'.node_out_node-'+itemx.node+'.'+itemx.input+'.input_'+output_id);
    //                ele.classList.remove('input_'+output_id);
    //                ele.classList.add('input_'+(output_id-1));
    //              }
    //              if(itemz.points) {
    //                  this.activeModule(Variables.CurrentModule).Data[itemx.node].outputs[itemx.input].connections[g] = { node: itemz.node, output: 'input_'+(output_id-1), points: itemz.points }
    //              } else {
    //                  this.activeModule(Variables.CurrentModule).Data[itemx.node].outputs[itemx.input].connections[g] = { node: itemz.node, output: 'input_'+(output_id-1)}
    //              }
    //            }
    //          }
    //      });
    //    });
    //    this.updateConnectionNodes('node-'+id);
    //  }
    //  removeNodeOutput(id: any, output_class: string) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    if(Variables.CurrentModule === moduleName) {
    //        Variables.container
    //      Variables.MainContainer.querySelector('#node-'+id+' .outputs .output.' + output_class).remove();
    //    }
    //    const removeOutputs: Array<any> = [];
    //    Object.keys(infoNode.outputs[output_class].connections).map(function(key, index) {
    //      const id_input = infoNode.outputs[output_class].connections[index].node;
    //      const input_class = infoNode.outputs[output_class].connections[index].output;
    //      removeOutputs.push({id, id_input, output_class, input_class})
    //    })
    //    // Remove connections
    //    removeOutputs.forEach((item: any, i: any) => {
    //      this.removeSingleConnection(item.id, item.id_input, item.output_class, item.input_class);
    //    });
    //    delete this.activeModule(Variables.CurrentModule).Data[id].outputs[output_class];
    //    // Update connection
    //    const connections: Array<any> = [];
    //    const connectionsOuputs = this.activeModule(Variables.CurrentModule).Data[id].outputs
    //    Object.keys(connectionsOuputs).map(function(key, index) {
    //      connections.push(connectionsOuputs[key]);
    //    });
    //    this.activeModule(Variables.CurrentModule).Data[id].outputs = {};
    //    const output_class_id = output_class.slice(7);
    //    let nodeUpdates: any = [];
    //    connections.forEach((item, i) => {
    //      item.connections.forEach((itemx: any, f: any) => {
    //        nodeUpdates.push({ node: itemx.node, output: itemx.output });
    //      });
    //      this.activeModule(Variables.CurrentModule).Data[id].outputs['output_'+ (i+1)] = item;
    //    });
    //    nodeUpdates =  new Set(nodeUpdates.map((e: any) => JSON.stringify(e)));
    //    nodeUpdates = Array.from(nodeUpdates).map((e: any) => JSON.parse(e));
    //    if(Variables.CurrentModule === moduleName) {
    //      const eles = Variables.MainContainer.querySelectorAll('#node-'+id +' .outputs .output');
    //      eles.forEach((item: any, i: any) => {
    //        const id_class: any = item.classList[1].slice(7);
    //        if(parseInt(output_class_id) < parseInt(id_class)) {
    //          item.classList.remove('output_'+id_class);
    //          item.classList.add('output_'+(id_class-1));
    //        }
    //      });
    //    }
    //    nodeUpdates.forEach((itemx: any, i: any) => {
    //      this.activeModule(Variables.CurrentModule).Data[itemx.node].inputs[itemx.output].connections.forEach((itemz: any, g: any) => {
    //          if(itemz.node == id) {
    //            const input_id = itemz.input.slice(7);
    //            if(parseInt(output_class_id) < parseInt(input_id)) {
    //              if(Variables.CurrentModule === moduleName) {
    //                const ele: any = Variables.MainContainer.querySelector('.connection.node_in_node-'+itemx.node+'.node_out_node-'+id+'.output_'+input_id+'.'+itemx.output);
    //                ele.classList.remove('output_'+input_id);
    //                ele.classList.remove(itemx.output);
    //                ele.classList.add('output_'+(input_id-1));
    //                ele.classList.add(itemx.output);
    //              }
    //              if(itemz.points) {
    //                  this.activeModule(Variables.CurrentModule).Data[itemx.node].inputs[itemx.output].connections[g] = { node: itemz.node, input: 'output_'+(input_id-1), points: itemz.points }
    //              } else {
    //                  this.activeModule(Variables.CurrentModule).Data[itemx.node].inputs[itemx.output].connections[g] = { node: itemz.node, input: 'output_'+(input_id-1)}
    //              }
    //            }
    //          }
    //      });
    //    });
    //    this.updateConnectionNodes('node-'+id);
    //  }
    //  removeSingleConnection(id_output: any, id_input: any, output_class: any, input_class: any) {
    //    var nodeOneModule: any = this.getModuleFromNodeId(id_output);
    //    var nodeTwoModule: any = this.getModuleFromNodeId(id_input);
    //    if(nodeOneModule === nodeTwoModule) {
    //      // Check nodes in same module.
    //      // Check connection exist
    //      var exists = this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.findIndex(function(item: any,i: any) {
    //        return item.node == id_input && item.output === input_class
    //      });
    //      if(exists > -1) {
    //        if(Variables.CurrentModule === nodeOneModule) {
    //          // In same module with view.
    //          Variables.MainContainer.querySelector('.connection.node_in_node-'+id_input+'.node_out_node-'+id_output+'.'+output_class+'.'+input_class).remove();
    //        }
    //        var index_out = this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.findIndex(function(item: any,i: any) {
    //          return item.node == id_input && item.output === input_class
    //        });
    //        this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.splice(index_out,1);
    //        var index_in = this.activeModule(nodeOneModule).data[id_input].inputs[input_class].connections.findIndex(function(item: any,i: any) {
    //          return item.node == id_output && item.input === output_class
    //        });
    //        this.activeModule(nodeOneModule).data[id_input].inputs[input_class].connections.splice(index_in,1);
    //        this.Dispatch('connectionRemoved', { output_id: id_output, input_id: id_input, output_class:  output_class, input_class: input_class});
    //        return true;
    //      } else {
    //        return false;
    //      }
    //    } else {
    //      return false;
    //    }
    //  }
    //  addModule(name: any) {
    //  //   Variables.drawflow.drawflow[name] =  { 'data': {} };
    //    const newModule: DataFlowDataModel = new DataFlowDataModel(
    //        {
    //            Data: {},
    //            Module: name
    //        }
    //    );
    //    Variables.DataFlowModuleData.push(newModule)
    //    this.Dispatch('moduleCreated', name);
    //  }
    /**
     * When switching modules - clicking menu tab buttons
     *
     * @param name module to load
     */
    ChangeModule(name) {
        this.Dispatch('moduleChanged', name);
        variables_js_1.Variables.ActiveModule = name;
        variables_js_1.Variables.PreCanvas.innerHTML = '';
        variables_js_1.Variables.CanvasX = 0;
        variables_js_1.Variables.CanvasY = 0;
        variables_js_1.Variables.PosX = 0;
        variables_js_1.Variables.PosY = 0;
        variables_js_1.Variables.MouseX = 0;
        variables_js_1.Variables.MouseY = 0;
        variables_js_1.Variables.Zoom = 1;
        variables_js_1.Variables.ZoomLastValue = 1;
        variables_js_1.Variables.PreCanvas.style.transform = '';
        this.Init(this.activeModule(variables_js_1.Variables.ActiveModule), false);
    }
    //  removeModule(name: any) {
    //    if(Variables.CurrentModule === name) {
    //      this.changeModule('Home');
    //    }
    //    // delete Variables.drawflow.drawflow[name];
    //    const index: number = Variables.DataFlowModuleData.findIndex((e:DataFlowDataModel) => {
    //      return e.Module === 'name';
    //    });
    //    if (index !== -1) {
    //        Variables.DataFlowModuleData.splice(index, 1);
    //    }
    //    this.Dispatch('moduleRemoved', name);
    //  }
    //  clearModuleSelected() {
    //    Variables.PreCanvas.innerHTML = '';
    //    Variables.DataFlowModuleData.find((e: DataFlowDataModel) => {
    //      if (e.Module === Variables.CurrentModule) {
    //          e.Data = {};
    //      }
    //    })
    //    // this.activeModule(Variables.CurrentModule) =  { 'data': {} };
    //  }
    /**
     * Clear canvas to add new nodes
     */
    clear() {
        if (variables_js_1.Variables.PreCanvas) {
            variables_js_1.Variables.PreCanvas.innerHTML = '';
            // Variables.drawflow = { 'drawflow': { 'Home': { 'data': {} }}};
        }
    }
    //  export () {
    //  //   const dataExport = JSON.parse(JSON.stringify(Variables.drawflow));
    //  //   this.Dispatch('export', dataExport);
    //  //   return dataExport;
    //  }
    /**
     *
     * @param data DataFlow data
     * @param notifi dispatch event when data has been imported
     * @returns
     */
    Init(data, notify = true) {
        /**
         * If no data, then ignore functionality
         */
        if (!data || Object.keys(data.Data).length === 0) {
            return;
        }
        this.clear();
        this.start();
        const flowData = new dataflow_data_model_js_1.DataFlowDataModel({
            Data: JSON.parse(JSON.stringify(data)).Data,
            Module: data.Module
        });
        /**
         * Should only do this when adding new data
         */
        //  Variables.DataFlowModuleData.push(flowData);
        this.load();
        if (notify) {
            events_utils_js_1.EventsUtils.Dispatch('import', 'import');
        }
    }
}
exports.FlowTool = FlowTool;
