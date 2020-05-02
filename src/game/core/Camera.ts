import { singleton } from "tsyringe";
import { EngineMediator } from "../utils/EngineMediator";
import { Character } from "./Character";
import { Ground } from "./Ground";

@singleton()
export class Camera {
    public positionX : number = 0;
    public positionY: number = 0;

    public maxX : number = 0;
    public maxY: number = 0;

    private character: Character;
    private ground: Ground;

    public move(direction: string) {
        if (direction === null) {
            return;
        }

        let lock = {
            left: this.positionX >= 0
            || this.character.positionX < (window.innerWidth / 2 - 32) / 32,
            right: this.maxX - this.positionX > 0
                || this.character.positionY < Math.abs((this.maxX - ((window.innerWidth / 2 + 32) / 32))),
            up: this.positionY >= 0
                || this.character.positionY > Math.abs((this.maxY - ((window.innerHeight / 2 + 48) / 32))),
            down: this.maxY - this.positionY > 0 
                || this.character.positionY < (window.innerHeight / 2 - 48) / 32
        };

        if (direction === 'up' && lock.up === false) {
            this.positionY++;
        } 
        if (direction === 'down' && lock.down === false) {
            this.positionY--;
        }
        if (direction === 'left' && lock.left === false) {
            this.positionX++;
        }
        if (direction === 'right' && lock.right === false) {
            this.positionX--;
        }
    }

    public attachCharacter(character: Character) {
        this.character = character;

        const x = (window.innerWidth / 2 - 32) / 32;
        const y = (window.innerHeight / 2 - 48) / 32;

        this.positionX = -this.character.positionX + x;
        this.positionY = -this.character.positionY + y;

        if (this.positionX > 0) {
            this.positionX = 0;
        }

        if (this.positionY > 0) {
            this.positionY = 0;
        }
    }

    public attachGround(ground: Ground) {
        this.ground = ground;

        const x = (window.innerWidth) / 32;
        const y = (window.innerHeight) / 32;

        this.maxX = -this.ground.width + x;
        this.maxY = -this.ground.height + y;
    }

    public getPosition() {
        return {
            x: this.positionX,
            y: this.positionY
        }
    }
}