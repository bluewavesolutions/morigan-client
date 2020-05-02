import { Ground } from "./Ground";
import { Character } from "./Character";
import { OtherCharactersManager } from "./managers/OtherCharactersManager";
import { injectable } from "tsyringe";

@injectable()
export class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(
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
            ground.dx.updateOnRedner(time);
            ground.dy.updateOnRedner(time);

            context.drawImage(ground.image, ground.dx.currentValue(), ground.dy.currentValue());
        }

        for(let renderObject of otherCharactersManager.getCharacterRenderObjects()) {
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

        if (this.character.isLoaded()) {
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