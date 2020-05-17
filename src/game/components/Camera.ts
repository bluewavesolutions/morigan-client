import { Mediator } from "../core/events/Mediator";
import { Character } from "./Character";
import { Ground } from "./Ground";
import { Direction } from "../managers/KeyboardManager";
import { AnimationManager } from "../core/animations/AnimationManager";
import { GameWindow } from "../core/renderer/GameWindow";

export class Camera {
    private positionX: number = 0;
    private positionY: number = 0;

    private realX: number = 0;
    private realY: number = 0;

    public maxX: number = 0;
    public maxY: number = 0;

    public animationLock: boolean = false;

    private character: Character | undefined;
    private ground: Ground | undefined;

    constructor(
        private mediator: Mediator,
        private gameWindow: GameWindow,
        private animationManager: AnimationManager
    ) {
        this.mediator.registerHandler('Character::ChangedDirection', async (direction: Direction) => {
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

        await this.animationManager.animateTo(this, { realX, realY }, 1000.0 / 6.5, () => {});

        this.animationLock = false;
    }

    public attachCharacter(character: Character) {
        this.character = character;
    }

    public async centerToCharacter() {
        let { positionX, positionY } = this.calculateCameraPosition();

        this.positionX = positionX;
        this.positionY = positionY;
        this.realX = positionX * 32;
        this.realY = positionY * 32;
    }

    public async centerToCharacterAnimated() {
        let { positionX, positionY } = this.calculateCameraPosition();

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

    private calculateCameraPosition() {
        const { width, height } = this.gameWindow.dimensions();

        let positionX = -this.character.positionX + (width / 2 / 32) - 1;
        let positionY = -this.character.positionY + (height / 2 / 32) - 1;

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

        return {
            positionX,
            positionY
        };
    }

    public attachGround(ground: Ground) {
        this.ground = ground;

        const { width, height } = this.gameWindow.dimensions();

        const x = (width) / 32;
        const y = (height) / 32;

        let offsetX = 0;
        let offsetY = 0;

        if (width > this.ground.width * 32) {
            offsetX = (width - (this.ground.width * 32)) / 2 / 32;
        }

        if (height > this.ground.height * 32) {
            offsetY = (height - (this.ground.height * 32)) / 2 / 32;
        }

        this.maxX = -this.ground.width + x - offsetX;
        this.maxY = -this.ground.height + y - offsetY;
    }

    public getPosition() {
        return {
            cameraRealX: this.realX,
            cameraRealY: this.realY
        }
    }
}