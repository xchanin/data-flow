"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFlowBaseClass = void 0;
const variables_js_1 = require("./../utils/variables.js");
const drawing_utils_js_1 = require("../utils/drawing.utils.js");
const base_functions_js_1 = require("./base-functions.js");
class DataFlowBaseClass extends base_functions_js_1.BaseFunctions {
    constructor() {
        super();
    }
    /**
     *
     * @param event Event
     */
    DragEnd(event) {
        let e_pos_x;
        let e_pos_y;
        let ele_last;
        let input_class;
        if (event.type === 'touchend') {
            e_pos_x = variables_js_1.Variables.MouseX;
            e_pos_y = variables_js_1.Variables.MouseY;
            ele_last = document.elementFromPoint(e_pos_x, e_pos_y);
        }
        else {
            e_pos_x = event.clientX;
            e_pos_y = event.clientY;
            ele_last = event.target;
        }
        if (variables_js_1.Variables.Dragging) {
            if (variables_js_1.Variables.PosXStart != e_pos_x || variables_js_1.Variables.PosYStart != e_pos_y) {
                this.Dispatch('nodeMoved', variables_js_1.Variables.SelectedElement.id.slice(5));
            }
        }
        if (variables_js_1.Variables.DragPoint) {
            variables_js_1.Variables.SelectedElement.classList.remove('selected');
            if (variables_js_1.Variables.PosXStart != e_pos_x || variables_js_1.Variables.PosYStart != e_pos_y) {
                this.Dispatch('rerouteMoved', variables_js_1.Variables.SelectedElement.parentElement.classList[2].slice(14));
            }
        }
        if (variables_js_1.Variables.EditorIsSelected) {
            variables_js_1.Variables.CanvasX = variables_js_1.Variables.CanvasX + (-(variables_js_1.Variables.PosX - e_pos_x));
            variables_js_1.Variables.CanvasY = variables_js_1.Variables.CanvasY + (-(variables_js_1.Variables.PosY - e_pos_y));
            variables_js_1.Variables.EditorIsSelected = false;
        }
        if (variables_js_1.Variables.Connection === true) {
            /**
             * Check if the connection line is being set to an input connection
             */
            if (ele_last.classList[0] === 'input' ||
                (variables_js_1.Variables.ForceFirstInput &&
                    (ele_last.closest('.drawflow_content_node') != null ||
                        ele_last.classList[0] === variables_js_1.Variables.NodeClass))) {
                if (variables_js_1.Variables.ForceFirstInput && (ele_last.closest('.drawflow_content_node') != null || ele_last.classList[0] === variables_js_1.Variables.NodeClass)) {
                    if (ele_last.closest('.drawflow_content_node') != null) {
                        var input_id = ele_last.closest('.drawflow_content_node').parentElement.id;
                    }
                    else {
                        var input_id = ele_last.id;
                    }
                    if (Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0) {
                        input_class = false;
                    }
                    else {
                        input_class = 'input_1';
                    }
                }
                else {
                    // Fix connection;
                    var input_id = ele_last.parentElement.parentElement.id;
                    input_class = ele_last.classList[1];
                }
                var output_id = variables_js_1.Variables.SelectedElement.parentElement.parentElement.id;
                var output_class = variables_js_1.Variables.SelectedElement.classList[1];
                if (output_id !== input_id && input_class !== false) {
                    if (variables_js_1.Variables.MainContainer.querySelectorAll('.connection.node_in_' + input_id + '.node_out_' + output_id + '.' + output_class + '.' + input_class).length === 0) {
                        // Conection doesn't exist, save connection
                        let id_input = input_id.slice(5);
                        let id_output = output_id.slice(5);
                        /**
                         * Get output element the connection is going from
                         */
                        let outputElement = this.activeModule(variables_js_1.Variables.ActiveModule).Data.filter((obj) => {
                            return obj.ID === id_output;
                        });
                        /**
                         * Get input element the connection is going to
                         */
                        let inputElement = this.activeModule(variables_js_1.Variables.ActiveModule).Data.filter((obj) => {
                            return obj.ID === id_input;
                        });
                        /**
                         * If nodes can be connected, then...
                         */
                        if (this.canConnect(event, inputElement, outputElement)) {
                            variables_js_1.Variables.ConnectionElement.classList.add('node_in_' + input_id);
                            variables_js_1.Variables.ConnectionElement.classList.add('node_out_' + output_id);
                            variables_js_1.Variables.ConnectionElement.classList.add(output_class);
                            variables_js_1.Variables.ConnectionElement.classList.add(input_class);
                            outputElement[0].Outputs[output_class].Connections.push({ 'node': id_input, 'output': input_class });
                            inputElement[0].Inputs[input_class].Connections.push({ 'node': id_output, 'input': output_class });
                            // this.activeModule(Variables.ActiveModule).Data[id_output].Outputs[output_class].Connections.push( {'node': id_input, 'output': input_class});
                            // this.activeModule(Variables.ActiveModule).Data[id_input].Inputs[input_class].Connections.push( {'node': id_output, 'input': output_class});
                            this.updateConnectionNodes('node-' + id_output);
                            this.updateConnectionNodes('node-' + id_input);
                            this.Dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class: output_class, input_class: input_class });
                            /**
                             * Error connecting nodes
                             *
                             * This works, but would be better if you received the error before clicking
                             * the node.
                             */
                        }
                        else {
                            // Variables.ConnectionElement.closest('path').classList.add('error');
                            // Variables.ConnectionElement.closest('svg').children[0].classList.add('error');
                            const closestSVG = variables_js_1.Variables.ConnectionElement.closest('svg');
                            closestSVG.querySelector('path').classList.add('error');
                            // alert('Cannot connect nodes');
                            // this.Dispatch('connectionCancel', true);
                            variables_js_1.Variables.ConnectionElement.remove();
                        }
                    }
                    else {
                        this.Dispatch('connectionCancel', true);
                        variables_js_1.Variables.ConnectionElement.remove();
                    }
                    // Variables.ConnectionElement = null; - testing without this, shannon
                }
                else {
                    // Connection exists Remove Connection;
                    this.Dispatch('connectionCancel', true);
                    variables_js_1.Variables.ConnectionElement.remove();
                    // Variables.ConnectionElement = null; - testing without this, shannon
                }
            }
            else {
                // Remove Connection;
                this.Dispatch('connectionCancel', true);
                variables_js_1.Variables.ConnectionElement.remove();
                // Variables.ConnectionElement = null; - testing without this, shannon
            }
        }
        variables_js_1.Variables.Dragging = false;
        variables_js_1.Variables.DragPoint = false;
        variables_js_1.Variables.Connection = false;
        variables_js_1.Variables.SelectedElement = null;
        variables_js_1.Variables.EditorIsSelected = false;
    }
    /**
     * Mouse position
     *
     * @param e event
     */
    Position(event) {
        if (event.type === 'touchmove') {
            var e_pos_x = event.touches[0].clientX;
            var e_pos_y = event.touches[0].clientY;
        }
        else {
            var e_pos_x = event.clientX;
            var e_pos_y = event.clientY;
        }
        if (variables_js_1.Variables.Connection) {
            this.updateConnection(e_pos_x, e_pos_y);
        }
        if (variables_js_1.Variables.EditorIsSelected) {
            x = variables_js_1.Variables.CanvasX + (-(variables_js_1.Variables.PosX - e_pos_x));
            y = variables_js_1.Variables.CanvasY + (-(variables_js_1.Variables.PosY - e_pos_y));
            this.Dispatch('translate', { x: x, y: y });
            variables_js_1.Variables.PreCanvas.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + variables_js_1.Variables.Zoom + ')';
        }
        if (variables_js_1.Variables.Dragging) {
            var x = (variables_js_1.Variables.PosX - e_pos_x) * variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom);
            var y = (variables_js_1.Variables.PosY - e_pos_y) * variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom);
            variables_js_1.Variables.PosX = e_pos_x;
            variables_js_1.Variables.PosY = e_pos_y;
            variables_js_1.Variables.SelectedElement.style.top = (variables_js_1.Variables.SelectedElement.offsetTop - y) + 'px';
            variables_js_1.Variables.SelectedElement.style.left = (variables_js_1.Variables.SelectedElement.offsetLeft - x) + 'px';
            /**
             * Get the selected item
             */
            let selectedElement = this.activeModule(variables_js_1.Variables.ActiveModule).Data.filter((obj) => {
                return obj.ID === variables_js_1.Variables.SelectedElement.id.slice(5);
            });
            selectedElement.PosX = (variables_js_1.Variables.SelectedElement.offsetLeft - x);
            selectedElement.PosY = (variables_js_1.Variables.SelectedElement.offsetTop - y);
            // this.activeModule(Variables.ActiveModule).Data[selectedElementIndex].PosX = (Variables.SelectedElement.offsetLeft - x);
            // this.activeModule(Variables.ActiveModule).Data[selectedElementIndex].PosY = (Variables.SelectedElement.offsetTop - y);
            this.updateConnectionNodes(variables_js_1.Variables.SelectedElement.id);
        }
        if (variables_js_1.Variables.DragPoint) {
            var x = (variables_js_1.Variables.PosX - e_pos_x) * variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom);
            var y = (variables_js_1.Variables.PosY - e_pos_y) * variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom);
            variables_js_1.Variables.PosX = e_pos_x;
            variables_js_1.Variables.PosY = e_pos_y;
            var pos_x = variables_js_1.Variables.PosX * (variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom)) - (variables_js_1.Variables.PreCanvas.getBoundingClientRect().x * (variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom)));
            var pos_y = variables_js_1.Variables.PosY * (variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom)) - (variables_js_1.Variables.PreCanvas.getBoundingClientRect().y * (variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom)));
            variables_js_1.Variables.SelectedElement.setAttributeNS(null, 'cx', pos_x);
            variables_js_1.Variables.SelectedElement.setAttributeNS(null, 'cy', pos_y);
            const nodeUpdate = variables_js_1.Variables.SelectedElement.parentElement.classList[2].slice(9);
            const nodeUpdateIn = variables_js_1.Variables.SelectedElement.parentElement.classList[1].slice(13);
            const output_class = variables_js_1.Variables.SelectedElement.parentElement.classList[3];
            const input_class = variables_js_1.Variables.SelectedElement.parentElement.classList[4];
            let numberPointPosition = Array.from(variables_js_1.Variables.SelectedElement.parentElement.children).indexOf(variables_js_1.Variables.SelectedElement) - 1;
            if (variables_js_1.Variables.RerouteFixCurvature) {
                const numberMainPath = variables_js_1.Variables.SelectedElement.parentElement.querySelectorAll('.main-path').length - 1;
                numberPointPosition -= numberMainPath;
                if (numberPointPosition < 0) {
                    numberPointPosition = 0;
                }
            }
            const nodeId = nodeUpdate.slice(5);
            const searchConnection = this.activeModule(variables_js_1.Variables.ActiveModule).Data[nodeId].outputs[output_class].Connections.findIndex(function (item, i) {
                return item.node === nodeUpdateIn && item.output === input_class;
            });
            this.activeModule(variables_js_1.Variables.ActiveModule).Data[nodeId].outputs[output_class].Connections[searchConnection].points[numberPointPosition] = { pos_x: pos_x, pos_y: pos_y };
            const parentSelected = variables_js_1.Variables.SelectedElement.parentElement.classList[2].slice(9);
            this.updateConnectionNodes(parentSelected);
        }
        if (event.type === 'touchmove') {
            variables_js_1.Variables.MouseX = e_pos_x;
            variables_js_1.Variables.MouseY = e_pos_y;
        }
        this.Dispatch('mouseMove', { x: e_pos_x, y: e_pos_y });
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
    Click(event) {
        this.Dispatch('click', event);
        if (variables_js_1.Variables.EditorMode === 'fixed') {
            //return false;
            if (event.target.classList[0] === 'parent-drawflow' || event.target.classList[0] === 'drawflow') {
                variables_js_1.Variables.SelectedElement = event.target.closest('.parent-drawflow');
            }
            else {
                return false;
            }
        }
        else if (variables_js_1.Variables.EditorMode === 'view') {
            if (event.target.closest('.drawflow') != null || event.target.matches('.parent-drawflow')) {
                variables_js_1.Variables.SelectedElement = event.target.closest('.parent-drawflow');
                event.preventDefault();
            }
        }
        else {
            variables_js_1.Variables.FirstClickedElement = event.target;
            variables_js_1.Variables.SelectedElement = event.target;
            /**
             * Mouse left click
             */
            if (event.button === 0) {
                /**
                 * Delete context menu
                 */
                this.contextmenuDel();
            }
            if (event.target.closest('.drawflow_content_node') != null) {
                variables_js_1.Variables.SelectedElement = event.target.closest('.drawflow_content_node').parentElement;
            }
        }
        /**
         * Let's see what was clicked on
         */
        switch (variables_js_1.Variables.SelectedElement.classList[0]) {
            case variables_js_1.Variables.NodeClass:
                if (variables_js_1.Variables.SelectedNode != null) {
                    variables_js_1.Variables.SelectedNode.classList.remove('selected');
                    if (variables_js_1.Variables.SelectedNode != variables_js_1.Variables.SelectedElement) {
                        this.Dispatch('nodeUnselected', true);
                    }
                }
                if (variables_js_1.Variables.SelectedConnection != null) {
                    variables_js_1.Variables.SelectedConnection.classList.remove('selected');
                    this.removeReouteConnectionSelected();
                    variables_js_1.Variables.SelectedConnection = null;
                }
                if (variables_js_1.Variables.SelectedNode != variables_js_1.Variables.SelectedElement) {
                    this.Dispatch('nodeSelected', variables_js_1.Variables.SelectedElement.id.slice(5));
                }
                variables_js_1.Variables.SelectedNode = variables_js_1.Variables.SelectedElement;
                variables_js_1.Variables.SelectedNode.classList.add('selected');
                if (!variables_js_1.Variables.DraggableInputs) {
                    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA' && event.target.tagName !== 'SELECT' && event.target.hasAttribute('contenteditable') !== true) {
                        variables_js_1.Variables.Dragging = true;
                    }
                }
                else {
                    if (event.target.tagName !== 'SELECT') {
                        variables_js_1.Variables.Dragging = true;
                    }
                }
                break;
            case 'output':
                variables_js_1.Variables.Connection = true;
                if (variables_js_1.Variables.SelectedNode != null) {
                    variables_js_1.Variables.SelectedNode.classList.remove('selected');
                    variables_js_1.Variables.SelectedNode = null;
                    this.Dispatch('nodeUnselected', true);
                }
                if (variables_js_1.Variables.SelectedConnection != null) {
                    variables_js_1.Variables.SelectedConnection.classList.remove('selected');
                    this.removeReouteConnectionSelected();
                    variables_js_1.Variables.SelectedConnection = null;
                }
                /**
                 * Start drawing the connection line
                 */
                drawing_utils_js_1.DrawingUtils.DrawConnection(event.target, this.Dispatch);
                break;
            case 'parent-drawflow':
                if (variables_js_1.Variables.SelectedNode != null) {
                    variables_js_1.Variables.SelectedNode.classList.remove('selected');
                    variables_js_1.Variables.SelectedNode = null;
                    this.Dispatch('nodeUnselected', true);
                }
                if (variables_js_1.Variables.SelectedConnection != null) {
                    variables_js_1.Variables.SelectedConnection.classList.remove('selected');
                    this.removeReouteConnectionSelected();
                    variables_js_1.Variables.SelectedConnection = null;
                }
                variables_js_1.Variables.EditorIsSelected = true;
                break;
            case 'drawflow':
                if (variables_js_1.Variables.SelectedNode != null) {
                    variables_js_1.Variables.SelectedNode.classList.remove('selected');
                    variables_js_1.Variables.SelectedNode = null;
                    this.Dispatch('nodeUnselected', true);
                }
                if (variables_js_1.Variables.SelectedConnection != null) {
                    variables_js_1.Variables.SelectedConnection.classList.remove('selected');
                    this.removeReouteConnectionSelected();
                    variables_js_1.Variables.SelectedConnection = null;
                }
                variables_js_1.Variables.EditorIsSelected = true;
                break;
            case 'main-path':
                if (variables_js_1.Variables.SelectedNode != null) {
                    variables_js_1.Variables.SelectedNode.classList.remove('selected');
                    variables_js_1.Variables.SelectedNode = null;
                    this.Dispatch('nodeUnselected', true);
                }
                if (variables_js_1.Variables.SelectedConnection != null) {
                    variables_js_1.Variables.SelectedConnection.classList.remove('selected');
                    this.removeReouteConnectionSelected();
                    variables_js_1.Variables.SelectedConnection = null;
                }
                variables_js_1.Variables.SelectedConnection = variables_js_1.Variables.SelectedElement;
                variables_js_1.Variables.SelectedConnection.classList.add('selected');
                const listclassConnection = variables_js_1.Variables.SelectedConnection.parentElement.classList;
                this.Dispatch('connectionSelected', { output_id: listclassConnection[2].slice(14), input_id: listclassConnection[1].slice(13), output_class: listclassConnection[3], input_class: listclassConnection[4] });
                if (variables_js_1.Variables.RerouteFixCurvature) {
                    variables_js_1.Variables.SelectedConnection.parentElement.querySelectorAll('.main-path').forEach((item, i) => {
                        item.classList.add('selected');
                    });
                }
                break;
            case 'point':
                variables_js_1.Variables.DragPoint = true;
                variables_js_1.Variables.SelectedElement.classList.add('selected');
                break;
            case 'drawflow-delete':
                if (variables_js_1.Variables.SelectedNode) {
                    this.removeNodeId(variables_js_1.Variables.SelectedNode.id);
                }
                if (variables_js_1.Variables.SelectedConnection) {
                    this.removeConnection();
                }
                if (variables_js_1.Variables.SelectedNode != null) {
                    variables_js_1.Variables.SelectedNode.classList.remove('selected');
                    variables_js_1.Variables.SelectedNode = null;
                    this.Dispatch('nodeUnselected', true);
                }
                if (variables_js_1.Variables.SelectedConnection != null) {
                    variables_js_1.Variables.SelectedConnection.classList.remove('selected');
                    this.removeReouteConnectionSelected();
                    variables_js_1.Variables.SelectedConnection = null;
                }
                break;
            default:
        }
        if (event.type === 'touchstart') {
            variables_js_1.Variables.PosX = event.touches[0].clientX;
            variables_js_1.Variables.PosXStart = event.touches[0].clientX;
            variables_js_1.Variables.PosY = event.touches[0].clientY;
            variables_js_1.Variables.PosYStart = event.touches[0].clientY;
        }
        else {
            variables_js_1.Variables.PosX = event.clientX;
            variables_js_1.Variables.PosXStart = event.clientX;
            variables_js_1.Variables.PosY = event.clientY;
            variables_js_1.Variables.PosYStart = event.clientY;
        }
        this.Dispatch('clickEnd', event);
    }
    Contextmenu(event) {
        this.Dispatch('contextmenu', event);
        event.preventDefault();
        if (variables_js_1.Variables.EditorMode === 'fixed' || variables_js_1.Variables.EditorMode === 'view') {
            return false;
        }
        if (variables_js_1.Variables.PreCanvas.getElementsByClassName('drawflow-delete').length) {
            variables_js_1.Variables.PreCanvas.getElementsByClassName('drawflow-delete')[0].remove();
        }
        ;
        if (variables_js_1.Variables.SelectedNode || variables_js_1.Variables.SelectedConnection) {
            var deletebox = document.createElement('div');
            deletebox.classList.add('drawflow-delete');
            deletebox.innerHTML = 'x';
            if (variables_js_1.Variables.SelectedNode) {
                variables_js_1.Variables.SelectedNode.appendChild(deletebox);
            }
            if (variables_js_1.Variables.SelectedConnection) {
                deletebox.style.top = event.clientY * (variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom)) - (variables_js_1.Variables.PreCanvas.getBoundingClientRect().y * (variables_js_1.Variables.PreCanvas.clientHeight / (variables_js_1.Variables.PreCanvas.clientHeight * variables_js_1.Variables.Zoom))) + 'px';
                deletebox.style.left = event.clientX * (variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom)) - (variables_js_1.Variables.PreCanvas.getBoundingClientRect().x * (variables_js_1.Variables.PreCanvas.clientWidth / (variables_js_1.Variables.PreCanvas.clientWidth * variables_js_1.Variables.Zoom))) + 'px';
                variables_js_1.Variables.PreCanvas.appendChild(deletebox);
            }
        }
    }
    /**
     * Keydown event
     *
     * @param e event
     * @returns ?
     */
    KeyDown(event) {
        this.Dispatch('keydown', event);
        if (variables_js_1.Variables.EditorMode === 'fixed' || variables_js_1.Variables.EditorMode === 'view') {
            return false;
        }
        if (event.key === 'Delete' || (event.key === 'Backspace' && event.metaKey)) {
            if (variables_js_1.Variables.SelectedNode != null) {
                if (variables_js_1.Variables.FirstClickedElement.tagName !== 'INPUT' && variables_js_1.Variables.FirstClickedElement.tagName !== 'TEXTAREA' && variables_js_1.Variables.FirstClickedElement.hasAttribute('contenteditable') !== true) {
                    this.removeNodeId(variables_js_1.Variables.SelectedNode.id);
                }
            }
            if (variables_js_1.Variables.SelectedConnection != null) {
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
    Zoom_Enter(event, delta) {
        if (event.ctrlKey) {
            event.preventDefault();
            if (event.deltaY > 0) {
                // Zoom Out
                this.Zoom_Out();
            }
            else {
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
    UpdateNodeValue(event) {
        var attr = event.target.attributes;
        for (var i = 0; i < attr.length; i++) {
            if (attr[i].nodeName.startsWith('df-')) {
                var keys = attr[i].nodeName.slice(3).split('-');
                var target = this.activeModule(variables_js_1.Variables.ActiveModule).Data[event.target.closest('.drawflow_content_node').parentElement.id.slice(5)].data;
                for (var index = 0; index < keys.length - 1; index += 1) {
                    if (target[keys[index]] == null) {
                        target[keys[index]] = {};
                    }
                    target = target[keys[index]];
                }
                target[keys[keys.length - 1]] = event.target.value;
                this.Dispatch('nodeDataChanged', event.target.closest('.drawflow_content_node').parentElement.id.slice(5));
            }
        }
    }
    /**
     * Double click event
     *
     * @param event event
     */
    DblClick(event) {
        if (variables_js_1.Variables.SelectedConnection != null && variables_js_1.Variables.Reroute) {
            this.createReroutePoint(variables_js_1.Variables.SelectedConnection);
        }
        if (event.target.classList[0] === 'point') {
            this.removeReroutePoint(event.target);
        }
    }
    /* Mobile zoom */
    /**
     * Pointer down
     * @param event event
     */
    PointerDown(event) {
        variables_js_1.Variables.EVCache.push(event);
    }
    /**
     * Pointer move
     *
     * @param e event
     */
    PointerMove(event) {
        for (var i = 0; i < variables_js_1.Variables.EVCache.length; i++) {
            if (event.pointerId == variables_js_1.Variables.EVCache[i].pointerId) {
                variables_js_1.Variables.EVCache[i] = event;
                break;
            }
        }
        if (variables_js_1.Variables.EVCache.length == 2) {
            // Calculate the distance between the two pointers
            var curDiff = Math.abs(variables_js_1.Variables.EVCache[0].clientX - variables_js_1.Variables.EVCache[1].clientX);
            if (variables_js_1.Variables.PrevDiff > 100) {
                if (curDiff > variables_js_1.Variables.PrevDiff) {
                    // The distance between the two pointers has increased
                    this.Zoom_In();
                }
                if (curDiff < variables_js_1.Variables.PrevDiff) {
                    // The distance between the two pointers has decreased
                    this.Zoom_Out();
                }
            }
            variables_js_1.Variables.PrevDiff = curDiff;
        }
    }
    /**
     * Pointer up
     *
     * @param event event
     */
    PointerUp(event) {
        this.Remove_Event(event);
        if (variables_js_1.Variables.EVCache.length < 2) {
            variables_js_1.Variables.PrevDiff = -1;
        }
    }
}
exports.DataFlowBaseClass = DataFlowBaseClass;
