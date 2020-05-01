import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { IGameLoadedResponse } from "../../servcer/interfaces/responses/IGameLoadedResponse";
import { EngineMediator } from "../../core/EngineMediator";
import { EngineStore } from "../../store/EngineStore";

export class GameLoadedEventInterpreter implements IServerEventInterpreter<IGameLoadedResponse> {
    private engineMediator: EngineMediator;
    private engineStore: EngineStore;

    constructor(engineMediator: EngineMediator, engineStore: EngineStore) {
        this.engineMediator = engineMediator;
        this.engineStore = engineStore;
    }

    public execute(data: IGameLoadedResponse) {
        console.log(data);

        this.engineMediator.publish({ 
            type: 'Character::Load', 
            data: data.Character
        });

        this.engineMediator.publish({ 
            type: 'Ground::Load', 
            data: {
                map: data.Map,
                character: data.Character
            }
        });

        this.engineStore.session = data.Character.SessionToken;
        console.log(this.engineStore);
    }
}