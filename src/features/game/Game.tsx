import React, { Component } from 'react';
import { Renderer } from '../../game/core/Renderer';
import { EngineMediator } from '../../game/core/EngineMediator';
import { Server } from '../../game/servcer/Server';
import { ServerEventInterpreter } from '../../game/interpeters/ServerEventInterpreter';
import { EngineStore } from '../../game/store/EngineStore';
import { KeyboardListener } from '../../game/core/KeyboardListener';
import { Character } from '../../game/core/Character';
import { Ground } from '../../game/core/Ground';

class Game extends Component {
  canvasReference: React.RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);
    this.canvasReference = React.createRef();
  }

  componentDidMount() {
    const engineStore = new EngineStore();

    const engineMediator = new EngineMediator();
    const canvas = this.canvasReference.current as HTMLCanvasElement;

    const character = new Character(engineMediator, engineStore);
    const ground = new Ground(engineMediator);

    const renderer = new Renderer(canvas, engineMediator, ground, character);
    renderer.start();

    const serverEventInterpreter = new ServerEventInterpreter(engineMediator, engineStore);
    const keyboardListerner = new KeyboardListener(engineMediator);
    
    const server = new Server(engineMediator, engineStore);
    server.connect();
  }

  render() {
    return (
        <canvas ref={this.canvasReference} style={{background:'#43d8c9'}} />
    );
  }
}

export default Game;
