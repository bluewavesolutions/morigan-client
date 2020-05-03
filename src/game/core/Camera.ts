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
            await this.centerToCharacter();
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

    private async centerToCharacter() {
        if (this.animationLock) {
            return;
        }

        this.positionX = -this.character.positionX + (window.innerWidth / 2 / 32) - 1;
        this.positionY = -this.character.positionY + (window.innerHeight / 2 / 32) - 1;

        if (this.positionX > 0) {
            this.positionX = 0;
        }

        if (this.positionY > 0) {
            this.positionY = 0;
        }

        if (this.positionY < this.maxY) {
            this.positionY = this.maxY;
        }

        if (this.positionX < this.maxX) {
            this.positionX = this.maxX;
        }

        let realX = this.positionX * 32;
        let realY = this.positionY * 32;

        this.animationLock = true;

        await this.animationManager.animateTo(this, { realX, realY }, 1000.0 / 2.5, (percentage) => {
            let currentPositionX = this.realX;
            let currentPositionY = this.realY;

            currentPositionX = Math.round(currentPositionX / 32) * 32;
            currentPositionY = Math.round(currentPositionY / 32) * 32;
            
            realX = currentPositionX;
            realY = currentPositionY;
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