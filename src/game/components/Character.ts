import { Mediator } from "../core/events/Mediator";
import { EngineStore } from "../store/EngineStore";
import { ICharacterServerModel } from "../communication/interfaces/serverModels/ICharacterServerModel";
import { singleton } from "tsyringe";
import { Camera } from "./Camera";
import { Direction } from "../managers/KeyboardManager";
import { IRenderObject } from "../core/renderer/interfaces/IRenderObject";
import { AnimationManager } from "../core/animations/AnimationManager";

@singleton()
export class Character {
    private id: number = 0;

    private image: HTMLImageElement | undefined;
    public cameraLock = {
        left: false,
        right: false,
        top: false,
        bottom: false
    };

    public realX = 0;
    public realY = 0;

    public positionX: number = 0;
    public positionY: number = 0;

    private stepX : number = 0;
    private stepY: number = 0;
    
    public animationLock = false;

    private lastDirection: string = '';

    constructor(
        private mediator: Mediator,
        private engineStore: EngineStore,
        private camera: Camera,
        private animationManager: AnimationManager
    ) {
        this.mediator.registerHandler('Character::Load', (characterServerModel: ICharacterServerModel) => {
            this.id = characterServerModel.Id;
            this.positionX = characterServerModel.PositionX;
            this.positionY = characterServerModel.PositionY;

            this.realX = this.positionX * 32;
            this.realY = this.positionY * 32;

            this.image = new Image();
            this.image.src = characterServerModel.Outfit;

            this.camera.attachCharacter(this);
        });

        this.mediator.registerHandler('Character::ChangedDirection', async (direction: Direction) => {
            await this.move(direction);
            if (direction === null) {
                this.direction(this.lastDirection);
            }
        });
    }

    public async move(direction: Direction) {
        if (direction === null) { 
            return; 
        }

        if (direction === 'cam_up' || direction === 'cam_down' || direction === 'cam_left' || direction == 'cam_right') {
            return;
        }

        this.lastDirection = direction;

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

        if (this.animationLock) {
            return;
        }

        let { positionX, positionY } = this;

        if (direction === 'up') {
            positionY--;
        } 
        if (direction === 'down') {
            positionY++;
        }
        if (direction === 'left') {
            positionX--;
        }
        if (direction === 'right') {
            positionX++;
        }

        this.animationLock = true;

        await this.animationManager.animateTo(this, { positionX, positionY }, 1000.0 / 4.5, (percentage) => {
            this.realX = (this.positionX) * 32;
            this.realY = (this.positionY) * 32;
        });

        this.realX = (positionX) * 32;
        this.realY = (positionY) * 32;
        this.animationLock = false;

        this.mediator.publish({
            type: 'Server::SendMessage',
            data: {
                Type: 'MOVE',
                Data: {
                    SessionToken: this.engineStore.session,
                    PositionX: this.positionX,
                    PositionY: this.positionY
                }
            }
        })

        await this.camera.centerToCharacterAnimated();
    }

    public async direction(direction: string) {
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

        this.stepX = 0;
    }

    public isLoaded() : boolean {
        return typeof(this.image) !== typeof(undefined);
    }

    public getCharacterRenderObject() : IRenderObject {
        const characterWidth = 32;
        const characterHeight = 48;

        const { cameraRealX, cameraRealY } = this.camera.getPosition();
        const x = cameraRealX + this.realX;
        const y = cameraRealY + this.realY;

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
        } as IRenderObject;
    }
}