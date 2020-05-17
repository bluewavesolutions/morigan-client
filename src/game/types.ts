export const GROUD_LOADED = 'GROUD_LOADED';
export const CHARACTER_LOADED = 'CHARACTER_LOADED';
export const SERVER_STATUS_CHANGED = 'SERVER_STATUS_CHANGED';

export type ConnectionStatus = 'loading' | 'connected';

export interface GameState {
    groundLoaded: boolean,
    characterLoaded: boolean,
    serverConnectionStatus: ConnectionStatus
}

interface GroundLoadedAction {
    type: typeof GROUD_LOADED
    payload: {}
}

interface CharacterLoadedAction {
    type: typeof CHARACTER_LOADED
    payload: {}
}

interface ServerStatusChangeAction {
    type: typeof SERVER_STATUS_CHANGED
    payload: ConnectionStatus
}

export type GameActionTypes = GroundLoadedAction | CharacterLoadedAction | ServerStatusChangeAction