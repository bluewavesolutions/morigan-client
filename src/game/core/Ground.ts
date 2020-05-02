import { EngineMediator } from "../utils/EngineMediator";
import { IMapObject } from "./interfaces/IMapObject";
import { IMapServerModel } from "../server/interfaces/serverModels/IMapServerModel";
import { Character } from "./Character";
import { singleton } from "tsyringe";
import { AnimatedValue } from "../utils/AnimatedValue";
import { Camera } from "./Camera";

@singleton()
export class Ground {
    private image: HTMLImageElement | undefined;

    public width: number = 0;
    public height: number = 0;

    private widthInPixels: number = 0;
    private heightInPixels: number = 0;

    public positionX = 0;
    public positionY = 0;

    public animatedPositionX = new AnimatedValue(0);
    public animatedPositionY = new AnimatedValue(0);

    constructor(
        private engineMediator: EngineMediator,
        private camera: Camera
    ) {
        this.engineMediator.registerHandler('Ground::Load', (mapServerModel: IMapServerModel) => {
            this.widthInPixels = mapServerModel.WidthInPixels;
            this.heightInPixels = mapServerModel.HeightInPixels;

            this.image = new Image();
            this.image.src = mapServerModel.ResourceFile;

            this.width = mapServerModel.Width;
            this.height = mapServerModel.Height;

            this.camera.attachGround(this);
        });

        this.engineMediator.registerHandler('Character::ChangedDirection', (direction: string) => {
            this.animatedPositionX.change((this.camera.positionX * 32) + (this.positionX * 32));
            this.animatedPositionY.change((this.camera.positionY * 32) + (this.positionY * 32));
        });

        this.engineMediator.registerHandler('Camera::Loaded', (data: any) => {
            this.animatedPositionX.change((data.x * 32) + (this.positionX * 32));
            this.animatedPositionY.change((data.y * 32) + (this.positionY * 32));
        });
    }

    // public calculatedMapPosition() {
    //     const character = this.character;
        
    //     let marginX = Math.round((window.innerWidth - this.widthInPixels) / 2);
    //     let marginY = Math.round((window.innerHeight - this.heightInPixels) / 2);

    //     if (marginX < 0) {
    //         marginX = 0;
    //     }

    //     if (marginY < 0) {
    //         marginY = 0;
    //     }

    //     let calculatedX = (window.innerWidth / 2) - (character.positionX * 32);
    //     let calculatedY = (window.innerHeight / 2) - (character.positionY * 32);

    //     const lockedLeft = calculatedX >= 0;
    //     character.cameraLock.left = lockedLeft;
    //     if (lockedLeft) {
    //         calculatedX = marginX;
    //     }

    //     const lockedRight = calculatedX <= -this.widthInPixels + window.innerWidth - marginX;
    //     character.cameraLock.right = lockedRight;
    //     if (lockedRight) {
    //         calculatedX = -this.widthInPixels + window.innerWidth - marginX;
    //     }

    //     const lockedTop = calculatedY >= marginY;
    //     character.cameraLock.top = lockedTop;
    //     if (lockedTop) {
    //         calculatedY = marginY;
    //     }

    //     const lockedBottom = calculatedY <= -this.heightInPixels + window.innerHeight - marginY;
    //     character.cameraLock.bottom = lockedBottom;
    //     if (lockedBottom) {
    //         calculatedY = -this.heightInPixels + window.innerHeight - marginY;
    //     }

    //     this.character.mapPositionX = Math.abs(Math.fround(calculatedX / 32));
    //     this.character.mapPositionY = Math.abs(Math.fround(calculatedY / 32));

    //     return { 
    //         mapX: calculatedX, 
    //         mapY: calculatedY 
    //     };
    // }

    public isLoaded() : boolean {
        return typeof(this.image) !== typeof(undefined);
    }

    public getGroundRenderObject() : IMapObject {
        //const character = this.character;

        return {
            image: this.image as HTMLImageElement,
            dx: this.animatedPositionX,
            dy: this.animatedPositionY
        };
    }
}