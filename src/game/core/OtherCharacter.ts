import { IRenderObject } from "./interfaces/IRenderObject";
import { Camera } from "./Camera";

export class OtherCharacter {
    private camera: Camera;
    public id: number;
    public nick: string;
    public outfit: string;
    public positionX: number;
    public positionY: number;
    public image: HTMLImageElement;
    public realX: number;
    public realY: number;

    constructor(camera: Camera, 
        id: number, 
        nick: string, 
        outfit: string, 
        positionX: number, 
        positionY: number
    ) {
        this.camera = camera;
        this.id = id;
        this.nick = nick;
        this.outfit = outfit;
        this.positionX = positionX;
        this.positionY = positionY;

        this.image = new Image();
        this.image.src = this.outfit;

        this.realX = (this.camera.positionX * 32) + (this.positionX * 32);
        this.realY = (this.camera.positionY * 32) + (this.positionY * 32);
    }

    public move(direction: string) {
        this.realX = (this.camera.positionX * 32) + (this.positionX * 32);
        this.realY = (this.camera.positionY * 32) + (this.positionY * 32);
    }

    public getRenderereObject() : IRenderObject {
        const characterWidth = 32;
        const characterHeight = 48;

        return {
            id: this.id,
            image: this.image,
            sx: 0,
            sy: 0,
            sw: characterWidth,
            sh: characterHeight,
            dx: this.realX,
            dy: this.realY,
            dw: characterWidth,
            dh: characterHeight
        }
    }
}