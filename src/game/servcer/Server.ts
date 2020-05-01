import { EngineMediator } from "../core/EngineMediator";
import { IServerCommunicationFrame } from "./interfaces/IServerCommunicationFrame";
import { ILoadGameRequest } from './interfaces/requests/ILoadGameRequest';
import { EngineStore } from "../store/EngineStore";

export class Server {
    private webSocket: WebSocket | undefined;
    private engineMediator: EngineMediator;
    private engineStore: EngineStore;

    constructor(engineMediator: EngineMediator, engineStore: EngineStore) {
        this.engineMediator = engineMediator;
        this.engineStore = engineStore;
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