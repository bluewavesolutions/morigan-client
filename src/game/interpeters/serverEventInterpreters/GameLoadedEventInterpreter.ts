import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { IGameLoadedResponse } from "../../communication/interfaces/responses/IGameLoadedResponse";
import { Mediator } from "../../core/events/Mediator";
import { EngineStore } from "../../store/EngineStore";

export class GameLoadedEventInterpreter implements IServerEventInterpreter<IGameLoadedResponse> {
    constructor(
        private mediator: Mediator, 
        private engineStore: EngineStore
    ) {
    }

    public async execute(data: IGameLoadedResponse) : Promise<void> {
        console.log(data);

        await this.mediator.publish({ 
            type: 'Character::Load', 
            data: data.Character
        });

        await this.mediator.publish({ 
            type: 'Ground::Load', 
            data: data.Map
        });

        for (let index in data.OtherCharacters) {
            await this.mediator.publish({ 
                type: 'OtherCharactersManager::Load', 
                data: data.OtherCharacters[index]
            });
        }

        this.engineStore.session = data.Character.SessionToken;
        console.log(this.engineStore);
    }
}