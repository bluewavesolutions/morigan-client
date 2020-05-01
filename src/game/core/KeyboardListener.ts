import { EngineMediator } from "../utils/EngineMediator";

export type Direction = 'up' | 'down' | 'left' | 'right' | null;

const DIRECTION_KEY_CODES: { [keyCode: string]: Direction } = {
  'KeyW': 'up', 'ArrowUp': 'up',
  'KeyA': 'left', 'ArrowLeft': 'left',
  'KeyD': 'right', 'ArrowRight': 'right',
  'KeyS': 'down', 'ArrowDown': 'down'
};

export class KeyboardListener {
    private currentDirection: Direction = null;
    private engineMediator: EngineMediator;

    constructor(engineMediator: EngineMediator) {
        this.engineMediator = engineMediator;

        window.addEventListener('keydown', this.handleKeyDownEvent, false);
        window.addEventListener('keyup', this.handleKeyUpEvent, false);
    }

    private handleKeyDownEvent = (event: KeyboardEvent) => {
        const { code } = event;
        
        if (DIRECTION_KEY_CODES.hasOwnProperty(code) == false) { 
            return;
        }
    
        const keyDirection = DIRECTION_KEY_CODES[code];
        this.currentDirection = keyDirection;
    
        this.engineMediator.publish({
            type: 'Character::ChangedDirection',
            data: keyDirection
        });
    }
    
    private handleKeyUpEvent = (event: KeyboardEvent) => {
        const { code } = event;
        if (DIRECTION_KEY_CODES.hasOwnProperty(code) === false) {
            return;
        }

        const keyDirection = DIRECTION_KEY_CODES[code];
        if (this.currentDirection === keyDirection) {
            this.currentDirection = null;
            this.engineMediator.publish({
                type: 'Character::ChangedDirection',
                data: null
            });
        }
    }
}