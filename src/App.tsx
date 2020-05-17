import React, { Component } from 'react';
import { Mediator } from './game/core/events/Mediator';
import { ServerEventInterpreter } from './game/interpeters/ServerEventInterpreter';
import { KeyboardManager } from './game/managers/KeyboardManager';
import { MouseManager } from './game/managers/MouseManager';
import { Server } from './game/communication/Server';
import { Renderer } from './game/core/renderer/Renderer';
import { Container } from './container';
import { GameState } from './game/types';
import { connect, ConnectedProps } from 'react-redux';
import { groundLoaded, characterLoaded, serverStatusChanged } from './game/actions';
import BottomPanel from './components/bottomPanel/BottomPanel';
import GameWindow from './game/GameWindow';
import LoadingModal from './components/loadingModal/LoadingModal';
import './App.css';

const mapState = (state: {game: GameState}) => ({
  characterLoaded: state.game.characterLoaded,
  groundLoaded: state.game.groundLoaded,
  serverConnectionStatus: state.game.serverConnectionStatus
})

const mapDispatch = {
  GroundLoaded: groundLoaded,
  CharacterLoaded: characterLoaded, 
  ServerStatusChanged: serverStatusChanged
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class App extends Component<PropsFromRedux> {

  container = new Container().getContainer();

  componentDidMount() {
    this.container.get<ServerEventInterpreter>("ServerEventInterpreter");
    this.container.get<MouseManager>("MouseManager");
    this.container.get<KeyboardManager>("KeyboardManager");

    const mediator = this.container.get<Mediator>("Mediator");
    mediator.registerHandler('Server::OnSocketClose', () => {
      this.props.ServerStatusChanged('loading');
    });

    mediator.registerHandler('Server::OnSocketOpen', () => {
      this.props.ServerStatusChanged('connected');
    });

    mediator.registerHandler('Character::Loaded', () => {
      this.props.CharacterLoaded();
    });

    mediator.registerHandler('Ground::Loaded', () => {
      this.props.GroundLoaded();
    });

    const renderer = this.container.get<Renderer>("Renderer");
    renderer.start();
    
    const server = this.container.get<Server>("Server");
    server.connect();
  }

  render() {
    return (
      <main>
        {this.isLoaded() === false ? <LoadingModal /> : null}
        <div id="grid_layout">
          <GameWindow />
          <BottomPanel />
        </div>
      </main>
    );
  }

  isLoaded = () => {
    const { groundLoaded, characterLoaded, serverConnectionStatus } = this.props;
    return groundLoaded && characterLoaded && serverConnectionStatus === 'connected';
  }
}

export default connector(App);