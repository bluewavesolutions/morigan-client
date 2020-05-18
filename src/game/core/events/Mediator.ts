import { IGameEvent } from "./interfaces/IGameEvent";

export class Mediator {
    private handlers: Map<string, any[]> = new Map();
    private dispatch: any;

    public async publish(event: IGameEvent) {
        let prom: Promise<void>[] = [];

        let handlers = this.handlers.get(event.type) as any[];
        if (typeof(handlers) !== typeof(undefined)) {
            for (let handler of handlers) {
                prom.push(new Promise((resolve) => {
                    resolve(handler(event.data));
                }));
            }
        }

        if (this.dispatch !== null) {
            this.dispatch(event);
        }

        return await Promise.all(prom);
    }

    public registerHandler(type: string, func: any) {
        if (this.handlers.has(type) === false) {
            this.handlers.set(type, []);
        }

        console.log(`EngineMediator->registerHandler->${type}`);

        this.handlers.get(type)?.push(func);
    }

    public registerRedux(dispatch: any) {
        this.dispatch = dispatch;
    }
}