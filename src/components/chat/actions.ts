import { ChatActionTypes, CHAT_MESSAGE_CHANGED, SEND_CHAT_MESSAGE, KEYBOARD_STATUS_CHANGE } from "./types";
import { IDIContainer } from "rsdi";
import { Mediator } from "../../game/core/events/Mediator";
import { EngineStore } from "../../game/store/EngineStore";

export function updateChatMessage(value: string): ChatActionTypes {
    return {
        type: CHAT_MESSAGE_CHANGED,
        payload: value
    }
}

export function sendChatMessage(chatMessage: {message: string}): ChatActionTypes {
    const container = (window as any).container as IDIContainer;
    const mediator = container.get<Mediator>("Mediator");
    const engineStore = container.get<EngineStore>("EngineStore");

    const message = {
        sessionToken: engineStore.session,
        messageTo: '',
        messageType: 'GLOBAL',
        message: chatMessage.message
    };

    mediator.publish({
        type: 'Server::SendMessage',
        data: {
            type: 'SEND_CHAT_MESSAGE',
            data: message
        }
    });

    return {
        type: SEND_CHAT_MESSAGE,
        payload: message
    }
}

export function changeKeyboardManagerStatus(status: 'locked' | 'unlocked') {
    const container = (window as any).container as IDIContainer;
    const mediator = container.get<Mediator>("Mediator");

    mediator.publish({
        type: 'KeyboardManager::ChangeStatus',
        data: status
    });

    return {
        type: KEYBOARD_STATUS_CHANGE,
        payload: status
    }
}