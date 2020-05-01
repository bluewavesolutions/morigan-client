import { EngineMediator } from "../utils/EngineMediator";
import { IMapObject } from "./interfaces/IMapObject";
import { IMapServerModel } from "../servcer/interfaces/serverModels/IMapServerModel";
import { Character } from "./Character";

export class Ground {
    private engineMediator: EngineMediator;
    private character: Character;
    private image: HTMLImageElement | undefined;

    private widthInPixels: number = 0;
    private heightInPixels: number = 0;

    constructor(engineMediator: EngineMediator, character: Character) {
        this.engineMediator = engineMediator;
        this.character = character;

        this.engineMediator.registerHandler('Ground::Load', (mapServerModel: IMapServerModel) => {
            this.widthInPixels = mapServerModel.WidthInPixels;
            this.heightInPixels = mapServerModel.HeightInPixels;

            this.image = new Image();
            this.image.src = mapServerModel.ResourceFile;

            const { x,y } = this.calculatedMapPosition();

            this.engineMediator.publish({
                type: 'Ground::Loaded',
                data: {
                    x: Math.round(Math.abs(x / 32)),
                    y: Math.round(Math.abs(y / 32))
                }
            });
 
            this.character.animatedMapPositionX.reset(x);
            this.character.animatedMapPositionY.reset(y);
        });
    }

    private calculatedMapPosition() {
        const character = this.character;
        
        let marginX = (window.innerWidth - this.widthInPixels) / 2;
        let marginY = (window.innerHeight - this.heightInPixels) / 2;

        if (marginX < 0) {
            marginX = 0;
        }

        if (marginY < 0) {
            marginY = 0;
        }

        let calculatedX = (window.innerWidth / 2) - (character.positionX * 32);
        let calculatedY = (window.innerHeight / 2) - (character.positionY * 32);

        const lockedLeft = calculatedX >= 0;
        character.cameraLock.left = lockedLeft;
        if (lockedLeft) {
            calculatedX = marginX;
        }

        const lockedRight = calculatedX <= -this.widthInPixels + window.innerWidth - marginX;
        character.cameraLock.right = lockedRight;
        if (lockedRight) {
            calculatedX = -this.widthInPixels + window.innerWidth - marginX;
        }

        const lockedTop = calculatedY >= marginY;
        character.cameraLock.top = lockedTop;
        if (lockedTop) {
            calculatedY = marginY;
        }

        const lockedBottom = calculatedY <= -this.heightInPixels + window.innerHeight - marginY;
        character.cameraLock.bottom = lockedBottom;
        if (lockedBottom) {
            calculatedY = -this.heightInPixels + window.innerHeight - marginY;
        }

        this.character.mapPositionX = Math.abs(Math.round(calculatedX / 32));
        this.character.mapPositionY = Math.abs(Math.round(calculatedY / 32));

        return { 
            x: calculatedX, 
            y: calculatedY 
        };
    }

    public isLoaded() : boolean {
        return typeof(this.image) !== typeof(undefined);
    }

    public getGroundRenderObject() : IMapObject {
        const character = this.character;
        var { x, y } = this.calculatedMapPosition();
        
        character.animatedMapPositionX.change(x);
        character.animatedMapPositionY.change(y);

        return {
            image: this.image as HTMLImageElement,
            dx: character.animatedMapPositionX,
            dy: character.animatedMapPositionY
        };
    }
}