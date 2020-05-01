import { EngineMediator } from "./EngineMediator";
import { IMapObject } from "./interfaces/IMapObject";
import { IMap } from "../servcer/interfaces/serverModels/IMap";
import { ICharacter } from "../servcer/interfaces/serverModels/ICharacter";
import { AnimatedValue } from "./AnimatedValue";

export class Ground {
    private engineMediator: EngineMediator;
    private map: IMap | undefined;
    private character: ICharacter | undefined;
    private mapImage: HTMLImageElement | undefined;

    constructor(engineMediator: EngineMediator) {
        this.engineMediator = engineMediator;

        this.engineMediator.registerHandler('Ground::Load', (data: any) => {
            this.map = data.map;
            this.mapImage = new Image();
            this.mapImage.src = data.map.ResourceFile;

            this.character = data.character as ICharacter;
            const { x,y } = this.calculatedMapPosition();

            this.engineMediator.publish({
                type: 'Ground::Loaded',
                data: {
                    x: Math.round(Math.abs(x / 32)),
                    y: Math.round(Math.abs(y / 32))
                }
            });
 
            data.character.AnimatedMapPositionX.reset(x);
            data.character.AnimatedMapPositionY.reset(y);
        });
    }

    private calculatedMapPosition() {
        const character = this.character as ICharacter;
        const map = this.map as IMap;
        
        let marginX = (window.innerWidth - map.WidthInPixels) / 2;
        let marginY = (window.innerHeight - map.HeightInPixels) / 2;

        if (marginX < 0) {
            marginX = 0;
        }

        if (marginY < 0) {
            marginY = 0;
        }

        let calculatedX = (window.innerWidth / 2) - (character.PositionX * 32);
        let calculatedY = (window.innerHeight / 2) - (character.PositionY * 32);

        const lockedLeft = calculatedX >= 0;
        character.CameraLock.Left = lockedLeft;
        if (lockedLeft) {
            calculatedX = marginX;
        }

        const lockedRight = calculatedX <= -map.WidthInPixels + window.innerWidth - marginX;
        character.CameraLock.Right = lockedRight;
        if (lockedRight) {
            calculatedX = -map.WidthInPixels + window.innerWidth - marginX;
        }

        const lockedTop = calculatedY >= marginY;
        character.CameraLock.Top = lockedTop;
        if (lockedTop) {
            calculatedY = marginY;
        }

        const lockedBottom = calculatedY <= -map.HeightInPixels + window.innerHeight - marginY;
        character.CameraLock.Bottom = lockedBottom;
        if (lockedBottom) {
            calculatedY = -map.HeightInPixels + window.innerHeight - marginY;
        }

        return { 
            x: calculatedX, 
            y: calculatedY 
        };
    }

    public isLoaded() : boolean {
        return typeof(this.map) !== typeof(undefined);
    }

    public getGroundRenderObject() : IMapObject {
        const character = this.character as ICharacter;
        var { x, y } = this.calculatedMapPosition();
        
        character.AnimatedMapPositionX.change(x);
        character.AnimatedMapPositionY.change(y);

        return {
            image: this.mapImage as HTMLImageElement,
            dx: character.AnimatedMapPositionX,
            dy: character.AnimatedMapPositionY
        };
    }
}