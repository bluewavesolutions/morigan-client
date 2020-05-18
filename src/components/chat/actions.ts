import { ChatActionTypes, CHAT_MESSAGE_CHANGED, SEND_CHAT_MESSAGE } from "./types";
import { IDIContainer } from "rsdi";
import { Mediator } from "../../game/core/events/Mediator";
import { EngineStore } from "../../game/store/EngineStore";
import { IChatMessageRequest } from "../../game/communication/interfaces/requests/IChatMessageRequest";

export function updateChatMessage(value: string): ChatActionTypes {
    return {
        type: CHAT_MESSAGE_CHANGED,
        payload: value
    }
}

export function sendChatMessage(chatMessage: IChatMessageRequest): ChatActionTypes {
    const container = (window as any).container as IDIContainer;
    const mediator = container.get<Mediator>("Mediator");
    const engineStore = container.get<EngineStore>("EngineStore");

    mediator.publish({
        type: 'Server::SendMessage',
        data: {
            type: 'SEND_CHAT_MESSAGE',
            data: {
                sessionToken: engineStore.session,
                messageTo: chatMessage.messageTo,
                messageType: chatMessage.messageType,
                message: chatMessage.message
            }
        }
    });

    return {
        type: SEND_CHAT_MESSAGE,
        payload: chatMessage
    }
}