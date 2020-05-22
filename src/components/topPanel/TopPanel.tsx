import React, { Component } from 'react';
import { GameState } from '../../game/types';
import { connect, ConnectedProps } from 'react-redux';
import './TopPanel.css';

const mapState = (state: {game: GameState}) => ({
    nick: state.game.nick,
});
  
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

class TopPanel extends Component<PropsFromRedux> {
    render() {
        return (
            <div id="top_panel">
                <div className="nick-panel">
                    <b className="nick">{this.props.nick}</b>
                </div>
            </div>
        )
    }
}

export default connector(TopPanel);