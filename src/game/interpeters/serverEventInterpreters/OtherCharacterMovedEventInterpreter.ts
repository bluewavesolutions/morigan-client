import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { IOtherCharacterMovedResponse } from "../../communication/interfaces/responses/IOtherCharacterMovedResponse";
import { Mediator } from "../../core/events/Mediator";

export class OtherCharacterMovedEventInterpreter implements IServerEventInterpreter<IOtherCharacterMovedResponse> {
    constructor(
        private mediator: Mediator
    ) {
    }

    public async execute(data: IOtherCharacterMovedResponse): Promise<void> {
        console.log(data);

        await this.mediator.publish({
            type: 'OtherCharactersManager::Moved',
            data: data
        });
    }
}