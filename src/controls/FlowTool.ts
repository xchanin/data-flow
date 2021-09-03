import { NodeModel } from './../models/nodes/node.model.js';
import { Variables } from "../utils/variables.js";
import { DataFlowBaseClass } from "../base-classes/data-flow-base-class.js";
import { DataFlowDataModel } from "../models/dataflow-data.model.js";
import { ContainerEvent } from "../models/nodes/container-event.model.js";
import { Events } from "../utils/events.js";

export class FlowTool extends DataFlowBaseClass {
 
    /**
     * List of event listeners
     */
     protected eventListeners: Array<ContainerEvent>;

     constructor(container: HTMLElement, render = null, parent = null) {
 
         super();
 
         Variables.Parent = parent;
         Variables.Render = render;
         Variables.MainContainer = container;
 
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
         ]
     }
    /**
      * Start creating nodes
      */
     protected start (): void {

      /**
       * Initialize UI events
       */
      Events.InitializeDispatchedEvents();

      /**
       * Parent container
       */
       Variables.MainContainer.classList.add("parent-drawflow");
       Variables.MainContainer.tabIndex = 0;

       /**
        * Container that holds everything
        */
       const precanvas: HTMLElement | null = document.getElementById('flow-canvas');

       if (precanvas) {
         if (precanvas.parentNode) {
           debugger;
           
          precanvas.parentNode.removeChild(precanvas);
        }
       }

       Variables.PreCanvas = document.createElement('div');
       Variables.PreCanvas.setAttribute('id', 'flow-canvas');

      //  Variables.PreCanvas.querySelectorAll(".drawflow")
      //   .forEach((el: HTMLElement) => { 
      //     el.remove();
      //   });

       Variables.PreCanvas.classList.add("drawflow");
       Variables.MainContainer.appendChild(Variables.PreCanvas);
 
     /**
      * add eventlisteners to the container
      */
     Events.AddEventListeners(Variables.MainContainer, this.eventListeners);
 
       // Variables.load();
     }
     
     /**
      * load platform data
      */
     protected load(): void {
 
      for (var key in this.activeModule(Variables.ActiveModule).Data) {
        this.addNodeImport(this.activeModule(Variables.ActiveModule).Data[key], Variables.PreCanvas);
      }

       if(Variables.Reroute) {
         for (var key in this.activeModule(Variables.ActiveModule).Data) {
           this.addRerouteImport(this.activeModule(Variables.ActiveModule).Data[key]);
         }
       }
   
       for (var key in this.activeModule(Variables.ActiveModule).Data) {
         this.updateConnectionNodes('node-'+key);
       }
   
       const flowTool: any = this.activeModule(Variables.ActiveModule);

       let number = 1;

       Object.keys(flowTool).map(function(key, index) {
         Object.keys(flowTool[key]).map(function(id, index2) {

           if(parseInt(id) >= number) {
             number = parseInt(id) + 1;
           }
         });
       });

       Variables.NodeId = number;
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
    public AddNode(val: NodeModel): string {

        let newNodeId: string;

        if (Variables.UseUUID) {
          newNodeId = this.getUuid();
        } else {
          newNodeId = Variables.NodeId.toString();
        }

        const parent: HTMLElement = document.createElement('div');
        parent.classList.add("parent-node");
    
        const node: HTMLElement = document.createElement('div');
        node.innerHTML = "";
        node.setAttribute("id", "node-" + newNodeId);
        node.classList.add("drawflow-node");
        
        if (val.ClassList) {
          node.classList.add(...val.ClassList);
        }
    
        const inputs: HTMLElement = document.createElement('div');
        inputs.classList.add("inputs");
    
        const outputs: HTMLElement = document.createElement('div');
        outputs.classList.add("outputs");
    
        const json_inputs: any = {}
        for(var x = 0; x < val.NumOfInputs; x++) {
          const input = document.createElement('div');
          input.classList.add("input");
          input.classList.add("input_"+(x+1));
          json_inputs["input_"+(x+1)] = { "connections": []};
          inputs.appendChild(input);
        }
    
        const json_outputs: any = {}
        for(var x = 0; x < val.NumOfOutputs; x++) {
          const output = document.createElement('div');
          output.classList.add("output");
          output.classList.add("output_"+(x+1));
          json_outputs["output_"+(x+1)] = { "connections": []};
          outputs.appendChild(output);
        }
    
        const content = document.createElement('div');
        content.classList.add("drawflow_content_node");
        if(val.TypeNode === false) {
          content.innerHTML = val.HTML;
        } else if (val.TypeNode === true) {
          content.appendChild(Variables.NodeRegister[val.HTML].html.cloneNode(true));
        } else {
          if(parseInt(Variables.Render.version) === 3 ) {
            //Vue 3
            let wrapper = Variables.Render.createApp({
              parent: Variables.Parent,
              render: (h: any) => Variables.Render.h(Variables.NodeRegister[val.HTML].html, Variables.NodeRegister[val.HTML].props, Variables.NodeRegister[val.HTML].options)
            }).mount(content)
          } else {
            // Vue 2
            let wrapper = new Variables.Render({
              parent: Variables.Parent,
              render: (h: any) => h(Variables.NodeRegister[val.HTML].html, { props: Variables.NodeRegister[val.HTML].props }),
              ...Variables.NodeRegister[val.HTML].options
            }).$mount()
            //
            content.appendChild(wrapper.$el);
          }
        }
    
        Object.entries(val.Data).forEach(function (key, value) {
          if(typeof key[1] === "object") {
            insertObjectkeys(null, key[0], key[0]);
          } else {
            var elems: any = content.querySelectorAll('[df-'+key[0]+']');
              for(var i = 0; i < elems.length; i++) {
                elems[i].value = key[1];
              }
          }
        })
    
        function insertObjectkeys(object: any, name: any, completname: any) {
          if(object === null) {
            var object = val.Data[name];
          } else {
            var object = object[name]
          }
          if(object !== null) {
            Object.entries(object).forEach(function (key, value) {
              if(typeof key[1] === "object") {
                insertObjectkeys(object, key[0], completname+'-'+key[0]);
              } else {
                var elems: any = content.querySelectorAll('[df-'+completname+'-'+key[0]+']');
                  for(var i = 0; i < elems.length; i++) {
                    elems[i].value = key[1];
                  }
              }
            });
          }
        }
        node.appendChild(inputs);
        node.appendChild(content);
        node.appendChild(outputs);
        node.style.top = val.PosY + "px";
        node.style.left = val.PosX + "px";
        parent.appendChild(node);
        Variables.PreCanvas.appendChild(parent);


        const nodeModel: NodeModel = new NodeModel
        (
          {
            Name: val.Name, 
            Id: newNodeId,
            Data: val.Data,
            ClassList: val.ClassList,
            HTML: val.HTML,
            TypeNode: val.TypeNode,
            Inputs: json_inputs,
            Outputs: json_outputs,
            PosX: val.PosX,
            PosY: val.PosY,
            NumOfInputs: val.NumOfInputs,
            NumOfOutputs: val.NumOfOutputs
          }
        );

        this.activeModule(Variables.ActiveModule).Data[newNodeId] = nodeModel;

        this.Dispatch('nodeCreated', newNodeId);

        if (!Variables.UseUUID) {
          Variables.NodeId++;
        }

        return newNodeId;
      }
    
      addNodeImport (dataNode: any, precanvas: any) {
        const parent = document.createElement('div');
        parent.classList.add("parent-node");
    
        const node = document.createElement('div');
        node.innerHTML = "";
        node.setAttribute("id", "node-"+dataNode.id);
        node.classList.add("drawflow-node");


        /**
         * Change node shape
         */
        if (dataNode.shape === 'diamond') {
          // node.classList.add('diamond');
          node.classList.add('decision');
        }

        if (dataNode.shape === 'circle') {
          node.classList.add('circle');
        }

        if(dataNode.class != '') {
          node.classList.add(dataNode.class);
        }
    
        const inputs = document.createElement('div');
        inputs.classList.add("inputs");
    
        const outputs = document.createElement('div');
        outputs.classList.add("outputs");
    
        Object.keys(dataNode.inputs).map(function(input_item, index) {
          
          const input = document.createElement('div');
          input.classList.add("input");
          input.classList.add(input_item);
          inputs.appendChild(input);

          Object.keys(dataNode.inputs[input_item].connections).map((output_item, index) => {
    
            var connection = document.createElementNS('http://www.w3.org/2000/svg',"svg");
            var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
            path.classList.add("main-path");
            path.setAttributeNS(null, 'd', '');
            // path.innerHTML = 'a';
            connection.classList.add("connection");
            connection.classList.add("node_in_node-"+dataNode.id);
            connection.classList.add("node_out_node-"+dataNode.inputs[input_item].connections[output_item].node);
            connection.classList.add(dataNode.inputs[input_item].connections[output_item].input);
            connection.classList.add(input_item);
    
            connection.appendChild(path);
            precanvas.appendChild(connection);
    
          });
        });
    
        for(var x = 0; x < Object.keys(dataNode.outputs).length; x++) {
          const output = document.createElement('div');
          output.classList.add("output");
          output.classList.add("output_"+(x+1));
          outputs.appendChild(output);
        }
    
        const content = document.createElement('div');
        content.classList.add("drawflow_content_node");
    
        if(dataNode.typenode === false) {
          content.innerHTML = dataNode.html;
        } else if (dataNode.typenode === true) {
          content.appendChild(Variables.NodeRegister[dataNode.html].html.cloneNode(true));
        } else {
          if(parseInt(Variables.Render.version) === 3 ) {
            //Vue 3
            let wrapper = Variables.Render.createApp({
              parent: Variables.Parent,
              render: (h: any) => Variables.Render.h(Variables.NodeRegister[dataNode.html].html, Variables.NodeRegister[dataNode.html].props, Variables.NodeRegister[dataNode.html].options)
            }).mount(content)
          } else {
            //Vue 2
            let wrapper = new Variables.Render({
              parent: Variables.Parent,
              render: (h: any) => h(Variables.NodeRegister[dataNode.html].html, { props: Variables.NodeRegister[dataNode.html].props }),
              ...Variables.NodeRegister[dataNode.html].options
            }).$mount()
            content.appendChild(wrapper.$el);
          }
        }
    
        Object.entries(dataNode.data).forEach(function (key, value) {
          if(typeof key[1] === "object") {
            insertObjectkeys(null, key[0], key[0]);
          } else {
            var elems: any = content.querySelectorAll('[df-'+key[0]+']');
              for(var i = 0; i < elems.length; i++) {
                elems[i].value = key[1];
              }
          }
        })
    
        function insertObjectkeys(object: any, name: any, completname: any) {
          if(object === null) {
            var object = dataNode.data[name];
          } else {
            var object = object[name]
          }
          if(object !== null) {
            Object.entries(object).forEach(function (key, value) {
              if(typeof key[1] === "object") {
                insertObjectkeys(object, key[0], completname+'-'+key[0]);
              } else {
                var elems: any = content.querySelectorAll('[df-'+completname+'-'+key[0]+']');
                  for(var i = 0; i < elems.length; i++) {
                    elems[i].value = key[1];
                  }
              }
            });
          }
        }

        node.appendChild(inputs);
        node.appendChild(content);
        node.appendChild(outputs);

        /**
         * Set node positions on the canvas, these values come from pos_x and pos_y
         * from the
         */
        node.style.top = dataNode.pos_y + "px";
        node.style.left = dataNode.pos_x + "px";
        parent.appendChild(node);
        Variables.PreCanvas.appendChild(parent);
      }
    
      addRerouteImport(dataNode: any) {
        const reroute_width = Variables.RerouteWidth
        const reroute_fix_curvature = Variables.RerouteFixCurvature
        const container = Variables.MainContainer;
        Object.keys(dataNode.outputs).map(function(output_item, index) {
          Object.keys(dataNode.outputs[output_item].connections).map(function(input_item, index) {
            const points = dataNode.outputs[output_item].connections[input_item].points
            if(points !== undefined) {
    
              points.forEach((item: any, i: any) => {
                const input_id = dataNode.outputs[output_item].connections[input_item].node;
                const input_class = dataNode.outputs[output_item].connections[input_item].output;
                const ele: any = container.querySelector('.connection.node_in_node-'+input_id+'.node_out_node-'+dataNode.id+'.'+output_item+'.'+input_class);
    
                if(reroute_fix_curvature) {
                  if(i === 0) {
                    for (var z = 0; z < points.length; z++) {
                      var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
                      path.classList.add("main-path");
                      path.setAttributeNS(null, 'd', '');
                      ele.appendChild(path);
    
                    }
                  }
                }
    
                const point = document.createElementNS('http://www.w3.org/2000/svg',"circle");
                point.classList.add("point");
                var pos_x = item.pos_x;
                var pos_y = item.pos_y;
    
                point.setAttributeNS(null, 'cx', pos_x);
                point.setAttributeNS(null, 'cy', pos_y);
                point.setAttributeNS(null, 'r', reroute_width.toString());
    
                ele.appendChild(point);
              });
            };
          });
        });
     }

    //  updateNodeDataFromId(id: any, data: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    this.activeModule(Variables.CurrentModule).Data[id].data = data;
    //    if(Variables.CurrentModule === moduleName) {
    //      const content: any = Variables.MainContainer.querySelector('#node-'+id);
   
    //      Object.entries(data).forEach(function (key, value) {
    //        if(typeof key[1] === "object") {
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
    //            if(typeof key[1] === "object") {
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
    //      input.classList.add("input");
    //      input.classList.add("input_"+(numInputs+1));
    //      const parent: any = Variables.MainContainer.querySelector('#node-'+id+' .inputs');
    //      parent.appendChild(input);
    //      this.updateConnectionNodes('node-'+id);
   
    //    }
    //    this.activeModule(Variables.CurrentModule).Data[id].inputs["input_"+(numInputs+1)] = { "connections": []};
    //  }
   
    //  addNodeOutput(id: any) {
    //    var moduleName: any = this.getModuleFromNodeId(id)
    //    const infoNode: any = this.getNodeFromId(id)
    //    const numOutputs: any = Object.keys(infoNode.outputs).length;
    //    if(Variables.CurrentModule === moduleName) {
    //      //Draw output
    //      const output = document.createElement('div');
    //      output.classList.add("output");
    //      output.classList.add("output_"+(numOutputs+1));
    //      const parent: any = Variables.MainContainer.querySelector('#node-'+id+' .outputs');
    //      parent.appendChild(output);
    //      this.updateConnectionNodes('node-'+id);
   
    //    }
    //    this.activeModule(Variables.CurrentModule).Data[id].outputs["output_"+(numOutputs+1)] = { "connections": []};
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
    //      const eles = Variables.MainContainer.querySelectorAll("#node-"+id +" .inputs .input");
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
    //                const ele: any = Variables.MainContainer.querySelector(".connection.node_in_node-"+id+".node_out_node-"+itemx.node+"."+itemx.input+".input_"+output_id);
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
    //      const eles = Variables.MainContainer.querySelectorAll("#node-"+id +" .outputs .output");
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
   
    //                const ele: any = Variables.MainContainer.querySelector(".connection.node_in_node-"+itemx.node+".node_out_node-"+id+".output_"+input_id+"."+itemx.output);
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
    //  //   Variables.drawflow.drawflow[name] =  { "data": {} };
 
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
     public ChangeModule(name: string): void {

       this.Dispatch('moduleChanged', name);

       Variables.ActiveModule = name;
       Variables.PreCanvas.innerHTML = "";
       Variables.CanvasX = 0;
       Variables.CanvasY = 0;
       Variables.PosX = 0;
       Variables.PosY = 0;
       Variables.MouseX = 0;
       Variables.MouseY = 0;
       Variables.Zoom = 1;
       Variables.ZoomLastValue = 1;
       Variables.PreCanvas.style.transform = '';

       this.Init(this.activeModule(Variables.ActiveModule), false);
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
    //    Variables.PreCanvas.innerHTML = "";
 
    //    Variables.DataFlowModuleData.find((e: DataFlowDataModel) => {
    //      if (e.Module === Variables.CurrentModule) {
    //          e.Data = {};
    //      }
    //    })
 
    //    // this.activeModule(Variables.CurrentModule) =  { "data": {} };
    //  }
   
    /**
     * Clear canvas to add new nodes
     */
     protected clear(): void {
         if (Variables.PreCanvas) {
             Variables.PreCanvas.innerHTML = "";
             // Variables.drawflow = { "drawflow": { "Home": { "data": {} }}};
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
     public Init (data: DataFlowDataModel, notify: boolean = true): void {

      /**
       * If no data, then ignore functionality
       */
        if (!data) {
          return;
        }

         this.clear();
         this.start();
  
         const flowData: DataFlowDataModel = new DataFlowDataModel(
            {
                Data: JSON.parse(JSON.stringify(data)).Data, 
                Module: data.Module
            }
         );
      
         /**
          * Should only do this when adding new data
          */
      //  Variables.DataFlowModuleData.push(flowData);
 
       this.load();
 
       if(notify) {
         this.Dispatch('import', 'import');
       }
     }
   
      protected getUuid(): string {
        // http://www.ietf.org/rfc/rfc4122.txt
        let s: Array<any> = [];
        const hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        const uuid = s.join("");
        return uuid;
      }
   }
   