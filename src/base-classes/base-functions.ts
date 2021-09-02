import { Variables } from './../utils/variables.js';
import { DrawingUtils } from '../utils/drawing.utils.js';
import { DataFlowDataModel } from '../models/dataflow-data.model.js';
import { ConstantUtils } from '../utils/constants.utils.js';

export class BaseFunctions {

    /**
     * Set active module
     * 
     * @param module module name
     * @returns active module
     */
    protected activeModule(moduleName?: string): DataFlowDataModel | any {

        return Variables.DataFlowModuleData.find((e: DataFlowDataModel) => {
            if (moduleName) {
                return e.Module === moduleName;
            }

            return e.Module === Variables.ActiveModule;
        })
    }
   
    protected updateConnectionNodes(id: string): void {
      
        const idSearch: string = 'node_in_' + id;
        const idSearchOut: string = 'node_out_' + id;

        let precanvasWitdhZoom = Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;

        let precanvasHeightZoom = Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;

        const elemsOut: NodeListOf<HTMLElement> = Variables.MainContainer.querySelectorAll(`.${idSearchOut}`);
        const elemtsearchId_out: HTMLElement | null = Variables.MainContainer.querySelector(`#${id}`);

        Object.keys(elemsOut).map((item: any, index: number) => {

            if (elemsOut[item].querySelector('.point') === null) {

                // var elemtsearchId_out: any = Variables.MainContainer.querySelector(`#${id}`);

                const id_search = elemsOut[item].classList[1].replace('node_in_', '');
                const elemtsearchId: any = Variables.MainContainer.querySelector(`#${id_search}`);
                const elemtsearch: HTMLElement = elemtsearchId.querySelectorAll('.' + elemsOut[item].classList[4])[0]
                const eX: number = elemtsearch.offsetWidth / 2 + (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                const eY: number = elemtsearch.offsetHeight / 2 + (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;
                
                if (elemtsearchId_out) {
                    const elemtsearchOut: any = elemtsearchId_out.querySelectorAll('.' + elemsOut[item].classList[3])[0];
                    const line_x: number = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                    const line_y: number = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;
                    const x: number = eX;
                    const y : number= eY;
                    const lineCurve = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.Curvature, 'openclose');

                    elemsOut[item].children[0].setAttributeNS(null, 'd', lineCurve);
                }
                
            } else {
                
                const points: NodeListOf<Element> = elemsOut[item].querySelectorAll('.point');
                let linecurve: string = '';
                const reoute_fix: Array<any> = [];

                points.forEach((item: any, i: any) => {
                    if (i === 0 && ((points.length - 1) === 0)) {

                        // var elemtsearchId_out: any = Variables.MainContainer.querySelector(`#${id}`);
                        var elemtsearch = item;

                        var eX = (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var eY = (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;

                        var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var line_x: number = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var line_y: number = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvatureStartEnd, 'open');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                        var elemtsearchId_out = item;
                        var id_search = item.parentElement.classList[1].replace('node_in_', '');
                        var elemtsearchId: any = Variables.MainContainer.querySelector(`#${id_search}`);
                        var elemtsearch: any = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]

                        var elemtsearchIn: any = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]
                        var eX: number = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var eY: number = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;


                        var line_x: number = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var line_y: number = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvatureStartEnd, 'close');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else if (i === 0) {

                        // var elemtsearchId_out: any = Variables.MainContainer.querySelector(`#${id}`);
                        var elemtsearch = item;

                        var eX: number = (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var eY: number = (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;

                        var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var line_x: number = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var line_y: number = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvatureStartEnd, 'open');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                        // SECOND
                        var elemtsearchId_out = item;
                        var elemtsearch: any = points[i + 1];

                        var eX = (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var eY = (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var line_x: number = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var line_y: number = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvature, 'other');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else if (i === (points.length - 1)) {

                        var elemtsearchId_out = item;

                        var id_search = item.parentElement.classList[1].replace('node_in_', '');
                        var elemtsearchId: any = Variables.MainContainer.querySelector(`#${id_search}`);
                        var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]

                        var elemtsearchIn = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]
                        var eX: number = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var eY: number = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;
                        var line_x: number = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) + Variables.RerouteWidth;
                        var line_y: number = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvatureStartEnd, 'close');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else {
                        var elemtsearchId_out = item;
                        var elemtsearch: any = points[i + 1];

                        var eX: number = (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) + Variables.RerouteWidth;
                        var eY: number = (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) + Variables.RerouteWidth;
                        var line_x: number = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) + Variables.RerouteWidth;
                        var line_y: number = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvature, 'other');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);
                    }

                });
                if (Variables.RerouteFixCurvature) {
                    reoute_fix.forEach((itempath, i) => {
                        elemsOut[item].children[i].setAttributeNS(null, 'd', itempath);
                    });

                } else {
                    elemsOut[item].children[0].setAttributeNS(null, 'd', linecurve);
                }

            }
        })

        const elems = Variables.MainContainer.querySelectorAll(`.${idSearch}`);
        Object.keys(elems).map(function (item: any, index) {

            if (elems[item].querySelector('.point') === null) {
                var elemtsearchId_in: any = Variables.MainContainer.querySelector(`#${id}`);

                var id_search = elems[item].classList[2].replace('node_out_', '');
                var elemtsearchId: any = Variables.MainContainer.querySelector(`#${id_search}`);
                var elemtsearch = elemtsearchId.querySelectorAll('.' + elems[item].classList[3])[0]

                var line_x: number = elemtsearch.offsetWidth / 2 + (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                var line_y: number = elemtsearch.offsetHeight / 2 + (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                var elemtsearchId_in = elemtsearchId_in.querySelectorAll('.' + elems[item].classList[4])[0]
                var x = elemtsearchId_in.offsetWidth / 2 + (elemtsearchId_in.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                var y = elemtsearchId_in.offsetHeight / 2 + (elemtsearchId_in.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                const lineCurve = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.Curvature, 'openclose');
                elems[item].children[0].setAttributeNS(null, 'd', lineCurve);

            } else {
                const points = elems[item].querySelectorAll('.point');
                let linecurve = '';
                const reoute_fix: Array<any> = [];
                points.forEach((item: any, i: any) => {
                    let eX: any;
                    let eY: any;
                    if (i === 0 && ((points.length - 1) === 0)) {

                        // var elemtsearchId_out: any = Variables.MainContainer.querySelector(`#${id}`);
                        var elemtsearch = item;

                        var line_x: number = (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var line_y: number = (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;

                        var elemtsearchIn = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[4])[0]
                        eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvatureStartEnd, 'close');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                        var elemtsearchId_out = item;
                        var id_search = item.parentElement.classList[2].replace('node_out_', '');
                        var elemtsearchId: any = Variables.MainContainer.querySelector(`#${id_search}`);
                        var elemtsearch: any = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0]

                        var elemtsearchOut = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var line_x: number = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var line_y: number = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        eX = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        eY = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvatureStartEnd, 'open');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);


                    } else if (i === 0) {
                        // FIRST
                        var elemtsearchId_out = item;
                        var id_search = item.parentElement.classList[2].replace('node_out_', '');
                        var elemtsearchId: any = Variables.MainContainer.querySelector(`#${id_search}`);
                        var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var elemtsearchOut = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var line_x: number = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var line_y: number = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        eX = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        eY = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvatureStartEnd, 'open');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                        // SECOND
                        var elemtsearchId_out = item;
                        var elemtsearch: any = points[i + 1];

                        eX = (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        eY = (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvature, 'other');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else if (i === (points.length - 1)) {

                        var elemtsearchId_out = item;

                        var id_search = item.parentElement.classList[1].replace('node_in_', '');
                        var elemtsearchId: any = Variables.MainContainer.querySelector(`#${id_search}`);
                        var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]

                        var elemtsearchIn = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]
                        eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvatureStartEnd, 'close');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else {

                        var elemtsearchId_out = item;
                        var elemtsearch: any = points[i + 1];

                        eX = (elemtsearch.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        eY = (elemtsearch.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - Variables.PreCanvas.getBoundingClientRect().x) * precanvasWitdhZoom + Variables.RerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - Variables.PreCanvas.getBoundingClientRect().y) * precanvasHeightZoom + Variables.RerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = DrawingUtils.CreateCurvature(line_x, line_y, x, y, Variables.RerouteCurvature, 'other');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);
                    }

                });
                if (Variables.RerouteFixCurvature) {
                    reoute_fix.forEach((itempath, i) => {
                        elems[item].children[i].setAttributeNS(null, 'd', itempath);
                    });

                } else {
                    elems[item].children[0].setAttributeNS(null, 'd', linecurve);
                }

            }
        })
    }

    protected updateConnection(eX: any, eY: any): void {
        const precanvas = Variables.PreCanvas;
        const zoom = Variables.Zoom;
        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;
        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;
        var path = Variables.ConnectionElement.children[0];

        var line_x = Variables.SelectedElement.offsetWidth / 2 + (Variables.SelectedElement.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
        var line_y = Variables.SelectedElement.offsetHeight / 2 + (Variables.SelectedElement.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

        var x = eX * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().x * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)));
        var y = eY * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().y * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)));

        var curvature = Variables.Curvature;
        var lineCurve = DrawingUtils.CreateCurvature(line_x, line_y, x, y, curvature, 'openclose');
        path.setAttributeNS(null, 'd', lineCurve);

    }

    protected getModuleFromNodeId(id: string): any {

        let nameModule: string = '';

        /**
         * Current module
         */
        const editor: DataFlowDataModel = this.activeModule(Variables.ActiveModule);

        Object.keys(editor.Data).map((node, index2) => {
            if (node == id) {
                nameModule = editor.Module;
            }
        })
        
        return nameModule;
    }

    protected addConnection(id_output: any, id_input: any, output_class: any, input_class: any): void {
       
        var nodeOneModule: any = this.getModuleFromNodeId(id_output);
        var nodeTwoModule: any = this.getModuleFromNodeId(id_input);
        if (nodeOneModule === nodeTwoModule) {

            var dataNode = this.getNodeFromId(id_output);
            var exist = false;
            for (var checkOutput in dataNode.outputs[output_class].connections) {
                var connectionSearch = dataNode.outputs[output_class].connections[checkOutput]
                if (connectionSearch.node == id_input && connectionSearch.output == input_class) {
                    exist = true;
                }
            }
            // Check connection exist
            if (exist === false) {
                //Create Connection
                this.activeModule(nodeOneModule).data[id_output].outputs[output_class].connections.push({ "node": id_input.toString(), "output": input_class });
                this.activeModule(nodeOneModule).data[id_input].inputs[input_class].connections.push({ "node": id_output.toString(), "input": output_class });

                if (Variables.ActiveModule === nodeOneModule) {
                    //Draw connection
                    var connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                    var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                    path.classList.add("main-path");
                    path.setAttributeNS(null, 'd', '');
                    // path.innerHTML = 'a';
                    connection.classList.add("connection");
                    connection.classList.add("node_in_node-" + id_input);
                    connection.classList.add("node_out_node-" + id_output);
                    connection.classList.add(output_class);
                    connection.classList.add(input_class);
                    connection.appendChild(path);
                    Variables.PreCanvas.appendChild(connection);
                    this.updateConnectionNodes('node-' + id_output);
                    this.updateConnectionNodes('node-' + id_input);
                }

                this.Dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class: output_class, input_class: input_class });
            }
        }
    }

    protected removeConnection(): void {
        if (Variables.SelectedConnection != null) {
            var listclass = Variables.SelectedConnection.parentElement.classList;
            Variables.SelectedConnection.parentElement.remove();
            //console.log(listclass);
            var index_out = this.activeModule(Variables.ActiveModule).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[1].slice(13) && item.output === listclass[4]
            });
            this.activeModule(Variables.ActiveModule).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

            var index_in = this.activeModule(Variables.ActiveModule).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[2].slice(14) && item.input === listclass[3]
            });
            this.activeModule(Variables.ActiveModule).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);
            this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] });
            Variables.SelectedConnection = null;
        }
    }

    protected removeConnectionNodeId(id: any): void {
        const idSearchIn = 'node_in_' + id;
        const idSearchOut = 'node_out_' + id;

        const elemsOut = Variables.MainContainer.querySelectorAll(`.${idSearchOut}`);
        for (var i = elemsOut.length - 1; i >= 0; i--) {
            var listclass = elemsOut[i].classList;

            var index_in = this.activeModule(Variables.ActiveModule).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[2].slice(14) && item.input === listclass[3]
            });
            this.activeModule(Variables.ActiveModule).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);

            var index_out = this.activeModule(Variables.ActiveModule).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[1].slice(13) && item.output === listclass[4]
            });
            this.activeModule(Variables.ActiveModule).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

            elemsOut[i].remove();

            this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] });
        }

        const elemsIn = Variables.MainContainer.querySelectorAll(`.${idSearchIn}`);
        for (var i = elemsIn.length - 1; i >= 0; i--) {

            var listclass = elemsIn[i].classList;

            var index_out = this.activeModule(Variables.ActiveModule).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[1].slice(13) && item.output === listclass[4]
            });
            this.activeModule(Variables.ActiveModule).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

            var index_in = this.activeModule(Variables.ActiveModule).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[2].slice(14) && item.input === listclass[3]
            });
            this.activeModule(Variables.ActiveModule).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);

            elemsIn[i].remove();

            this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] });
        }
    }

    protected removeNodeId(id: string): void {
        this.removeConnectionNodeId(id);
        var moduleName: any = this.getModuleFromNodeId(id.slice(5))
        if (Variables.ActiveModule === moduleName) {

            const remove = Variables.MainContainer.querySelector(`#${id}`);
            if (remove) {
                remove.remove();
            }   
        }
        delete this.activeModule(Variables.ActiveModule).Data[id.slice(5)];
        this.Dispatch('nodeRemoved', id.slice(5));
    }

    protected removeReouteConnectionSelected(): void {
        this.Dispatch('connectionUnselected', true);
        if (Variables.RerouteFixCurvature) {
            Variables.SelectedConnection.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
                item.classList.remove("selected");
            });
        }
    }

    protected contextmenuDel(): void {

        if (Variables.PreCanvas.getElementsByClassName("drawflow-delete").length) {
            Variables.PreCanvas.getElementsByClassName("drawflow-delete")[0].remove();
        };
    }

    protected getNodeFromId(id: any): any {
        var moduleName: any = this.getModuleFromNodeId(id)
        return JSON.parse(JSON.stringify(this.activeModule(Variables.ActiveModule).Data[id]));
    }

    public removeReroutePoint(ele: any): void {
        const nodeUpdate = ele.parentElement.classList[2].slice(9)
        const nodeUpdateIn = ele.parentElement.classList[1].slice(13);
        const output_class = ele.parentElement.classList[3];
        const input_class = ele.parentElement.classList[4];


        let numberPointPosition = Array.from(ele.parentElement.children).indexOf(ele) - 1;

        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].connections.findIndex(function (item: any, i: any) {
            return item.node === nodeUpdateIn && item.output === input_class;
        });

        if (Variables.RerouteFixCurvature) {

            const numberMainPath = ele.parentElement.querySelectorAll(".main-path").length
            ele.parentElement.children[numberMainPath - 1].remove();
            numberPointPosition -= numberMainPath;
            if (numberPointPosition < 0) {
                numberPointPosition = 0;
            }
        }
        this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].connections[searchConnection].points.splice(numberPointPosition, 1);

        ele.remove();
        this.Dispatch('removeReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }

    public createReroutePoint(ele: any): void {
        Variables.SelectedConnection.classList.remove("selected");
        const nodeUpdate = Variables.SelectedConnection.parentElement.classList[2].slice(9);
        const nodeUpdateIn = Variables.SelectedConnection.parentElement.classList[1].slice(13);
        const output_class = Variables.SelectedConnection.parentElement.classList[3];
        const input_class = Variables.SelectedConnection.parentElement.classList[4];
        Variables.SelectedConnection = null;
        const point = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        point.classList.add("point");
        var pos_x: any = Variables.PosX * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().x * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)));
        var pos_y: any = Variables.PosY * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().y * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)));

        point.setAttributeNS(null, 'cx', pos_x);
        point.setAttributeNS(null, 'cy', pos_y);
        point.setAttributeNS(null, 'r', Variables.RerouteWidth.toString());

        let position_add_array_point = 0;
        if (Variables.RerouteFixCurvature) {

            const numberPoints = ele.parentElement.querySelectorAll(".main-path").length;
            var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
            path.classList.add("main-path");
            path.setAttributeNS(null, 'd', '');

            ele.parentElement.insertBefore(path, ele.parentElement.children[numberPoints]);
            if (numberPoints === 1) {
                ele.parentElement.appendChild(point);
            } else {
                const search_point = Array.from(ele.parentElement.children).indexOf(ele)
                position_add_array_point = search_point;
                ele.parentElement.insertBefore(point, ele.parentElement.children[search_point + numberPoints + 1]);
            }

        } else {
            ele.parentElement.appendChild(point);
        }

        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].connections.findIndex(function (item: any, i: any) {
            return item.node === nodeUpdateIn && item.output === input_class;
        });

        if (this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].connections[searchConnection].points === undefined) {
            this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].connections[searchConnection].points = [];
        }

        if (Variables.RerouteFixCurvature) {
            console.log(position_add_array_point)
            if (position_add_array_point > 0) {
                this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].connections[searchConnection].points.splice(position_add_array_point, 0, { pos_x: pos_x, pos_y: pos_y });
            } else {
                this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
            }

            ele.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
                item.classList.remove("selected");
            });

        } else {
            this.activeModule(Variables.ActiveModule).Data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
        }

        this.Dispatch('addReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }

    protected getNodesFromName(name: any): Array<any> {
        var nodes: Array<any> = [];
        const editor: any = this.activeModule(Variables.ActiveModule)
        Object.keys(editor).map(function (moduleName, index) {
            for (var node in editor[moduleName].data) {
                if (editor[moduleName].data[node].name == name) {
                    nodes.push(editor[moduleName].data[node].id);
                }
            }
        });
        return nodes;
    }

    public Dispatch(event: any, details: any): any {
        // Check if this event not exists
        if (Variables.Events[event] === undefined) {
            // console.error(`This event: ${event} does not exist`);
            return false;
        }
        Variables.Events[event].listeners.forEach((listener: any) => {
            listener(details);
        });
    }

    public Remove_Event(ev: any): void {
        // Remove this event from the target's cache
        for (var i = 0; i < Variables.EVCache.length; i++) {
            if (Variables.EVCache[i].pointerId == ev.pointerId) {
                Variables.EVCache.splice(i, 1);
                break;
            }
        }
    }

    public Zoom_Refresh(): void {
        this.Dispatch('zoom', Variables.Zoom);
        Variables.CanvasX = (Variables.CanvasX / Variables.ZoomLastValue) * Variables.Zoom;
        Variables.CanvasY = (Variables.CanvasY / Variables.ZoomLastValue) * Variables.Zoom;
        Variables.ZoomLastValue = Variables.Zoom;
        Variables.PreCanvas.style.transform = "translate(" + Variables.CanvasX + "px, " + Variables.CanvasY + "px) scale(" + Variables.Zoom + ")";
    }

    public Zoom_In(): void {
        if (Variables.Zoom < Variables.ZoomMax) {
            Variables.Zoom += Variables.ZoomValue;
            this.Zoom_Refresh();
        }
    }
    public Zoom_Out(): void {
        if (Variables.Zoom > Variables.ZoomMin) {
            Variables.Zoom -= Variables.ZoomValue;
            this.Zoom_Refresh();
        }
    }

    public Zoom_Reset(): void {
        if (Variables.Zoom != 1) {
            Variables.Zoom = 1;
            this.Zoom_Refresh();
        }
    }
}