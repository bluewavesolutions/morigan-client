import { IRenderObject } from "./IRenderObject";

export interface IRenderableComponent {
    prepareRendererObject(): IRenderObject;
}