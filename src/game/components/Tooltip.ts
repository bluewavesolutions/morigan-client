import { ITextObject } from "../core/renderer/interfaces/ITextObject";
import { Mediator } from "../core/events/Mediator";
import { Camera } from "./Camera";

export class Tooltip {
    private visible: boolean = false;
    private text = "";
    private positionX: number = 0;
    private positionY: number = 0;

    constructor(
        private mediator: Mediator,
        private camera: Camera
    ) {
        mediator.registerHandler('Tooltip::Show', (data:any) => {
            this.text = data.text;
            this.visible = true;
        });

        mediator.registerHandler('Tooltip::Hide', (data:any) => {
            this.visible = false;
            this.text = "";
        });

        mediator.registerHandler('MouseManager::MouseMove', (data:any) => {
            const { clientX, clientY } = data;

            this.positionX = clientX;
            this.positionY = clientY;
        });
    }

    public isVisible(): boolean {
        return this.visible;
    }

    prepareRendererObject(): ITextObject {
        return {
            text: this.text,
            x: this.positionX + 10,
            y: this.positionY + 10
        } as ITextObject;
    }
}