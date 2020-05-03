import { singleton } from "tsyringe";
import { EngineMediator } from "../utils/EngineMediator";
import { Character } from "./Character";
import { Ground } from "./Ground";
import { AnimationManager } from "./managers/AnimationManager";
import { Direction } from "./KeyboardListener";

@singleton()
export class Camera {
    private positionX : number = 0;
    private positionY: number = 0;

    private realX : number = 0;
    private realY: number = 0;

    public maxX : number = 0;
    public maxY: number = 0;

    private character: Character;
    private ground: Ground;

    public animationLock: boolean = false;

    constructor(
        private engineMediator: EngineMediator,
        private animationManager: AnimationManager
    ) {
        this.engineMediator.registerHandler('Character::ChangedDirection', async (direction: Direction) => {
            await this.move(direction);
        });
    }

    public async move(direction: Direction) {
        if (direction === null) {
            return;
        }

        if (direction === 'up' || direction === 'left' || direction === 'right' || direction === 'down') {
            return;
        }

        if (this.animationLock) {
            return;
        }

        this.character.move(direction);

        if (direction === 'cam_down') {
            this.positionY -= 2;
        } 

        if (direction === 'cam_right') {
            this.positionX -= 2;
        }

        if (direction === 'cam_up') {
            this.positionY += 2;
        }

        if (direction === 'cam_left') {
            this.positionX += 2;
        }

        const realX = this.positionX * 32;
        const realY = this.positionY * 32;

        this.animationLock = true;

        await this.animationManager.animateTo(this, { realX, realY }, 1000.0 / 6.5);

        this.animationLock = false;
    }

    public attachCharacter(character: Character) {
        this.character = character;
    }

    public async centerToCharacter() {
        let positionX = -this.character.positionX + (window.innerWidth / 2 / 32) - 1;
        let positionY = -this.character.positionY + (window.innerHeight / 2 / 32) - 1;

        if (positionX > 0) {
            positionX = 0;
        }

        if (positionY > 0) {
            positionY = 0;
        }

        if (positionY < this.maxY) {
            positionY = this.maxY;
        }

        if (positionX < this.maxX) {
            positionX = this.maxX;
        }

        if (this.animationLock) {
            if (Math.abs(positionX - this.positionX) > 1 || Math.abs(positionY - this.positionY) > 1) {
                this.animationManager.updateAnimation(this, { positionX, positionY }, 1000.0);
            } else {
                this.animationManager.updateAnimation(this, { positionX, positionY }, 2500.0);
            }    

            return;
        }

        this.animationLock = true;

        await this.animationManager.animateTo(this, { positionX, positionY }, 2500.0, (percentage) => {
            this.realX = this.positionX * 32;
            this.realY = this.positionY * 32;
        });

        this.animationLock = false;
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
            cameraRealX: this.realX,
            cameraRealY: this.realY
        }
    }
}