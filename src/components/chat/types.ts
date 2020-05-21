import { IChatMessageResponse } from "../../game/communication/interfaces/responses/IChatMessageResponse";
import { IChatMessageRequest } from "../../game/communication/interfaces/requests/IChatMessageRequest";

export const CHAT_MESSAGE_RECEIVED = 'Chat::MessageReceived';
export const CHAT_MESSAGE_CHANGED = 'CHAT_MESSAGE_CHANGED';
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE';
export const KEYBOARD_STATUS_CHANGE = 'KEYBOARD_STATUS_CHANGE';

export interface ChatState {
    messages: IChatMessageResponse[],
    chatMessage: string
}

interface ChatMessageReceived {
    type: typeof CHAT_MESSAGE_RECEIVED
    data: IChatMessageResponse
}

interface ChatMessageChanged {
    type: typeof CHAT_MESSAGE_CHANGED
    payload: string
}

interface SendChatMessage {
    type: typeof SEND_CHAT_MESSAGE
    payload: IChatMessageRequest
}

interface KeyboardStatusChanged {
    type: typeof KEYBOARD_STATUS_CHANGE
    payload: {}
}

export type ChatActionTypes = ChatMessageReceived 
    | ChatMessageChanged 
    | SendChatMessage
    | KeyboardStatusChanged