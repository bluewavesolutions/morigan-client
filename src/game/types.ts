import { ICharacter } from "../api/characters/ICharacter";

export const GROUD_LOADED = 'Ground::Loaded';
export const CHARACTER_LOADED = 'Character::Loaded';
export const CREDENTIALS_LOADED = 'CREDENTIALS_LOADED';
export const SERVER_STATUS_CHANGED = 'SERVER_STATUS_CHANGED';
export const CHARACTER_LIST_LOADED = 'CHARACTER_LIST_LOADED';
export const ENGINE_STATUS_CHANGED = 'ENGINE_STATUS_CHANGED';

export type ConnectionStatus = 'loading' | 'connected';
export type EngineStatus = 'loading' | 'started';

export interface GameState {
    jwt: string | null,
    character: string | null,
    credentialsLoaded: boolean,
    characterList: ICharacter[],
    engineStatus: EngineStatus,
    groundLoaded: boolean,
    characterLoaded: boolean,
    serverConnectionStatus: ConnectionStatus,
    nick: string
}

interface GroundLoadedAction {
    type: typeof GROUD_LOADED
    payload: {}
}

interface CharacterLoadedAction {
    type: typeof CHARACTER_LOADED
    data: {
        nick: string
    }
}

interface ServerStatusChangeAction {
    type: typeof SERVER_STATUS_CHANGED
    payload: ConnectionStatus
}

interface CredentialsLoadedAction {
    type: typeof CREDENTIALS_LOADED
    payload: boolean
}


interface CharacterListLoadedAction {
    type: typeof CHARACTER_LIST_LOADED
    payload: ICharacter[]
}

interface EngineStatusChangedAction {
    type: typeof ENGINE_STATUS_CHANGED
    payload: EngineStatus
}

export type GameActionTypes = GroundLoadedAction 
    | CharacterLoadedAction 
    | ServerStatusChangeAction 
    | CredentialsLoadedAction
    | CharacterListLoadedAction
    | EngineStatusChangedAction