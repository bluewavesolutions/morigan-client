import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { IChatMessageResponse } from "../../communication/interfaces/responses/IChatMessageResponse";
import { Mediator } from "../../core/events/Mediator";

export class ChatMessageEventInterpreter implements IServerEventInterpreter<IChatMessageResponse> {
    constructor(
        private mediator: Mediator
    ) {
    }

    async execute(data: IChatMessageResponse): Promise<void> {
        this.mediator.publish({
            type: 'Chat::MessageReceived',
            data: data
        });
    }
}