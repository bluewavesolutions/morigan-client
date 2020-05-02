import { EngineMediator } from "../utils/EngineMediator";
import { IMapObject } from "./interfaces/IMapObject";
import { IMapServerModel } from "../server/interfaces/serverModels/IMapServerModel";
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

        this.engineMediator.registerHandler('Camera::Loaded', (data: any) => {
            this.animatedPositionX.change((data.x * 32) + (this.positionX * 32));
            this.animatedPositionY.change((data.y * 32) + (this.positionY * 32));
        });
    }

    public move(direction: string) {
        this.animatedPositionX.change((this.camera.positionX * 32) + (this.positionX * 32));
        this.animatedPositionY.change((this.camera.positionY * 32) + (this.positionY * 32));
    }

    public isLoaded() : boolean {
        return typeof(this.image) !== typeof(undefined);
    }

    public getGroundRenderObject() : IMapObject {
        return {
            image: this.image as HTMLImageElement,
            dx: this.animatedPositionX,
            dy: this.animatedPositionY
        };
    }
}