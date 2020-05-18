import { 
    GameState,
    CHARACTER_LOADED,
    GROUD_LOADED,
    SERVER_STATUS_CHANGED,
    GameActionTypes,
    CREDENTIALS_LOADED,
    CHARACTER_LIST_LOADED,
    ENGINE_STATUS_CHANGED
} from "./types";

const initialState: GameState = {
    jwt: localStorage.getItem('jwt'),
    character: localStorage.getItem('character'),
    credentialsLoaded: localStorage.getItem('jwt') !== null 
        && localStorage.getItem('character') !== null,
    characterList: [],
    engineStatus: 'loading',
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
        case CREDENTIALS_LOADED:
            return { ...state, credentialsLoaded: action.payload }
        case SERVER_STATUS_CHANGED:
            return { ...state, serverConnectionStatus: action.payload }
        case CHARACTER_LIST_LOADED:
            return { ...state, characterList: action.payload }
        case ENGINE_STATUS_CHANGED:
            return { ...state, engineStatus: action.payload }
        default:
            return state
    }
}