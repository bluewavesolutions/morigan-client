import { Mediator } from "../core/events/Mediator";

export class MouseManager {
    constructor(
        private mediator: Mediator
    ) {
        const canvas = document.getElementById('game') as HTMLCanvasElement;
    
        canvas.addEventListener('mousemove', (ev) => {
            const rect = canvas.getBoundingClientRect();

            mediator.publish({
                type: 'MouseManager::MouseMove',
                data: {
                    clientX: ev.clientX - rect.left,
                    clientY: ev.clientY - rect.top,
                }
            });
        });

        canvas.addEventListener('click', (ev) => {
            const rect = canvas.getBoundingClientRect();

            mediator.publish({
                type: 'MouseManager::Click',
                data: {
                    clientX: ev.clientX - rect.top,
                    clientY: ev.clientY - rect.left,
                }
            });
        });
    }
}