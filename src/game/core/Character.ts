import { EngineMediator } from "./EngineMediator";
import { IRenderObject } from "./interfaces/IRenderObject";
import { EngineStore } from "../store/EngineStore";
import { ICharacter } from "../servcer/interfaces/serverModels/ICharacter";
import { AnimatedValue } from "./AnimatedValue";

export class Character {
    private engineMediator: EngineMediator;
    private engineStore: EngineStore;
    private character: ICharacter | undefined;
    private characterImage: HTMLImageElement | undefined;

    private stepX : number = 0;
    private stepY: number = 0;
    private lastDirection: string = '';

    constructor(engineMediator: EngineMediator, engineStore: EngineStore) {
        this.engineMediator = engineMediator;
        this.engineStore = engineStore;

        this.engineMediator.registerHandler('Character::Load', (character: ICharacter) => {
            this.character = character;
            this.character.CameraLock = {
                Left: false,
                Right: false,
                Top: false,
                Bottom: false
            };

            const { x, y } = this.calculatedCharacterPosition();
            
            this.character.AnimatedMapPositionX = new AnimatedValue(x);
            this.character.AnimatedMapPositionY = new AnimatedValue(y);

            this.character.AnimatedPositionX = new AnimatedValue(x);
            this.character.AnimatedPositionY = new AnimatedValue(y);

            this.characterImage = new Image();
            this.characterImage.src = character.Outfit;
        });

        this.engineMediator.registerHandler('Ground::Loaded', (data: any) => {
            const character = this.character as ICharacter;
            character.MapPositionX = data.x;
            character.MapPositionY = data.y;

            const { x, y } = this.calculatedCharacterPosition();
            
            character.AnimatedMapPositionX.reset(x);
            character.AnimatedMapPositionY.reset(y);

            character.AnimatedPositionX.reset(x);
            character.AnimatedPositionY.reset(y);
        });

        this.engineMediator.registerHandler('Character::ChangedDirection', (data: string) => {
            const character = this.character as ICharacter;
            const mapPositionXAlreadyAnimated = character.AnimatedMapPositionX.isAlreadyAnimated();
            const mapPositionYAlreadyAnimated = character.AnimatedMapPositionY.isAlreadyAnimated();
            const characterPositionXAlreadtAnimated = character.AnimatedPositionX.isAlreadyAnimated();
            const characterPositionYAlreadtAnimated = character.AnimatedPositionY.isAlreadyAnimated();
            
            if (data === 'up') {
                this.move(48 * 3);

                if (mapPositionYAlreadyAnimated && characterPositionYAlreadtAnimated) {
                    character.PositionY--;
                }
            } else if (data === 'down') {
                this.move(0);
                
                if (mapPositionYAlreadyAnimated && characterPositionYAlreadtAnimated) {
                    character.PositionY++;
                }
            } else if (data === 'left') {
                this.move(48);

                if (mapPositionXAlreadyAnimated && characterPositionXAlreadtAnimated) {
                    character.PositionX--;
                }
            } else if(data === 'right') {
                this.move(48 * 2);
                    
                if (mapPositionXAlreadyAnimated && characterPositionXAlreadtAnimated) {
                    character.PositionX++;
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
                type: 'SERVER_SEND_MESSAGE',
                data: {
                    Type: 'MOVE',
                    Data: {
                        SessionToken: this.engineStore.session,
                        PositionX: this.character?.PositionX,
                        PositionY: this.character?.PositionY
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
        const character = this.character as ICharacter;
        var calculatedX = character.PositionX * 32;
        var calculatedY = character.PositionY * 32;

        if (character.CameraLock.Right) {
            calculatedX = (character.PositionX * 32) - (character.MapPositionX * 32);
        }

        if (character.CameraLock.Bottom) {
            calculatedY = (character.PositionY * 32) - (character.MapPositionY * 32);
        }

        if (character.CameraLock.Left == false && character.CameraLock.Right == false) {
            calculatedX = (window.innerWidth / 2);
        }

        if (character.CameraLock.Top == false && character.CameraLock.Bottom == false) {
            calculatedY = (window.innerHeight / 2);
        }

        return {
            x: calculatedX,
            y: calculatedY
        }
    }

    public isLoaded() : boolean {
        return typeof(this.character) !== typeof(undefined);
    }

    public getCharacterRenderObject() : IRenderObject {
        const character = this.character as ICharacter;
        const characterImage = this.characterImage as HTMLImageElement;
        const characterWidth = 32;
        const characterHeight = 48;

        const { x, y } = this.calculatedCharacterPosition();

        character.AnimatedPositionX.change(x);
        character.AnimatedPositionY.change(y);

        return {
            id: character.Id,
            image: characterImage,
            sx: this.stepX,
            sy: this.stepY,
            sw: characterWidth,
            sh: characterHeight,
            dx: character.AnimatedPositionX,
            dy: character.AnimatedPositionY,
            dw: characterWidth,
            dh: characterHeight
        } as IRenderObject;
    }
}