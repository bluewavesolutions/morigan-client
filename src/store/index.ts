import { combineReducers } from "redux"
import { gameReducer } from "../game/reducer";

export const rootReducer = combineReducers({
    game: gameReducer
});
  
export type RootState = ReturnType<typeof rootReducer>