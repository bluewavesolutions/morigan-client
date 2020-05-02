import "reflect-metadata";
import { container } from 'tsyringe';
import { EngineMediator } from "./game/utils/EngineMediator";
import { Server } from "./game/server/Server";
import { Renderer } from "./game/core/Renderer";
import { ServerEventInterpreter } from "./game/interpeters/ServerEventInterpreter";
import { KeyboardListener } from "./game/core/KeyboardListener";
import './index.css';

const engineMediator = container.resolve(EngineMediator);
const serverEventInterpreter = container.resolve(ServerEventInterpreter);
const keyboardListener = container.resolve(KeyboardListener);

const renderer = container.resolve(Renderer);
renderer.start();

const server = container.resolve(Server);
server.connect();

engineMediator.registerHandler('Server::OnSocketOpen', () => {
});

engineMediator.registerHandler('Character::Loaded', () => {
});

engineMediator.registerHandler('Ground::Loaded', () => {
});