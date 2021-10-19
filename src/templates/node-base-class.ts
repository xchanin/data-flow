import { EventsUtils } from './../utils/events.utils.js';
import { IdsUtils } from './../utils/ids.utils.js';
import { Variables } from './../utils/variables.js';
import { NodeModel } from "../models/nodes/node.model.js";
import { BaseFunctions } from '../base-classes/base-functions.js';

export class LocalNodesModel {
  public Parent!: HTMLElement; 
  public Node!: HTMLElement; 
  public Inputs!: HTMLElement; 
  public Outputs!: HTMLElement;

  constructor(opts: LocalNodesModel) {
    Object.assign(this, opts); // destructure values
}
}
export class NodeBaseClass extends BaseFunctions {
  
  static LoadNodeFromConfig(arg0: any, PreCanvas: any) {
    throw new Error('Method not implemented.');
  }

    constructor() {
     super();
    }

    /**
     * Create parent div to attach to
     * 
     * @returns HTMLElement
     */
    protected createParent(): HTMLElement {
      const parent: HTMLElement = document.createElement('div');
      parent.classList.add('parent-node');

      return parent;
    }

    /**
     * Create node
     * 
     * @param id node id
     * @returns HTMLElement
     */
    protected createNode(id: string): HTMLElement {
      const node = document.createElement('div');
      node.innerHTML = '';
      node.setAttribute('id', 'node-' + id);
      node.classList.add(Variables.NodeClass);

      return node;
    }

    /**
     * Create input and output connectors for each node
     * 
     * @param classlist list of styles for connectors
     * @returns HTMLElement
     */
    protected createConnector(classlist: Array<string>): HTMLElement {
      const con: HTMLElement = document.createElement('div');
      con.classList.add(...classlist);

      return con;
    }

    /**
     * Create nodes and connectors
     * 
     * @param id node id
     * @param inputsClasslist list of styles for input connectors
     * @param outputsClasslist list of styles for outpus connectors
     * @returns LocalNodesModel
     */
    protected setupNodes(id: string, inputsClasslist: Array<string>, outputsClasslist: Array<string>): LocalNodesModel {

      return new LocalNodesModel( 
        {
          Parent: this.createParent(),
          Inputs: this.createConnector(inputsClasslist),
          Outputs: this.createConnector(outputsClasslist),
          Node: this.createNode(id)
        }
      )
    }

    /**
     * Loading nodes from data config
     * 
     * @param dataNode 
     * @param precanvas 
     */
    public LoadNodesFromConfig(dataNode: NodeModel, precanvas: HTMLElement): void {

      /**
       * setup nodes and connectors
       */
      const setups: LocalNodesModel = this.setupNodes(dataNode.ID, ['inputs'], ['outputs']);

        /**
         * Add inputs to node
         */
        if (dataNode.Inputs) {
            Object.keys(dataNode.Inputs)
                .map((input_item: string, index: number) => {

                    /**
                     * Input item
                     */
                    const input = document.createElement('div');
                    input.classList.add('input');
                    input.classList.add(input_item);

                    /**
                     * setting up eventlistener to track when node is moused over,
                     * will use this to check if nodes can be connected, then
                     * display red path, error, etc.
                     */
                    input.addEventListener('mouseenter', (event: any) => {
                      console.log('MOUSE ENTER EVENT');

                      if (!Variables.SelectedElement) {
                        return;
                      }

                      let e_pos_x: number;
                      let e_pos_y: number;
                      let ele_last: any;
                      e_pos_x = event.clientX;
                      e_pos_y = event.clientY;
                      ele_last = event.target;

                      let input_id = ele_last.parentElement.parentElement.id;
                      let output_id = Variables.SelectedElement.parentElement.parentElement.id;
                      let id_input = input_id.slice(5);
                      let id_output = output_id.slice(5);

                       /**
                       * Get output element the connection is going from
                       */
                      let outputElement: Array<any> = this.activeModule(Variables.ActiveModule).Data.filter((obj: NodeModel) => {
                        return obj.ID === id_output;
                      });

                      /**
                       * Get input element the connection is going to
                       */
                      let inputElement: Array<any> = this.activeModule(Variables.ActiveModule).Data.filter((obj: NodeModel) => {
                        return obj.ID === id_input;
                      });

                      this.canConnect(event, inputElement, outputElement);
                    });

                    input.setAttribute('id', dataNode.NodeType + '_' + input_item);
                    input.setAttribute('connection-node-type', <string>dataNode.NodeType);

                    setups.Inputs.appendChild(input);

                    /**
                     * TODO: Inputs (NodeInputOutputModel) need to be looked at a bit more, how
                     * the model is defined, etc. - shannon
                     */
                    Object.keys(dataNode.Inputs[input_item].Connections)
                        .map((output_item, index) => {

                            let connection = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                            path.classList.add('main-path');
                            path.setAttributeNS(null, 'd', '');
                            // path.innerHTML = 'a';
                            connection.classList.add('connection');
                            connection.classList.add('node_in_node-' + dataNode.ID);
                            connection.classList.add('node_out_node-' + dataNode.Inputs[input_item].Connections[output_item].node);
                            connection.classList.add(dataNode.Inputs[input_item].Connections[output_item].input);
                            connection.classList.add(input_item);

                            connection.appendChild(path);
                            precanvas.appendChild(connection);
                        });
                });
        }

        /**
         * Output item
         */
        if (dataNode.Outputs) {
            for (var x = 0; x < Object.keys(dataNode.Outputs).length; x++) {
                const output = document.createElement('div');
                output.classList.add('output');
                output.classList.add('output_' + (x + 1));
                setups.Outputs.appendChild(output);
            }
        }

        /**
         * Div to hold inner content of the node
         */
        const content = document.createElement('div');
        content.classList.add('drawflow_content_node');

        // if(dataNode.TypeNode === false
        if (dataNode.TypeNode === false) {
            content.innerHTML = dataNode.HTML.toString();

        } else if (dataNode.TypeNode === true) {
            // content.appendChild(Variables.NodeRegister[dataNode.HTML].html.cloneNode(true));
            content.appendChild(<Node>dataNode.HTML);

        } else {

            // if(parseInt(Variables.Render.version) === 3 ) {
            //Vue 3
            // let wrapper = Variables.Render.createApp({
            //   parent: Variables.Parent,
            //   render: (h: any) => Variables.Render.h(
            //     Variables.NodeRegister[dataNode.HTML].html, 
            //     Variables.NodeRegister[dataNode.HTML].props, 
            //     Variables.NodeRegister[dataNode.HTML].options)
            // }).mount(content)
            // } else {
            //Vue 2
            // let wrapper = new Variables.Render({
            //   parent: Variables.Parent,
            //   render: (h: any) => h(
            //     Variables.NodeRegister[dataNode.HTML].html, 
            //     { 
            //       props: Variables.NodeRegister[dataNode.HTML].props 
            //     }),
            //     ...Variables.NodeRegister[dataNode.HTML].options
            // }).$mount()
            // content.appendChild(wrapper.$el);
            // }
        }

        /**
         * Dig into node data property
         */
        Object.entries(dataNode.Data).forEach((key: [string, any], index: number) => {

            if (typeof key[1] === 'object') {
                insertObjectkeys(null, key[0], key[0]);

            } else {

                /**
                 * Look for all elements that have the attribute of 'df-' + key name
                 */
                const elems: any = content.querySelectorAll('[df-' + key[0] + ']');

                for (let i = 0; i < elems.length; i++) {
                    /**
                     * Set the value from the data object to the element,
                     * in this case we are setting the elements value property
                     * to the value from the data object
                     */
                    elems[i].value = key[1];

                    /**
                     * Set the value from the data object to the element,
                     * in this case we are checking for a <a href> and setting
                     * the link and anchor value accordingly
                     */
                    if (elems[i].closest('a')) {
                        elems[i].href = key[1];
                        elems[i].innerHTML = key[1];
                    }

                    if (elems[i].closest('span')) {
                        elems[i].innerHTML = key[1];
                    }
                }
            }
        })

        function insertObjectkeys(object: any, name: any, completname: any) {
            if (object === null) {
                var object = dataNode.Data[name];
            } else {
                var object = object[name]
            }
            if (object !== null) {
                Object.entries(object).forEach(function (key, value) {
                    if (typeof key[1] === 'object') {
                        insertObjectkeys(object, key[0], completname + '-' + key[0]);
                    } else {
                        var elems: any = content.querySelectorAll('[df-' + completname + '-' + key[0] + ']');
                        for (var i = 0; i < elems.length; i++) {
                            elems[i].value = key[1];
                        }
                    }
                });
            }
        }

        setups.Node.appendChild(setups.Inputs);
        setups.Node.appendChild(content);
        setups.Node.appendChild(setups.Outputs);

        /**
         * Set node positions on the canvas
         */
        setups.Node.style.top = dataNode.PosY + 'px';
        setups.Node.style.left = dataNode.PosX + 'px';
        setups.Parent.appendChild(setups.Node);
        Variables.PreCanvas.appendChild(setups.Parent);
    }

    /**
     * When dragging a node onto the canvas
     * 
     * @param val Node model
     * @returns node id
     */
       public AddNode(val: NodeModel): string {

        let newNodeId: string;

        if (Variables.UseUUID) {
          newNodeId = IdsUtils.GetUUID();
        } else {
          newNodeId = Variables.NodeId.toString();
        }

        /**
         * setup nodes and connectors
         */
        const setups: LocalNodesModel = this.setupNodes(newNodeId, ['inputs'], ['outputs']);

        if (val.ClassList) {
          setups.Node.classList.add(...val.ClassList);
        }
    
        // const inputs: HTMLElement = document.createElement('div');
        // inputs.classList.add('inputs');
    
        // const outputs: HTMLElement = document.createElement('div');
        // outputs.classList.add('outputs');
    
        const json_inputs: any = {}
        for(var x = 0; x < val.NumOfInputs; x++) {
          const input = document.createElement('div');
          input.classList.add('input');
          input.classList.add('input_'+(x+1));
          json_inputs['input_'+(x+1)] = { 'Connections': []};
          setups.Inputs.appendChild(input);
        }
    
        const json_outputs: any = {}
        for(var x = 0; x < val.NumOfOutputs; x++) {
          const output = document.createElement('div');
          output.classList.add('output');
          output.classList.add('output_'+(x+1));
          json_outputs['output_'+(x+1)] = { 'Connections': []};
          setups.Outputs.appendChild(output);
        }
    
        const content = document.createElement('div');

        content.classList.add('drawflow_content_node');

        /**
         * Add template for node that was dragged onto the canvas
         */
        if(val.TypeNode === false) {
          
          if (typeof val.HTML === 'string') {
            content.innerHTML = val.HTML;
          } else {
            content.appendChild(val.HTML);
          }
        
        // } else if (val.TypeNode === true) {

        //   content.appendChild(Variables.NodeRegister[val.HTML].html.cloneNode(true));
        // } else {

          // if(parseInt(Variables.Render.version) === 3 ) {
          //   //Vue 3
          //   let wrapper = Variables.Render.createApp({
          //     parent: Variables.Parent,
          //     render: (h: any) => Variables.Render.h(Variables.NodeRegister[val.HTML].html, Variables.NodeRegister[val.HTML].props, Variables.NodeRegister[val.HTML].options)
          //   }).mount(content)

          // } else {

          //   // Vue 2
          //   let wrapper = new Variables.Render({
          //     parent: Variables.Parent,
          //     render: (h: any) => h(Variables.NodeRegister[val.HTML].html, { props: Variables.NodeRegister[val.HTML].props }),
          //     ...Variables.NodeRegister[val.HTML].options
          //   }).$mount()
          //   //
          //   content.appendChild(wrapper.$el);
          // }
        }
    
        Object.entries(val.Data).forEach(function (key, value) {
          if(typeof key[1] === 'object') {
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
              if(typeof key[1] === 'object') {
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
        
        setups.Node.appendChild(setups.Inputs);
        setups.Node.appendChild(content);
        setups.Node.appendChild(setups.Outputs);
        setups.Node.style.top = val.PosY + 'px';
        setups.Node.style.left = val.PosX + 'px';
        setups.Parent.appendChild(setups.Node);
        Variables.PreCanvas.appendChild(setups.Parent);


        const nodeModel: NodeModel = new NodeModel
        (
          {
            AllowedInputTypes: val.AllowedInputTypes,
            Name: val.Name, 
            ID: newNodeId,
            Data: val.Data,
            ClassList: val.ClassList,
            HTML: val.HTML,
            TypeNode: val.TypeNode,
            Type: val.Type,
            Inputs: json_inputs,
            Outputs: json_outputs,
            PosX: val.PosX,
            PosY: val.PosY,
            NumOfInputs: val.NumOfInputs,
            NumOfOutputs: val.NumOfOutputs
          }
        );

        this.activeModule(Variables.ActiveModule).Data[newNodeId] = nodeModel;

        EventsUtils.Dispatch('nodeCreated', newNodeId);

        if (!Variables.UseUUID) {
          Variables.NodeId++;
        }

        return newNodeId;
      }
}