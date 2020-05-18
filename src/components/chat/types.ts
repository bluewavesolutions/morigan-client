import { IChatMessageResponse } from "../../game/communication/interfaces/responses/IChatMessageResponse";
import { IChatMessageRequest } from "../../game/communication/interfaces/requests/IChatMessageRequest";

export const CHAT_MESSAGE_RECEIVED = 'Chat::MessageReceived';
export const CHAT_MESSAGE_CHANGED = 'CHAT_MESSAGE_CHANGED';
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE';

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

export type ChatActionTypes = ChatMessageReceived 
    | ChatMessageChanged 
    | SendChatMessage