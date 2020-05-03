import { IRenderObject } from "../core/renderer/interfaces/IRenderObject";
import { Camera } from "./Camera";
import { AnimationManager } from "../core/animations/AnimationManager";
import { Direction } from "../managers/KeyboardManager";

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

    private lastDirection: string;
    private stepX : number = 0;
    private stepY: number = 0;

    private animationLock: boolean = false;

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

    public async move(x: number, y: number) {
        if (this.animationLock) {
            return;
        }

        const direction = this.direction(x,y);
        switch (direction) {
            case 'up':
                this.stepY = 48 * 3;
                break;
            case 'left':
                this.stepY = 48;
                break;
            case 'down':
                this.stepY = 0;
                break;
            case 'right':
                this.stepY = 48 * 2;
                break;
            default:
                break;
        }

        this.stepX += 32;
        if(this.stepX >= 32*4) {
            this.stepX = 0;
        }

        let positionX = x;
        let positionY = y;

        this.animationLock = true;

        await this.animationManager.animateTo(this, { positionX, positionY }, 1000.0 / 6.5, (percentage) => {
            console.log({
                x: this.positionX,
                y: this.positionY
            })

            this.realX = (this.positionX) * 32;
            this.realY = (this.positionY) * 32;
        });

        this.animationLock = false;
    }

    private direction(x:number, y:number) : Direction {
        let deltaX = this.positionX - x;
        let deltaY = this.positionY - y;

        if(deltaX > 0) {
            return 'left';
        } else if (deltaX < 0) {
            return 'right';
        } else if (deltaY > 0) {
            return 'up';
        } else if (deltaY < 0) {
            return 'down';
        }
    }

    public getRenderereObject() : IRenderObject {
        const characterWidth = 32;
        const characterHeight = 48;

        const { cameraRealX, cameraRealY } = this.camera.getPosition();
        const x = (cameraRealX) + this.realX;
        const y = (cameraRealY) + this.realY;

        return {
            id: this.id,
            image: this.image,
            sx: this.stepX,
            sy: this.stepY,
            sw: characterWidth,
            sh: characterHeight,
            dx: x,
            dy: y,
            dw: characterWidth,
            dh: characterHeight
        }
    }
}