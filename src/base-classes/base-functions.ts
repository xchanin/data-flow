import { Variables } from './../utils/variables.js';
import { DrawingUtils } from '../utils/drawing.utils.js';
import { DrawFlowModel } from '../models/drawflow.model.js';

export class BaseFunctions {

    /**
      * 
      * @param module module name
      * @returns active module
      */
    protected activeModule(moduleName?: string): DrawFlowModel | any {

        const t = Variables.DataFlowModuleData.find((e: DrawFlowModel) => {
            if (moduleName) {
                return e.Module === moduleName;
            }

            return e.Module === Variables.module;
        })

        return t;
    }

    protected updateConnectionNodes(id: any): void {
        debugger;
        // Aquí nos quedamos;
        const idSearch = 'node_in_' + id;
        const idSearchOut = 'node_out_' + id;
        var line_path = Variables.line_path / 2;
        const container = Variables.container;
        const precanvas = Variables.precanvas;
        const curvature = Variables.curvature;
        const createCurvature = DrawingUtils.CreateCurvature;
        const reroute_curvature = Variables.reroute_curvature;
        const reroute_curvature_start_end = Variables.reroute_curvature_start_end;
        const reroute_fix_curvature = Variables.reroute_fix_curvature;
        const rerouteWidth = Variables.reroute_width;
        const zoom = Variables.zoom;
        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;
        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;

        const elemsOut = container.querySelectorAll(`.${idSearchOut}`);

        Object.keys(elemsOut).map(function (item: any, index) {
            if (elemsOut[item].querySelector('.point') === null) {

                var elemtsearchId_out: any = container.querySelector(`#${id}`);

                var id_search = elemsOut[item].classList[1].replace('node_in_', '');
                var elemtsearchId: any = container.querySelector(`#${id_search}`);

                var elemtsearch = elemtsearchId.querySelectorAll('.' + elemsOut[item].classList[4])[0]

                var eX = elemtsearch.offsetWidth / 2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                var eY = elemtsearch.offsetHeight / 2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + elemsOut[item].classList[3])[0]

                var line_x = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                var line_y = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                var x = eX;
                var y = eY;

                const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
                elemsOut[item].children[0].setAttributeNS(null, 'd', lineCurve);
            } else {
                const points = elemsOut[item].querySelectorAll('.point');
                let linecurve = '';
                const reoute_fix: Array<any> = [];
                points.forEach((item: any, i: any) => {
                    if (i === 0 && ((points.length - 1) === 0)) {

                        var elemtsearchId_out: any = container.querySelector(`#${id}`);
                        var elemtsearch = item;

                        var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;

                        var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var line_x: any = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var line_y: any = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                        var elemtsearchId_out = item;
                        var id_search = item.parentElement.classList[1].replace('node_in_', '');
                        var elemtsearchId: any = container.querySelector(`#${id_search}`);
                        var elemtsearch: any = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]

                        var elemtsearchIn: any = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]
                        var eX: any = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var eY: any = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;


                        var line_x: any = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var line_y: any = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else if (i === 0) {

                        var elemtsearchId_out: any = container.querySelector(`#${id}`);
                        var elemtsearch = item;

                        var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;

                        var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var line_x: any = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var line_y: any = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                        // SECOND
                        var elemtsearchId_out = item;
                        var elemtsearch: any = points[i + 1];

                        var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else if (i === (points.length - 1)) {

                        var elemtsearchId_out = item;

                        var id_search = item.parentElement.classList[1].replace('node_in_', '');
                        var elemtsearchId: any = container.querySelector(`#${id_search}`);
                        var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]

                        var elemtsearchIn = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]
                        var eX: any = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var eY: any = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;
                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else {
                        var elemtsearchId_out = item;
                        var elemtsearch: any = points[i + 1];

                        var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                        var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);
                    }

                });
                if (reroute_fix_curvature) {
                    reoute_fix.forEach((itempath, i) => {
                        elemsOut[item].children[i].setAttributeNS(null, 'd', itempath);
                    });

                } else {
                    elemsOut[item].children[0].setAttributeNS(null, 'd', linecurve);
                }

            }
        })

        const elems = container.querySelectorAll(`.${idSearch}`);
        Object.keys(elems).map(function (item: any, index) {

            if (elems[item].querySelector('.point') === null) {
                var elemtsearchId_in: any = container.querySelector(`#${id}`);

                var id_search = elems[item].classList[2].replace('node_out_', '');
                var elemtsearchId: any = container.querySelector(`#${id_search}`);
                var elemtsearch = elemtsearchId.querySelectorAll('.' + elems[item].classList[3])[0]

                var line_x = elemtsearch.offsetWidth / 2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                var line_y = elemtsearch.offsetHeight / 2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                var elemtsearchId_in = elemtsearchId_in.querySelectorAll('.' + elems[item].classList[4])[0]
                var x = elemtsearchId_in.offsetWidth / 2 + (elemtsearchId_in.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                var y = elemtsearchId_in.offsetHeight / 2 + (elemtsearchId_in.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
                elems[item].children[0].setAttributeNS(null, 'd', lineCurve);

            } else {
                const points = elems[item].querySelectorAll('.point');
                let linecurve = '';
                const reoute_fix: Array<any> = [];
                points.forEach((item: any, i: any) => {
                    let eX: any;
                    let eY: any;
                    if (i === 0 && ((points.length - 1) === 0)) {

                        var elemtsearchId_out: any = container.querySelector(`#${id}`);
                        var elemtsearch = item;

                        var line_x = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var line_y = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;

                        var elemtsearchIn = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[4])[0]
                        eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                        var elemtsearchId_out = item;
                        var id_search = item.parentElement.classList[2].replace('node_out_', '');
                        var elemtsearchId: any = container.querySelector(`#${id_search}`);
                        var elemtsearch: any = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0]

                        var elemtsearchOut = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var line_x: any = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var line_y: any = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);


                    } else if (i === 0) {
                        // FIRST
                        var elemtsearchId_out = item;
                        var id_search = item.parentElement.classList[2].replace('node_out_', '');
                        var elemtsearchId: any = container.querySelector(`#${id_search}`);
                        var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var elemtsearchOut = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0]
                        var line_x: any = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        var line_y: any = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                        // SECOND
                        var elemtsearchId_out = item;
                        var elemtsearch: any = points[i + 1];

                        eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else if (i === (points.length - 1)) {

                        var elemtsearchId_out = item;

                        var id_search = item.parentElement.classList[1].replace('node_in_', '');
                        var elemtsearchId: any = container.querySelector(`#${id_search}`);
                        var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]

                        var elemtsearchIn = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0]
                        eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                        eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);

                    } else {

                        var elemtsearchId_out = item;
                        var elemtsearch: any = points[i + 1];

                        eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                        var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                        var x = eX;
                        var y = eY;

                        var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                        linecurve += lineCurveSearch;
                        reoute_fix.push(lineCurveSearch);
                    }

                });
                if (reroute_fix_curvature) {
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
        const precanvas = Variables.precanvas;
        const zoom = Variables.zoom;
        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;
        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;
        var path = Variables.connection_ele.children[0];

        var line_x = Variables.ele_selected.offsetWidth / 2 + (Variables.ele_selected.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
        var line_y = Variables.ele_selected.offsetHeight / 2 + (Variables.ele_selected.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

        var x = eX * (Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().x * (Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)));
        var y = eY * (Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().y * (Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)));

        var curvature = Variables.curvature;
        var lineCurve = DrawingUtils.CreateCurvature(line_x, line_y, x, y, curvature, 'openclose');
        path.setAttributeNS(null, 'd', lineCurve);

    }

    protected getModuleFromNodeId(id: any): void {
        var nameModule;
        const editor: any = this.activeModule(Variables.module)
        Object.keys(editor).map(function (moduleName, index) {
            Object.keys(editor[moduleName].data).map(function (node, index2) {
                if (node == id) {
                    nameModule = moduleName;
                }
            })
        });
        return nameModule;
    }

    protected addConnection(id_output: any, id_input: any, output_class: any, input_class: any): void {
        debugger;
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

                if (Variables.module === nodeOneModule) {
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
                    Variables.precanvas.appendChild(connection);
                    this.updateConnectionNodes('node-' + id_output);
                    this.updateConnectionNodes('node-' + id_input);
                }

                this.Dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class: output_class, input_class: input_class });
            }
        }
    }

    protected removeConnection(): void {
        if (Variables.connection_selected != null) {
            var listclass = Variables.connection_selected.parentElement.classList;
            Variables.connection_selected.parentElement.remove();
            //console.log(listclass);
            var index_out = this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[1].slice(13) && item.output === listclass[4]
            });
            this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

            var index_in = this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[2].slice(14) && item.input === listclass[3]
            });
            this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);
            this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] });
            Variables.connection_selected = null;
        }
    }

    protected removeConnectionNodeId(id: any): void {
        const idSearchIn = 'node_in_' + id;
        const idSearchOut = 'node_out_' + id;

        const elemsOut = Variables.container.querySelectorAll(`.${idSearchOut}`);
        for (var i = elemsOut.length - 1; i >= 0; i--) {
            var listclass = elemsOut[i].classList;

            var index_in = this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[2].slice(14) && item.input === listclass[3]
            });
            this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);

            var index_out = this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[1].slice(13) && item.output === listclass[4]
            });
            this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

            elemsOut[i].remove();

            this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] });
        }

        const elemsIn = Variables.container.querySelectorAll(`.${idSearchIn}`);
        for (var i = elemsIn.length - 1; i >= 0; i--) {

            var listclass = elemsIn[i].classList;

            var index_out = this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[1].slice(13) && item.output === listclass[4]
            });
            this.activeModule(Variables.module).Data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

            var index_in = this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item: any, i: any) {
                return item.node === listclass[2].slice(14) && item.input === listclass[3]
            });
            this.activeModule(Variables.module).Data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);

            elemsIn[i].remove();

            this.Dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] });
        }
    }

    protected removeNodeId(id: any): void {
        this.removeConnectionNodeId(id);
        var moduleName: any = this.getModuleFromNodeId(id.slice(5))
        if (Variables.module === moduleName) {
            Variables.container.querySelector(`#${id}`).remove();
        }
        delete this.activeModule(Variables.module).Data[id.slice(5)];
        this.Dispatch('nodeRemoved', id.slice(5));
    }

    protected removeReouteConnectionSelected(): void {
        this.Dispatch('connectionUnselected', true);
        if (Variables.reroute_fix_curvature) {
            Variables.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
                item.classList.remove("selected");
            });
        }
    }

    protected contextmenuDel(): void {
        if (Variables.precanvas.getElementsByClassName("drawflow-delete").length) {
            Variables.precanvas.getElementsByClassName("drawflow-delete")[0].remove()
        };
    }

    protected getNodeFromId(id: any): any {
        var moduleName: any = this.getModuleFromNodeId(id)
        return JSON.parse(JSON.stringify(this.activeModule(Variables.module).Data[id]));
    }

    public removeReroutePoint(ele: any): void {
        const nodeUpdate = ele.parentElement.classList[2].slice(9)
        const nodeUpdateIn = ele.parentElement.classList[1].slice(13);
        const output_class = ele.parentElement.classList[3];
        const input_class = ele.parentElement.classList[4];


        let numberPointPosition = Array.from(ele.parentElement.children).indexOf(ele) - 1;

        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections.findIndex(function (item: any, i: any) {
            return item.node === nodeUpdateIn && item.output === input_class;
        });

        if (Variables.reroute_fix_curvature) {

            const numberMainPath = ele.parentElement.querySelectorAll(".main-path").length
            ele.parentElement.children[numberMainPath - 1].remove();
            numberPointPosition -= numberMainPath;
            if (numberPointPosition < 0) {
                numberPointPosition = 0;
            }
        }
        this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points.splice(numberPointPosition, 1);

        ele.remove();
        this.Dispatch('removeReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }

    public createReroutePoint(ele: any): void {
        Variables.connection_selected.classList.remove("selected");
        const nodeUpdate = Variables.connection_selected.parentElement.classList[2].slice(9);
        const nodeUpdateIn = Variables.connection_selected.parentElement.classList[1].slice(13);
        const output_class = Variables.connection_selected.parentElement.classList[3];
        const input_class = Variables.connection_selected.parentElement.classList[4];
        Variables.connection_selected = null;
        const point = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        point.classList.add("point");
        var pos_x: any = Variables.pos_x * (Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().x * (Variables.precanvas.clientWidth / (Variables.precanvas.clientWidth * Variables.zoom)));
        var pos_y: any = Variables.pos_y * (Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)) - (Variables.precanvas.getBoundingClientRect().y * (Variables.precanvas.clientHeight / (Variables.precanvas.clientHeight * Variables.zoom)));

        point.setAttributeNS(null, 'cx', pos_x);
        point.setAttributeNS(null, 'cy', pos_y);
        point.setAttributeNS(null, 'r', Variables.reroute_width);

        let position_add_array_point = 0;
        if (Variables.reroute_fix_curvature) {

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
        const searchConnection = this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections.findIndex(function (item: any, i: any) {
            return item.node === nodeUpdateIn && item.output === input_class;
        });

        if (this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points === undefined) {
            this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points = [];
        }

        if (Variables.reroute_fix_curvature) {
            console.log(position_add_array_point)
            if (position_add_array_point > 0) {
                this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points.splice(position_add_array_point, 0, { pos_x: pos_x, pos_y: pos_y });
            } else {
                this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
            }

            ele.parentElement.querySelectorAll(".main-path").forEach((item: any, i: any) => {
                item.classList.remove("selected");
            });

        } else {
            this.activeModule(Variables.module).Data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
        }

        this.Dispatch('addReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }

    protected getNodesFromName(name: any): Array<any> {
        var nodes: Array<any> = [];
        const editor: any = this.activeModule(Variables.module)
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
        if (Variables.events[event] === undefined) {
            // console.error(`This event: ${event} does not exist`);
            return false;
        }
        Variables.events[event].listeners.forEach((listener: any) => {
            listener(details);
        });
    }

    public Remove_Event(ev: any): void {
        // Remove this event from the target's cache
        for (var i = 0; i < Variables.evCache.length; i++) {
            if (Variables.evCache[i].pointerId == ev.pointerId) {
                Variables.evCache.splice(i, 1);
                break;
            }
        }
    }

    public Zoom_Refresh(): void {
        this.Dispatch('zoom', Variables.zoom);
        Variables.canvas_x = (Variables.canvas_x / Variables.zoom_last_value) * Variables.zoom;
        Variables.canvas_y = (Variables.canvas_y / Variables.zoom_last_value) * Variables.zoom;
        Variables.zoom_last_value = Variables.zoom;
        Variables.precanvas.style.transform = "translate(" + Variables.canvas_x + "px, " + Variables.canvas_y + "px) scale(" + Variables.zoom + ")";
    }

    public Zoom_In(): void {
        if (Variables.zoom < Variables.zoom_max) {
            Variables.zoom += Variables.zoom_value;
            this.Zoom_Refresh();
        }
    }
    public Zoom_Out(): void {
        if (Variables.zoom > Variables.zoom_min) {
            Variables.zoom -= Variables.zoom_value;
            this.Zoom_Refresh();
        }
    }

    public Zoom_Reset(): void {
        if (Variables.zoom != 1) {
            Variables.zoom = 1;
            this.Zoom_Refresh();
        }
    }
}