import { EngineMediator } from "./EngineMediator";
import { IRenderObject } from "./interfaces/IRenderObject";
import { EngineStore } from "../store/EngineStore";
import { ICharacterServerModel } from "../servcer/interfaces/serverModels/ICharacterServerModel";
import { AnimatedValue } from "./AnimatedValue";

export class Character {
    private engineMediator: EngineMediator;
    private engineStore: EngineStore;

    private id: number = 0;

    private image: HTMLImageElement | undefined;
    public cameraLock = {
        left: false,
        right: false,
        top: false,
        bottom: false
    };

    public animatedMapPositionX = new AnimatedValue(0);
    public animatedMapPositionY = new AnimatedValue(0);

    private animatedPositionX = new AnimatedValue(0);
    private animatedPositionY = new AnimatedValue(0);

    public positionX: number = 0;
    public positionY: number = 0;

    public mapPositionX: number = 0;
    public mapPositionY: number = 0;

    private stepX : number = 0;
    private stepY: number = 0;
    private lastDirection: string = '';

    constructor(engineMediator: EngineMediator, engineStore: EngineStore) {
        this.engineMediator = engineMediator;
        this.engineStore = engineStore;

        this.engineMediator.registerHandler('Character::Load', (characterServerModel: ICharacterServerModel) => {
            this.id = characterServerModel.Id;
            this.positionX = characterServerModel.PositionX;
            this.positionY = characterServerModel.PositionY;

            const { x, y } = this.calculatedCharacterPosition();
            
            this.animatedMapPositionX.reset(x);
            this.animatedMapPositionY.reset(y);

            this.animatedPositionX.reset(x);
            this.animatedPositionY.reset(y);

            this.image = new Image();
            this.image.src = characterServerModel.Outfit;

            this.engineMediator.publish({
                type: 'Character::Loaded',
                data: {}
            });
        });

        this.engineMediator.registerHandler('Ground::Loaded', (data: any) => {
            this.mapPositionX = data.x;
            this.mapPositionY = data.y;

            const { x, y } = this.calculatedCharacterPosition();
            
            this.animatedMapPositionX.reset(x);
            this.animatedMapPositionY.reset(y);

            this.animatedPositionX.reset(x);
            this.animatedPositionY.reset(y);
        });

        this.engineMediator.registerHandler('Character::ChangedDirection', (data: string) => {
            const mapPositionXAlreadyAnimated = this.animatedMapPositionX.isAlreadyAnimated();
            const mapPositionYAlreadyAnimated = this.animatedMapPositionY.isAlreadyAnimated();
            const characterPositionXAlreadtAnimated = this.animatedPositionX.isAlreadyAnimated();
            const characterPositionYAlreadtAnimated = this.animatedPositionY.isAlreadyAnimated();
            
            if (data === 'up') {
                this.move(48 * 3);

                if (mapPositionYAlreadyAnimated && characterPositionYAlreadtAnimated) {
                    this.positionY--;
                }
            } else if (data === 'down') {
                this.move(0);
                
                if (mapPositionYAlreadyAnimated && characterPositionYAlreadtAnimated) {
                    this.positionY++;
                }
            } else if (data === 'left') {
                this.move(48);

                if (mapPositionXAlreadyAnimated && characterPositionXAlreadtAnimated) {
                    this.positionX--;
                }
            } else if(data === 'right') {
                this.move(48 * 2);
                    
                if (mapPositionXAlreadyAnimated && characterPositionXAlreadtAnimated) {
                    this.positionX++;
                }
            } else {
                if (this.lastDirection === 'up') {
                    this.stepY = 48 * 3;
                }
                if (this.lastDirection === 'down') {
                    this.stepY = 0;
                }
                if (this.lastDirection === 'left') {
                    this.stepY = 48;
                }
                if (this.lastDirection === 'right') {
                    this.stepY = 48 * 2;
                }
                
                if (this.stepX == 32) {
                    this.stepX = 64;
                } else {
                    this.stepX = 0;
                }
            }

            this.engineMediator.publish({
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
        });
    }

    private move(y: number) {
        this.stepY = y;
        this.stepX += 32;
        if(this.stepX >= 32*4) {
            this.stepX = 0;
        }
    }

    private calculatedCharacterPosition() {
        var calculatedX = this.positionX * 32;
        var calculatedY = this.positionY * 32;

        if (this.cameraLock.right) {
            calculatedX = (this.positionX * 32) - (this.mapPositionX * 32);
        }

        if (this.cameraLock.bottom) {
            calculatedY = (this.positionY * 32) - (this.mapPositionY * 32);
        }

        if (this.cameraLock.left == false && this.cameraLock.right == false) {
            calculatedX = (window.innerWidth / 2);
        }

        if (this.cameraLock.top == false && this.cameraLock.bottom == false) {
            calculatedY = (window.innerHeight / 2);
        }

        return {
            x: calculatedX,
            y: calculatedY
        }
    }

    public isLoaded() : boolean {
        return typeof(this.image) !== typeof(undefined);
    }

    public getCharacterRenderObject() : IRenderObject {
        const characterWidth = 32;
        const characterHeight = 48;

        const { x, y } = this.calculatedCharacterPosition();

        this.animatedPositionX.change(x);
        this.animatedPositionY.change(y);

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