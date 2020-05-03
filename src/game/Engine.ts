import { container } from "tsyringe";
import { Mediator } from "./core/events/Mediator";
import { ServerEventInterpreter } from "./interpeters/ServerEventInterpreter";
import { KeyboardListener } from "./managers/KeyboardManager";
import { Server } from "./communication/Server";
import { Renderer } from "./core/renderer/Renderer";

export class Engine {
    private mediator = container.resolve(Mediator);
    private serverEventInterpreter = container.resolve(ServerEventInterpreter);
    private keyboardListener = container.resolve(KeyboardListener);
    private renderer = container.resolve(Renderer);
    private server = container.resolve(Server);

    private loadedComponents = {
        server: false,
        character: false,
        ground: false
    }

    public start() {
        this.mediator.registerHandler('Server::OnSocketOpen', () => {
            this.loadedComponents.server = true;
            this.loadingInformation('Connected to server.');
            this.checkLoadedComponents();
        });

        this.mediator.registerHandler('Character::Loaded', () => {
            this.loadedComponents.character = true;
            this.loadingInformation('Character loaded.');
            this.checkLoadedComponents();
        });

        this.mediator.registerHandler('Ground::Loaded', () => {
            this.loadedComponents.ground = true;
            this.loadingInformation('Ground loaded.');
            this.checkLoadedComponents();
        });

        this.renderer.start();
        this.server.connect();
    }

    private loadingInformation(message: string) {
        let element = document.createElement('p');
        element.innerHTML = message;

        document.getElementById('loader').appendChild(element);
    }

    private checkLoadedComponents() {
        if (this.loadedComponents.server == false) {
            return;
        }

        if (this.loadedComponents.character == false) {
            return;
        }

        if (this.loadedComponents.ground == false) {
            return;
        }

        this.loadingInformation('Engine loaded.');
        document.getElementById('loader').style.display = 'none';
    }
}