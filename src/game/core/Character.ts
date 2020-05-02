import { EngineMediator } from "../utils/EngineMediator";
import { IRenderObject } from "./interfaces/IRenderObject";
import { EngineStore } from "../store/EngineStore";
import { ICharacterServerModel } from "../server/interfaces/serverModels/ICharacterServerModel";
import { AnimatedValue } from "../utils/AnimatedValue";
import { singleton } from "tsyringe";
import { Camera } from "./Camera";

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

    public animatedPositionX = new AnimatedValue(0);
    public animatedPositionY = new AnimatedValue(0);

    public positionX: number = 0;
    public positionY: number = 0;

    private stepX : number = 0;
    private stepY: number = 0;

    private lastDirection: string = '';

    constructor(
        private engineMediator: EngineMediator,
        private engineStore: EngineStore,
        private camera: Camera
    ) {
        this.engineMediator.registerHandler('Character::Load', (characterServerModel: ICharacterServerModel) => {
            this.id = characterServerModel.Id;
            this.positionX = characterServerModel.PositionX;
            this.positionY = characterServerModel.PositionY;

            this.animatedPositionX.reset(this.positionX * 32);
            this.animatedPositionY.reset(this.positionY * 32);

            this.image = new Image();
            this.image.src = characterServerModel.Outfit;

            this.camera.attachCharacter(this);
        });

        this.engineMediator.registerHandler('Character::ChangedDirection', (direction: string) => {
            this.direction(direction);

            // this.engineMediator.publish({
            //     type: 'Server::SendMessage',
            //     data: {
            //         Type: 'MOVE',
            //         Data: {
            //             SessionToken: this.engineStore.session,
            //             PositionX: this.positionX,
            //             PositionY: this.positionY
            //         }
            //     }
            // })
        });

        this.engineMediator.registerHandler('Camera::Loaded', (data: any) => {
            this.animatedPositionX.change((data.x * 32) + (this.positionX * 32));
            this.animatedPositionY.change((data.y * 32) + (this.positionY * 32));
        });
    }

    public move(direction: string) {
        if(direction === null) { 
            return; 
        }

        if (direction === 'up') {
            this.positionY--;
        } 
        if (direction === 'down') {
            this.positionY++;
        }
        if (direction === 'left') {
            this.positionX--;
        }
        if (direction === 'right') {
            this.positionX++;
        }

        this.animatedPositionX.change((this.camera.positionX * 32) + (this.positionX * 32));
        this.animatedPositionY.change((this.camera.positionY * 32) + (this.positionY * 32));

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
    }

    public direction(direction: string) {
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

        return {
            id: this.id,
            image: this.image,
            sx: this.stepX,
            sy: this.stepY,
            sw: characterWidth,
            sh: characterHeight,
            dx: this.animatedPositionX,
            dy: this.animatedPositionY,
            dw: characterWidth,
            dh: characterHeight
        } as IRenderObject;
    }
}