import { Mediator } from "../core/events/Mediator";

export type Direction = 'up' | 'down' | 'left' | 'right' | 'cam_down' | 'cam_right' | 'cam_left'  | 'cam_up' | null;

const DIRECTION_KEY_CODES: { [keyCode: string]: Direction } = {
  'KeyW': 'up', 'ArrowUp': 'up',
  'KeyA': 'left', 'ArrowLeft': 'left',
  'KeyD': 'right', 'ArrowRight': 'right',
  'KeyS': 'down', 'ArrowDown': 'down',
  'Digit1': 'cam_down',
  'Digit2': 'cam_right',
  'Digit3': 'cam_up',
  'Digit4': 'cam_left'
};

export class KeyboardManager {
    private currentDirection: Direction = null;

    constructor(private mediator: Mediator) {
        window.addEventListener('keydown', this.handleKeyDownEvent, false);
        window.addEventListener('keyup', this.handleKeyUpEvent, false);
    }

    private handleKeyDownEvent = (event: KeyboardEvent) => {
        const { code } = event;

        if (DIRECTION_KEY_CODES.hasOwnProperty(code) === false) {
            return;
        }

        const keyDirection = DIRECTION_KEY_CODES[code];

        this.mediator.publish({
            type: 'Character::ChangedDirection',
            data: keyDirection
        });

        this.currentDirection = keyDirection;
    }

    private handleKeyUpEvent = (event: KeyboardEvent) => {
        const { code } = event;
        if (DIRECTION_KEY_CODES.hasOwnProperty(code) === false) {
            return;
        }

        const keyDirection = DIRECTION_KEY_CODES[code];
        if (this.currentDirection === keyDirection) {
            this.currentDirection = null;
            this.mediator.publish({
                type: 'Character::ChangedDirection',
                data: null
            });
        }
    }
}