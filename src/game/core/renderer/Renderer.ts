import { Ground } from "../../components/Ground";
import { OtherCharactersManager } from "../../managers/OtherCharactersManager";
import { Character } from "../../components/Character";
import { AnimationManager } from "../animations/AnimationManager";
import { Tooltip } from "../../components/Tooltip";
import { GameWindow } from "./GameWindow";

export class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(
        private animationManager: AnimationManager,
        private gameWindow: GameWindow,
        private character: Character,
        private ground: Ground,
        private tooltip: Tooltip,
        private otherCharactersManager: OtherCharactersManager
    ) {
        this.canvas = document.getElementById('game') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d', {alpha: false}) as CanvasRenderingContext2D;

        this.resizeCanvas();

        window.addEventListener('DOMContentLoaded', () => {
            this.resizeCanvas();
        }, false);

        window.addEventListener('resize', () => {
            this.resizeCanvas();
        }, false);
    }

    private resizeCanvas() {
        const { width, height } = this.gameWindow.dimensions();

        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;

        this.context.scale(window.devicePixelRatio, window.devicePixelRatio);

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
    }

    public start() {
        requestAnimationFrame((time: number) => {
            this.render(time);
        });
    }

    private render(time: number) {
        this.animationManager.update(time);

        const { context, otherCharactersManager } = this;

        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        context.fillStyle = "#000";
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);

        if (this.ground.isLoaded()) {
            const ground = this.ground.prepareRendererObject();
            context.drawImage(ground.image, ground.dx, ground.dy);
        }

        for (let renderObject of otherCharactersManager.prepareRendererObjects()) {
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
            const character = this.character.prepareRendererObject();

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

        if (this.tooltip.isVisible()) {
            const tooltip = this.tooltip.prepareRendererObject();
            context.save();

            context.fillStyle = '#73A942';
            context.fillRect(tooltip.x + 6, 
                tooltip.y - 12, 
                context.measureText(tooltip.text).width + 26, 
                14);

            context.strokeStyle = '#1A4301';
            context.lineWidth = 2;
            context.strokeRect(tooltip.x + 6, 
                tooltip.y - 12, 
                context.measureText(tooltip.text).width + 26, 
                14);
            
            context.fillStyle = '#143601';
            context.font = "8px pixelFont";
            context.fillText(tooltip.text, 
                tooltip.x + 10, 
                tooltip.y - 2,
                context.measureText(tooltip.text).width);
            
            context.restore();
        }

        requestAnimationFrame((time: number) => {
            this.render(time);
        });
    }
}