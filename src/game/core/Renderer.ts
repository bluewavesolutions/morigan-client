import { EngineMediator } from "./EngineMediator";
import { IRenderObject } from "./interfaces/IRenderObject";
import { Ground } from "./Ground";
import { Character } from "./Character";

export class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private character: Character;
    private ground: Ground;

    private orderedRenderObjects: IRenderObject[] = [];

    constructor(canvas: HTMLCanvasElement, engineMediator: EngineMediator, ground: Ground, character: Character) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.character = character;
        this.ground = ground;

        window.addEventListener('load', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }, false); 

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }, false);

        engineMediator.registerHandler('ENGINE_ADD_OBJECT_TO_RENDERER', (renderObject: IRenderObject) => {
            this.orderedRenderObjects.push(renderObject);
        });
    }

    public start() {
        requestAnimationFrame((time: number) => {
            this.render(time);
        });
    }

    private render(time: number) {
        const { context, orderedRenderObjects } = this;

        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if(this.ground.isLoaded()) {
            const ground = this.ground.getGroundRenderObject();
            ground.dx.updateOnRedner(time);
            ground.dy.updateOnRedner(time);

            context.drawImage(ground.image, ground.dx.currentValue(), ground.dy.currentValue());
        }

        for(let renderObject of orderedRenderObjects) {
            renderObject.dx.updateOnRedner(time);
            renderObject.dy.updateOnRedner(time);

            context.drawImage(renderObject.image, 
                renderObject.sx, 
                renderObject.sy,
                renderObject.sw,
                renderObject.sh,
                renderObject.dx.currentValue(),
                renderObject.dy.currentValue(),
                renderObject.dw,
                renderObject.dh);
        }

        if(this.character.isLoaded()) {
            const character = this.character.getCharacterRenderObject();
            character.dx.updateOnRedner(time);
            character.dy.updateOnRedner(time);

            context.drawImage(character.image, 
                character.sx, 
                character.sy,
                character.sw,
                character.sh,
                character.dx.currentValue(),
                character.dy.currentValue(),
                character.dw,
                character.dh);
        }

        requestAnimationFrame((time: number) => {
            this.render(time);
        });
    }
}