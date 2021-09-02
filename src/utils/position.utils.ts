import { Variables } from "./variables.js";

export class PositionUtils {

    public static DraggedNodeXPos(x: number): number {

        return x * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().x * (Variables.PreCanvas.clientWidth / (Variables.PreCanvas.clientWidth * Variables.Zoom)));
    
    }

    public static DraggedNodeYPos(y: number): number {

        return y * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)) - (Variables.PreCanvas.getBoundingClientRect().y * (Variables.PreCanvas.clientHeight / (Variables.PreCanvas.clientHeight * Variables.Zoom)));
    }
}