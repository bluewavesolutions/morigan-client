import { EngineMediator } from "../utils/EngineMediator";
import { EngineStore } from "../store/EngineStore";
import { IServerCommunicationFrame } from "../server/interfaces/IServerCommunicationFrame";
import { IServerEventInterpreter } from "./interfaces/ISeverEventInterpreter";
import { GameLoadedEventInterpreter } from "./serverEventInterpreters/GameLoadedEventInterpreter";
import { EngineErrorEventInterpreter } from "./serverEventInterpreters/EngineErrorEventInterpreter";
import { OtherCharacterLoadedEventInterpreter } from "./serverEventInterpreters/OtherCharacterLoadedEventInterpreter";
import { OtherCharacterMovedEventInterpreter } from "./serverEventInterpreters/OtherCharacterMovedEventInterpreter";
import { singleton } from "tsyringe";

@singleton()
export class ServerEventInterpreter {
    constructor(
        private engineMediator: EngineMediator,
        private engineStore: EngineStore
    ) {
        this.engineMediator.registerHandler('Server::OnMessage', async (serverCommunicationFrame: any) => {
            await this.execute(JSON.parse(serverCommunicationFrame));
        });
    }

    private async execute(serverCommunicationFrame: IServerCommunicationFrame) {
        let serverEventInterpreter: IServerEventInterpreter<any> | undefined;
        
        switch (serverCommunicationFrame.Type) {
            case 'GAME_LOADED' : {
                serverEventInterpreter = new GameLoadedEventInterpreter(this.engineMediator, this.engineStore);
                break;
            }
            case 'OTHER_CHARACTER_LOADED' : {
                serverEventInterpreter = new OtherCharacterLoadedEventInterpreter(this.engineMediator);
                break;
            }
            case 'OTHER_CHARACTER_MOVED' : {
                serverEventInterpreter = new OtherCharacterMovedEventInterpreter(this.engineMediator);
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