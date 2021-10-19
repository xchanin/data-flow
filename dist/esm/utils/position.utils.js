import { Variables } from "./variables.js";
export class PositionUtils {
    static DraggedNodeEndXPos(x) {
        return x * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().x * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)));
    }
    static DraggedNodeEndYPos(y) {
        return y * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().y * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)));
    }
}
