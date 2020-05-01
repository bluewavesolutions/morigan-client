import { IGameEvent } from "./interfaces/IGameEvent";

export class EngineMediator {
    private handlers: Map<string, any[]> = new Map();

    public async publish(event: IGameEvent) {
        if(this.handlers.has(event.type) === false) {
            console.warn(`Unkwnon event type: ${event.type}`);
            console.warn(event);
            return Promise.reject();
        }

        let prom: Promise<void>[] = [];

        let handlers = this.handlers.get(event.type) as any[];
        for (let handler of handlers) {
            prom.push(new Promise((resolve) => {
                resolve(handler(event.data));
            }));
        }

        return await Promise.all(prom);
    }

    public registerHandler(type: string, func: any) {
        if(this.handlers.has(type) === false) {
            this.handlers.set(type, []);
        }

        this.handlers.get(type)?.push(func);
    }
}