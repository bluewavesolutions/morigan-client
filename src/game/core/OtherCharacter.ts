import { AnimatedValue } from "../utils/AnimatedValue";
import { IRenderObject } from "./interfaces/IRenderObject";
import { Camera } from "./Camera";
import { EngineMediator } from "../utils/EngineMediator";

export class OtherCharacter {
    private camera: Camera;
    private engineMediator: EngineMediator;
    public id: number;
    public nick: string;
    public outfit: string;
    public positionX: number;
    public positionY: number;
    public image: HTMLImageElement;
    public animatedX: AnimatedValue;
    public animatedY: AnimatedValue;

    constructor(camera: Camera, 
        engineMediator: EngineMediator, 
        id: number, 
        nick: string, 
        outfit: string, 
        positionX: number, 
        positionY: number
    ) {
        this.camera = camera;
        this.engineMediator = engineMediator;
        this.id = id;
        this.nick = nick;
        this.outfit = outfit;
        this.positionX = positionX;
        this.positionY = positionY;

        this.image = new Image();
        this.image.src = this.outfit;

        this.animatedX = new AnimatedValue((this.camera.positionX * 32) + (this.positionX * 32));
        this.animatedY = new AnimatedValue((this.camera.positionY * 32) + (this.positionY * 32));

        this.engineMediator.registerHandler('Character::ChangedDirection', (direction: string) => {
            this.animatedX.change((this.camera.positionX * 32) + (this.positionX * 32));
            this.animatedY.change((this.camera.positionY * 32) + (this.positionY * 32));
        });
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
            dx: this.animatedX,
            dy: this.animatedY,
            dw: characterWidth,
            dh: characterHeight
        }
    }
}