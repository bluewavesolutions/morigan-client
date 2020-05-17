import { GameState, CHARACTER_LOADED, GROUD_LOADED, SERVER_STATUS_CHANGED, GameActionTypes } from "./types"

const initialState: GameState = {
    groundLoaded: false,
    characterLoaded: false,
    serverConnectionStatus: 'loading'
}

export function gameReducer(
    state = initialState,
    action: GameActionTypes
  ): GameState {
    switch (action.type) {
        case CHARACTER_LOADED:
            return { ...state, characterLoaded: true }
        case GROUD_LOADED:
            return { ...state, groundLoaded: true }
        case SERVER_STATUS_CHANGED:
            return { ...state, serverConnectionStatus: action.payload }
        default:
            return state
    }
}