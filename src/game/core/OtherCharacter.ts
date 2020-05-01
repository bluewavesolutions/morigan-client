import { AnimatedValue } from "./AnimatedValue";
import { IRenderObject } from "./interfaces/IRenderObject";
import { Character } from "./Character";

export class OtherCharacter {
    private character: Character;
    public id: number;
    public nick: string;
    public outfit: string;
    public positionX: number;
    public positionY: number;
    public image: HTMLImageElement;
    public animatedX: AnimatedValue;
    public animatedY: AnimatedValue;

    constructor(character: Character, id: number, nick: string, outfit: string, positionX: number, positionY: number) {
        this.character = character;
        this.id = id;
        this.nick = nick;
        this.outfit = outfit;
        this.positionX = positionX;
        this.positionY = positionY;

        this.image = new Image();
        this.image.src = this.outfit;

        this.animatedX = new AnimatedValue((this.positionX - this.character.mapPositionX) * 32);
        this.animatedY = new AnimatedValue((this.positionY - this.character.mapPositionY) * 32);
    }

    public getRenderereObject() : IRenderObject {
        const characterWidth = 32;
        const characterHeight = 48;

        this.animatedX.change((this.positionX - this.character.mapPositionX) * 32);
        this.animatedY.change((this.positionY - this.character.mapPositionY) * 32);

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