import { GROUD_LOADED, CHARACTER_LOADED, SERVER_STATUS_CHANGED, GameActionTypes, ConnectionStatus } from './types'

export function groundLoaded(): GameActionTypes {
    return {
        type: GROUD_LOADED,
        payload: {}
    }
}

export function characterLoaded(): GameActionTypes {
    return {
        type: CHARACTER_LOADED,
        payload: {}
    }
}

export function serverStatusChanged(status: ConnectionStatus): GameActionTypes {
    return {
        type: SERVER_STATUS_CHANGED,
        payload: status
    }
}