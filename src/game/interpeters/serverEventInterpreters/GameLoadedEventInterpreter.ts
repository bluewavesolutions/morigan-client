import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { IGameLoadedResponse } from "../../server/interfaces/responses/IGameLoadedResponse";
import { EngineMediator } from "../../utils/EngineMediator";
import { EngineStore } from "../../store/EngineStore";

export class GameLoadedEventInterpreter implements IServerEventInterpreter<IGameLoadedResponse> {
    private engineMediator: EngineMediator;
    private engineStore: EngineStore;

    constructor(engineMediator: EngineMediator, engineStore: EngineStore) {
        this.engineMediator = engineMediator;
        this.engineStore = engineStore;
    }

    public async execute(data: IGameLoadedResponse) : Promise<void> {
        console.log(data);

        await this.engineMediator.publish({ 
            type: 'Character::Load', 
            data: data.Character
        });

        await this.engineMediator.publish({ 
            type: 'Ground::Load', 
            data: data.Map
        });

        for (let index in data.OtherCharacters) {
            await this.engineMediator.publish({ 
                type: 'OtherCharactersManager::Load', 
                data: data.OtherCharacters[index]
            });
        }

        this.engineStore.session = data.Character.SessionToken;
        console.log(this.engineStore);
    }
}