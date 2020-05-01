import React, { Component } from 'react';
import { Renderer } from '../../game/core/Renderer';
import { EngineMediator } from '../../game/core/EngineMediator';
import { Server } from '../../game/servcer/Server';
import { ServerEventInterpreter } from '../../game/interpeters/ServerEventInterpreter';
import { EngineStore } from '../../game/store/EngineStore';
import { KeyboardListener } from '../../game/core/KeyboardListener';
import { Character } from '../../game/core/Character';
import { Ground } from '../../game/core/Ground';
import { OtherCharactersManager } from '../../game/core/managers/OtherCharactersManager';

interface IGameProps {
}

interface IGameState {
  connectedToServer: boolean,
  characterLoaded: boolean,
  groundLoaded: boolean
}

class Game extends Component<IGameProps, IGameState> {
  private canvasReference: React.RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);
    this.canvasReference = React.createRef();

    this.state = {
      connectedToServer: false,
      characterLoaded: false,
      groundLoaded: false
    }
  }

  componentDidMount() {
    const engineStore = new EngineStore();

    const engineMediator = new EngineMediator();
    const canvas = this.canvasReference.current as HTMLCanvasElement;

    const character = new Character(engineMediator, engineStore);
    const ground = new Ground(engineMediator, character);

    const otherCharactersManager = new OtherCharactersManager(engineMediator, character);

    const renderer = new Renderer(canvas, engineMediator, ground, character, otherCharactersManager);
    renderer.start();

    const serverEventInterpreter = new ServerEventInterpreter(engineMediator, engineStore);
    const keyboardListerner = new KeyboardListener(engineMediator);
    
    const server = new Server(engineMediator, engineStore);
    server.connect();

    engineMediator.registerHandler('Server::OnSocketOpen', () => {
      this.setState({connectedToServer: true});
    });

    engineMediator.registerHandler('Character::Loaded', () => {
      this.setState({characterLoaded: true});
    });

    engineMediator.registerHandler('Ground::Loaded', () => {
      this.setState({groundLoaded: true});
    });
  }

  render() {
    const { connectedToServer, characterLoaded, groundLoaded } = this.state;
    const gameLoaded = connectedToServer && characterLoaded && groundLoaded;

    return (
      <div style={{width:'100%', height:'100%', background:'#000'}}>
        {gameLoaded === false ? this.renderLoadingProgress() : null}
        <canvas ref={this.canvasReference} style={{display: gameLoaded ? 'inline' : 'none'}} />
      </div>
    );
  }

  renderLoadingProgress = () => {
    const { connectedToServer, characterLoaded, groundLoaded } = this.state;
    return (
      <div style={{background:'black', color:'white'}}>
        <div>
          Game server: {connectedToServer ? <small>Connected.</small> : <small>Connecting...</small>}
        </div>
        <div>
          Character: {characterLoaded ? <small>Loaded.</small> : <small>Loading...</small>}
        </div>
        <div>
          Ground: {groundLoaded ? <small>Loaded.</small> : <small>Loading...</small>}
        </div>
      </div>
    );
  }
}

export default Game;
