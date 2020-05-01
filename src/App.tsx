import React, { Component } from 'react';
import Game from './features/game/Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Game />
      </div>
    );
  }
}

export default App;
