import { Variables as variables } from './variables';


export class DrawingUtil {

    public static DrawConnection(ele: any, callback: (val: string, output: {}) => void): void {
        const connection:SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg',"svg");
        variables.connection_ele = connection;
        const path = document.createElementNS('http://www.w3.org/2000/svg',"path");
        path.classList.add("main-path");
        path.setAttributeNS(null, 'd', '');
        // path.innerHTML = 'a';
        connection.classList.add("connection");
        connection.appendChild(path);
        variables.precanvas.appendChild(connection);
        var id_output = ele.parentElement.parentElement.id.slice(5);
        var output_class = ele.classList[1];

        /**
         * TODO: need to setup callback that points to this.dispatch
         */
        callback('connectionStart', { output_id: id_output, output_class:  output_class });
    
      }

    public static CreateCurvature(
        start_pos_x: number, 
        start_pos_y: number, 
        end_pos_x: number, 
        end_pos_y: number, 
        curvature_value: number, 
        type: any): any {

            const line_x = start_pos_x;
            const line_y = start_pos_y;
            const x = end_pos_x;
            const y = end_pos_y;
            const curvature = curvature_value;
            //type openclose open close other
            switch (type) {
              case 'open':
                if(start_pos_x >= end_pos_x) {
                  var hx1: number = line_x + Math.abs(x - line_x) * curvature;
                  var hx2 = x - Math.abs(x - line_x) * (curvature*-1);
                } else {
                  var hx1 = line_x + Math.abs(x - line_x) * curvature;
                  var hx2 = x - Math.abs(x - line_x) * curvature;
                }

                return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
        
                break
              case 'close':
                if(start_pos_x >= end_pos_x) {
                  var hx1 = line_x + Math.abs(x - line_x) * (curvature*-1);
                  var hx2 = x - Math.abs(x - line_x) * curvature;
                } else {
                  var hx1 = line_x + Math.abs(x - line_x) * curvature;
                  var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
                break;
              case 'other':
                if(start_pos_x >= end_pos_x) {
                  var hx1 = line_x + Math.abs(x - line_x) * (curvature*-1);
                  var hx2 = x - Math.abs(x - line_x) * (curvature*-1);
                } else {
                  var hx1 = line_x + Math.abs(x - line_x) * curvature;
                  var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
                break;
              default:
        
                var hx1 = line_x + Math.abs(x - line_x) * curvature;
                var hx2 = x - Math.abs(x - line_x) * curvature;
        
                return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
            }
        
    }

    public static UpdateConnection(eX: number, eY: number): void {
        const precanvas = variables.precanvas;
        const zoom = variables.zoom;
        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;
        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;
        var path = variables.connection_ele.children[0];
    
        var line_x = variables.ele_selected.offsetWidth/2 + (variables.ele_selected.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
        var line_y = variables.ele_selected.offsetHeight/2 + (variables.ele_selected.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
    
        var x = eX * ( variables.precanvas.clientWidth / (variables.precanvas.clientWidth * variables.zoom)) - (variables.precanvas.getBoundingClientRect().x *  ( variables.precanvas.clientWidth / (variables.precanvas.clientWidth * variables.zoom)) );
        var y = eY * ( variables.precanvas.clientHeight / (variables.precanvas.clientHeight * variables.zoom)) - (variables.precanvas.getBoundingClientRect().y *  ( variables.precanvas.clientHeight / (variables.precanvas.clientHeight * variables.zoom)) );
    
        var curvature = variables.curvature;
        var lineCurve = DrawingUtil.CreateCurvature(line_x, line_y, x, y, curvature, 'openclose');
        path.setAttributeNS(null, 'd', lineCurve);
    }
}