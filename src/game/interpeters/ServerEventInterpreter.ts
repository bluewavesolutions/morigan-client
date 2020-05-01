import { EngineMediator } from "../core/EngineMediator";
import { IServerCommunicationFrame } from "../servcer/interfaces/IServerCommunicationFrame";
import { IServerEventInterpreter } from "./interfaces/ISeverEventInterpreter";
import { GameLoadedEventInterpreter } from "./serverEventInterpreters/GameLoadedEventInterpreter";
import { EngineStore } from "../store/EngineStore";
import { EngineErrorEventInterpreter } from "./serverEventInterpreters/EngineErrorEventInterpreter";

export class ServerEventInterpreter {
    engineMediator: EngineMediator;
    engineStore: EngineStore;

    constructor(engineMediator: EngineMediator, engineStore: EngineStore) {
        this.engineMediator = engineMediator;
        this.engineStore = engineStore;

        this.engineMediator.registerHandler('SERVER_RECEIVE_MESSAGE', (serverCommunicationFrame: any) => {
            this.execute(JSON.parse(serverCommunicationFrame));
        });
    }

    private execute(serverCommunicationFrame: IServerCommunicationFrame) {
        let serverEventInterpreter: IServerEventInterpreter<any> | undefined;
        
        switch (serverCommunicationFrame.Type) {
            case 'GAME_LOADED' : {
                serverEventInterpreter = new GameLoadedEventInterpreter(this.engineMediator, this.engineStore);
                break;
            }
            case 'ENGINE_ERROR' : {
                serverEventInterpreter = new EngineErrorEventInterpreter();
                break;
            }
            default:
                throw new Error(`Unsupported event type ${serverCommunicationFrame.Type}`)
        }

        serverEventInterpreter?.execute(serverCommunicationFrame.Data);
    }
}