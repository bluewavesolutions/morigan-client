import { IRenderObject } from "./interfaces/IRenderObject";
import { Camera } from "./Camera";
import { AnimationManager } from "./managers/AnimationManager";

export class OtherCharacter {
    private camera: Camera;
    private animationManager: AnimationManager;
    public id: number;
    public nick: string;
    public outfit: string;
    public positionX: number;
    public positionY: number;
    public image: HTMLImageElement;
    public realX: number;
    public realY: number;

    constructor(camera: Camera, 
        animationManager: AnimationManager,
        id: number, 
        nick: string, 
        outfit: string, 
        positionX: number, 
        positionY: number
    ) {
        this.camera = camera;
        this.animationManager = animationManager;
        this.id = id;
        this.nick = nick;
        this.outfit = outfit;
        this.positionX = positionX;
        this.positionY = positionY;

        this.image = new Image();
        this.image.src = this.outfit;

        const { cameraRealX, cameraRealY } = this.camera.getPosition();
        this.realX = (cameraRealX) + (this.positionX * 32);
        this.realY = (cameraRealY) + (this.positionY * 32);
    }

    public async move(direction: string) {
        const { cameraRealX, cameraRealY } = this.camera.getPosition();
        this.realX = (cameraRealX) + (this.positionX * 32);
        this.realY = (cameraRealY) + (this.positionY * 32);
    }

    public getRenderereObject() : IRenderObject {
        const characterWidth = 32;
        const characterHeight = 48;

        const { cameraRealX, cameraRealY } = this.camera.getPosition();
        const x = (cameraRealX) + (this.positionX * 32);
        const y = (cameraRealY) + (this.positionY * 32);

        return {
            id: this.id,
            image: this.image,
            sx: 0,
            sy: 0,
            sw: characterWidth,
            sh: characterHeight,
            dx: x,
            dy: y,
            dw: characterWidth,
            dh: characterHeight
        }
    }
}