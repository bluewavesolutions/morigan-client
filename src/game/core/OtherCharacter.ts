import { AnimatedValue } from "./AnimatedValue";
import { IRenderObject } from "./interfaces/IRenderObject";

export class OtherCharacter {
    public id: number;
    public nick: string;
    public outfit: string;
    public positionX: number;
    public positionY: number;
    public image: HTMLImageElement;
    public animatedX: AnimatedValue;
    public animatedY: AnimatedValue;

    constructor(id: number, nick: string, outfit: string, positionX: number, positionY: number) {
        this.id = id;
        this.nick = nick;
        this.outfit = outfit;
        this.positionX = positionX;
        this.positionY = positionY;

        this.image = new Image();
        this.image.src = this.outfit;

        this.animatedX = new AnimatedValue(this.positionX * 32);
        this.animatedY = new AnimatedValue(this.positionY * 32);
    }

    public getRenderereObject() : IRenderObject {
        const characterWidth = 32;
        const characterHeight = 48;

        this.animatedX.change(this.positionX * 32);
        this.animatedY.change(this.positionY * 32);

        return {
            id: this.id,
            image: this.image,
            sx: 0,
            sy: 0,
            sw: characterWidth,
            sh: characterHeight,
            dx: this.animatedX,
            dy: this.animatedY,
            dw: characterWidth,
            dh: characterHeight
        }
    }
}