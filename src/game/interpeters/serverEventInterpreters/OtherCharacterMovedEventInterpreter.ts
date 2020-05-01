import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { IOtherCharacterMovedResponse } from "../../servcer/interfaces/responses/IOtherCharacterMovedResponse";
import { EngineMediator } from "../../utils/EngineMediator";

export class OtherCharacterMovedEventInterpreter implements IServerEventInterpreter<IOtherCharacterMovedResponse> {
    private engineMediator: EngineMediator;

    constructor(engineMediator: EngineMediator) {
        this.engineMediator = engineMediator;
    }

    public async execute(data: IOtherCharacterMovedResponse) : Promise<void> {
        console.log(data);

        await this.engineMediator.publish({ 
            type: 'OtherCharactersManager::Moved', 
            data: data
        });
    }
}