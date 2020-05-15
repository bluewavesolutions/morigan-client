import { Mediator } from "../core/events/Mediator";
import { IMapObject } from "../core/renderer/interfaces/IMapObject";
import { IMapServerModel } from "../communication/interfaces/serverModels/IMapServerModel";
import { singleton } from "tsyringe";
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

    public realX = 0;
    public realY = 0;

    constructor(
        private mediator: Mediator,
        private camera: Camera
    ) {
        this.mediator.registerHandler('Ground::Load', (mapServerModel: IMapServerModel) => {
            this.widthInPixels = mapServerModel.WidthInPixels;
            this.heightInPixels = mapServerModel.HeightInPixels;

            this.image = new Image();
            this.image.src = mapServerModel.ResourceFile;

            this.width = mapServerModel.Width;
            this.height = mapServerModel.Height;

            this.camera.attachGround(this);
            this.camera.centerToCharacter();

            this.mediator.publish({
                type: 'Ground::Loaded',
                data: {}
            });
        });
    }

    public isLoaded(): boolean {
        return typeof(this.image) !== typeof(undefined);
    }

    public prepareRendererObject(): IMapObject {
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