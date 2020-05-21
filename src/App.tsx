import React, { Component } from 'react';
import { GameState } from './game/types';
import { connect, ConnectedProps } from 'react-redux';
import { thunkStartEngine } from './game/actions';
import BottomPanel from './components/bottomPanel/BottomPanel';
import GameWindow from './game/GameWindow';
import LoadingModal from './components/loadingModal/LoadingModal';
import TopPanel from './components/topPanel/TopPanel';
import LeftPanel from './components/leftPanel/LeftPanel';
import Characters from './components/characters/Characters';
import './App.css';

const mapState = (state: {game: GameState}) => ({
  characterLoaded: state.game.characterLoaded,
  groundLoaded: state.game.groundLoaded,
  serverConnectionStatus: state.game.serverConnectionStatus
})

const mapDispatch = {
  ThunkStartEngine: thunkStartEngine,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class App extends Component<PropsFromRedux> {

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    const character = localStorage.getItem('character');

    if (jwt == null || character == null) {
      return;
    }

    this.props.ThunkStartEngine();
  }

  render() {
    return (
      <main>
        {this.isLoaded() === false ? <LoadingModal /> : null}
        {this.props.characterLoaded === false ? <Characters /> : null}
        <div id="grid_layout">
          <TopPanel />
          <LeftPanel />
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