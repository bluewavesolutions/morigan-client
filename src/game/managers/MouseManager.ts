import { singleton } from "tsyringe";
import { Mediator } from "../core/events/Mediator";

@singleton()
export class MouseManager {
    constructor(
        private mediator: Mediator
    ) {
        const canvas = document.getElementById('game') as HTMLCanvasElement;
        canvas.addEventListener('mousemove', (ev) => {
            mediator.publish({
                type: 'MouseManager::MouseMove',
                data: {
                    clientX: ev.clientX,
                    clientY: ev.clientY
                }
            });
        });

        canvas.addEventListener('click', (ev) => {
            mediator.publish({
                type: 'MouseManager::Click',
                data: {
                    clientX: ev.clientX,
                    clientY: ev.clientY
                }
            });
        });
    }
}