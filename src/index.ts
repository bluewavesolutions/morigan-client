import "reflect-metadata";
import { container } from 'tsyringe';
import { Mediator } from "./game/core/events/Mediator";
import { Server } from "./game/communication/Server";
import { Renderer } from "./game/core/renderer/Renderer";
import { ServerEventInterpreter } from "./game/interpeters/ServerEventInterpreter";
import { KeyboardListener } from "./game/managers/KeyboardManager";
import './index.css';

const mediator = container.resolve(Mediator);
const serverEventInterpreter = container.resolve(ServerEventInterpreter);
const keyboardListener = container.resolve(KeyboardListener);

const renderer = container.resolve(Renderer);
renderer.start();

const server = container.resolve(Server);
server.connect();

mediator.registerHandler('Server::OnSocketOpen', () => {
});

mediator.registerHandler('Character::Loaded', () => {
});

mediator.registerHandler('Ground::Loaded', () => {
});