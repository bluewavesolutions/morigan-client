import React, { Component } from 'react';
import { Mediator } from './game/core/events/Mediator';
import { ServerEventInterpreter } from './game/interpeters/ServerEventInterpreter';
import { KeyboardManager } from './game/managers/KeyboardManager';
import { MouseManager } from './game/managers/MouseManager';
import { Server } from './game/communication/Server';
import { Renderer } from './game/core/renderer/Renderer';
import { Container } from './container';
import './App.css';

class App extends Component {

  container = new Container().getContainer();

  componentDidMount() {
    this.container.get<ServerEventInterpreter>("ServerEventInterpreter");
    this.container.get<MouseManager>("MouseManager");
    this.container.get<KeyboardManager>("KeyboardManager");

    const mediator = this.container.get<Mediator>("Mediator");
    mediator.registerHandler('Server::OnSocketClose', () => {
      //TODO: Connection problem
    });

    mediator.registerHandler('Server::OnSocketOpen', () => {
        //TODO: socket open
    });

    mediator.registerHandler('Character::Loaded', () => {
        //TODO: character loaded
    });

    mediator.registerHandler('Ground::Loaded', () => {
        //TODO: groud loaded
    });

    const renderer = this.container.get<Renderer>("Renderer");
    renderer.start();
    
    const server = this.container.get<Server>("Server");
    server.connect();
  }

  render() {
    return (
      <main id="grid_layout">
        <div id="game_window">
          <canvas id="game"></canvas>
        </div>
        <div id="bottom_panel">
          Panel
        </div>
      </main>
    );
  }
}

export default App;