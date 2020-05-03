import { IOtherCharacterLoadedResponse } from "../../communication/interfaces/responses/IOtherCharacterLoadedResponse";
import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { Mediator } from "../../core/events/Mediator";

export class OtherCharacterLoadedEventInterpreter implements IServerEventInterpreter<IOtherCharacterLoadedResponse> {
    constructor(
        private mediator: Mediator
    ) {
    }

    public async execute(data: IOtherCharacterLoadedResponse) : Promise<void> {
        console.log(data);

        await this.mediator.publish({ 
            type: 'OtherCharactersManager::Load', 
            data: data
        });
    }
}