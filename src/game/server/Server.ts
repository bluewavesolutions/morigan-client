import { EngineMediator } from "../utils/EngineMediator";
import { EngineStore } from "../store/EngineStore";
import { IServerCommunicationFrame } from "./interfaces/IServerCommunicationFrame";
import { ILoadGameRequest } from './interfaces/requests/ILoadGameRequest';
import { singleton } from "tsyringe";

@singleton()
export class Server {
    private webSocket: WebSocket | undefined;

    constructor(
        private engineMediator: EngineMediator,
        private engineStore: EngineStore
    ) {
    }

    public connect() {
        this.webSocket = new WebSocket("wss://game-alpha.morigan.pl/ws");
        //http://localhost:8989/
        //"wss://game-alpha.morigan.pl/ws"

        this.engineMediator.registerHandler('Server::SendMessage', (data: IServerCommunicationFrame) => {
            this.webSocket?.send(JSON.stringify(data));
        });

        this.webSocket.onopen = (event: Event) => {
            this.engineMediator.publish({
                type: 'Server::OnSocketOpen',
                data: event
            });

            this.engineMediator.publish({
                type: 'Server::SendMessage',
                data: {
                    Type: 'LOAD_GAME',
                    Data: {
                        jwt: this.engineStore.jwt,
                        characterId: this.engineStore.characterId
                    } as ILoadGameRequest | any
                } as IServerCommunicationFrame
            });
        };

        this.webSocket.onclose = (event: CloseEvent) => {
            this.engineMediator.publish({
                type: 'Server::OnSocketClose',
                data: event
            });
        }

        this.webSocket.onmessage = (event: MessageEvent) => {
            this.engineMediator.publish({
                type: 'Server::OnMessage',
                data: event.data as IServerCommunicationFrame
            });
        }
    }
}