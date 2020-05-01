import { IGameEvent } from "./interfaces/IGameEvent";

export class EngineMediator {
    handlers: Map<string, any> = new Map();

    public publish(event: IGameEvent) {
        if(this.handlers.has(event.type) === false) {
            console.warn(`Unkwnon event type: ${event.type}`);
            console.warn(event);
            return;
        }

        this.handlers.get(event.type)(event.data);
    }

    public registerHandler(type: string, func: any) {
        if(this.handlers.has(type)) {
            throw new Error(`Type ${type} already registred.`)
        }

        this.handlers.set(type, func);
    }
}