import { ITextObject } from "../core/renderer/interfaces/ITextObject";
import { singleton } from "tsyringe";
import { Mediator } from "../core/events/Mediator";

@singleton()
export class Tooltip {
    private visible: boolean = false;
    private text = "";
    private positionX: 0;
    private positionY: 0;

    constructor(
        private mediator: Mediator
    ) {
        mediator.registerHandler('Tooltip::Show', (data:any) => {
            this.text = data.text;
            this.positionX = data.x;
            this.positionY = data.y;
            this.visible = true;
        });

        mediator.registerHandler('Tooltip::Hide', (data:any) => {
            this.visible = false;
            this.text = "";
            this.positionX = 0;
            this.positionY = 0;
        });
    }

    public isVisible(): boolean {
        return this.visible;
    }

    prepareRendererObject(): ITextObject {
        return {
            text: this.text,
            x: this.positionX,
            y: this.positionY
        } as ITextObject;
    }
}