import React, { Component } from 'react';
import './GameWindow.css';

class GameWindow extends Component {
    render() {
        return (
            <div id="game_window">
                <canvas id="game"></canvas>
            </div>
        )
    }
}

export default GameWindow;