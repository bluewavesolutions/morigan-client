import { 
    ChatState, 
    ChatActionTypes, 
    CHAT_MESSAGE_RECEIVED, 
    CHAT_MESSAGE_CHANGED,
    SEND_CHAT_MESSAGE
} from "./types";
import update from 'immutability-helper';

const initialState: ChatState = {
    messages: [],
    chatMessage: ''
}

export function chatReducer(
    state = initialState,
    action: ChatActionTypes
  ): ChatState {
    switch (action.type) {
        case CHAT_MESSAGE_RECEIVED:
            return { ...state, messages: update(state.messages, { $push: [action.data] }) }
        case CHAT_MESSAGE_CHANGED:        
            return { ...state, chatMessage: action.payload }
        case SEND_CHAT_MESSAGE:
            return { ...state, chatMessage: '' }
        default:
            return state
    }
}