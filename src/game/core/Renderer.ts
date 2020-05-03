import { Ground } from "./Ground";
import { Character } from "./Character";
import { OtherCharactersManager } from "./managers/OtherCharactersManager";
import { injectable } from "tsyringe";
import { Camera } from "./Camera";
import { EngineMediator } from "../utils/EngineMediator";

@injectable()
export class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private direction: string = null;
    private startTime: number = null;

    constructor(
        private engineMediator: EngineMediator,
        private camera: Camera,
        private character: Character,
        private ground: Ground,
        private otherCharactersManager: OtherCharactersManager
    ) 
    {
        this.canvas = document.getElementById('game') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        window.addEventListener('load', () => {
            this.canvas.width = window.innerWidth - 5;
            this.canvas.height = window.innerHeight - 5;
        }, false); 

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth - 5;
            this.canvas.height = window.innerHeight - 5;
        }, false);

        this.engineMediator.registerHandler('Character::ChangedDirection', (direction: string) => {
            this.direction = direction;
        });
    }

    public start() {
        requestAnimationFrame((time: number) => {
            this.render(time);
        });
    }

    private render(time: number) {
        const { context, otherCharactersManager } = this;

        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if(this.ground.isLoaded()) {
            const ground = this.ground.getGroundRenderObject();
            context.drawImage(ground.image, ground.dx, ground.dy);
        }

        for(let renderObject of otherCharactersManager.getCharacterRenderObjects()) {
            context.drawImage(renderObject.image, 
                renderObject.sx, 
                renderObject.sy,
                renderObject.sw,
                renderObject.sh,
                renderObject.dx,
                renderObject.dy,
                renderObject.dw,
                renderObject.dh);
        }

        if (this.character.isLoaded()) {
            const character = this.character.getCharacterRenderObject();

            context.drawImage(character.image, 
                character.sx, 
                character.sy,
                character.sw,
                character.sh,
                character.dx,
                character.dy,
                character.dw,
                character.dh);
        }

        requestAnimationFrame((time: number) => {
            this.update(time / 300);
            this.render(time);
        });
    }

    private update(time: number) {
        if (this.startTime === null) {
            this.startTime = time;
        }

        const deltaTime = time - this.startTime;
        if (deltaTime < 1) {
            return;
        }

        this.camera.move(this.direction);
        this.character.move(this.direction);
        this.ground.move(this.direction);
        this.otherCharactersManager.move(this.direction);

        this.startTime = null;
    }
}