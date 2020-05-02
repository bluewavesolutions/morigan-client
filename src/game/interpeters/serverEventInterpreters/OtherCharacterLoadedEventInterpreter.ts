import { IOtherCharacterLoadedResponse } from "../../server/interfaces/responses/IOtherCharacterLoadedResponse";
import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { EngineMediator } from "../../utils/EngineMediator";

export class OtherCharacterLoadedEventInterpreter implements IServerEventInterpreter<IOtherCharacterLoadedResponse> {
    private engineMediator: EngineMediator;

    constructor(engineMediator: EngineMediator) {
        this.engineMediator = engineMediator;
    }

    public async execute(data: IOtherCharacterLoadedResponse) : Promise<void> {
        console.log(data);

        await this.engineMediator.publish({ 
            type: 'OtherCharactersManager::Load', 
            data: data
        });
    }
}