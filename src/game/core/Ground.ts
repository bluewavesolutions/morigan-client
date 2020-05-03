import { EngineMediator } from "../utils/EngineMediator";
import { IMapObject } from "./interfaces/IMapObject";
import { IMapServerModel } from "../server/interfaces/serverModels/IMapServerModel";
import { singleton } from "tsyringe";
import { Camera } from "./Camera";
import { AnimationManager } from "./managers/AnimationManager";

@singleton()
export class Ground {
    private image: HTMLImageElement | undefined;

    public width: number = 0;
    public height: number = 0;

    private widthInPixels: number = 0;
    private heightInPixels: number = 0;

    public positionX = 0;
    public positionY = 0;

    public realX = 0;
    public realY = 0;

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

        this.engineMediator.registerHandler('Camera::Loaded', (camera: any) => {
            this.realX = (camera.x * 32) + (this.positionX * 32);
            this.realY = (camera.y * 32) + (this.positionY * 32);
        });
    }

    public isLoaded() : boolean {
        return typeof(this.image) !== typeof(undefined);
    }

    public getGroundRenderObject() : IMapObject {
        const { cameraRealX, cameraRealY } = this.camera.getPosition();
        const x = cameraRealX + this.realX;
        const y = cameraRealY + this.realY;

        return {
            image: this.image as HTMLImageElement,
            dx: x,
            dy: y
        };
    }
}