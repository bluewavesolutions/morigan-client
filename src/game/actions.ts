import { 
    SERVER_STATUS_CHANGED, 
    GameActionTypes, 
    ConnectionStatus, 
    CREDENTIALS_LOADED, 
    GameState,
    CHARACTER_LIST_LOADED,
    ENGINE_STATUS_CHANGED,
    EngineStatus
} from './types'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux';
import { charactersApi } from '../api';
import { ICharacter } from '../api/characters/ICharacter';
import { Container } from '../container';
import { ServerEventInterpreter } from './interpeters/ServerEventInterpreter';
import { MouseManager } from './managers/MouseManager';
import { KeyboardManager } from './managers/KeyboardManager';
import { Mediator } from './core/events/Mediator';
import { Renderer } from './core/renderer/Renderer';
import { Server } from './communication/Server';
import { IDIContainer } from 'rsdi';

export function credentialsLoaded(): GameActionTypes {
    return {
        type: CREDENTIALS_LOADED,
        payload: true
    }
}

export function serverStatusChanged(status: ConnectionStatus): GameActionTypes {
    return {
        type: SERVER_STATUS_CHANGED,
        payload: status
    }
}

export const thunkListCharacters = (): ThunkAction<void, GameState, unknown, Action<string>> => async dispatch => {
    let response = await charactersApi.get<ICharacter[]>('api/Characters/List');
    dispatch(characterListLoaded(response.data));
}

export function characterListLoaded(characters: ICharacter[]): GameActionTypes {
    return {
        type: CHARACTER_LIST_LOADED,
        payload: characters
    }
}

export const thunkStartEngine = (): ThunkAction<void, GameState, unknown, Action<string>> => async dispatch => {
    (window as any).container = new Container().getContainer();
    const container = (window as any).container as IDIContainer;

    container.get<ServerEventInterpreter>("ServerEventInterpreter");
    container.get<MouseManager>("MouseManager");
    container.get<KeyboardManager>("KeyboardManager");

    const mediator = container.get<Mediator>("Mediator");
    mediator.registerHandler('Server::OnSocketClose', () => {
      dispatch(serverStatusChanged('loading'));
    });

    mediator.registerHandler('Server::OnSocketOpen', () => {
        dispatch(serverStatusChanged('connected'));
    });

    const renderer = container.get<Renderer>("Renderer");
    renderer.start();
    
    const server = container.get<Server>("Server");
    server.connect();

    mediator.registerRedux(dispatch);

    dispatch(changeEngineStatus('started'));
}

export function changeEngineStatus(engineStatus: EngineStatus): GameActionTypes {
    return {
        type: ENGINE_STATUS_CHANGED,
        payload: engineStatus
    }
}