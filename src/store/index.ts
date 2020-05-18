import { combineReducers } from "redux"
import { gameReducer } from "../game/reducer";
import { chatReducer } from "../components/chat/reducer";

export const rootReducer = combineReducers({
    game: gameReducer,
    chat: chatReducer
});
  
export type RootState = ReturnType<typeof rootReducer>