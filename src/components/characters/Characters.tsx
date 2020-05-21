import React, { Component } from "react";
import { GameState } from "../../game/types";
import { thunkListCharacters, thunkStartEngine } from "../../game/actions";
import { connect } from "react-redux";
import { ConnectedProps } from "react-redux";
import './Characters.css';

const mapState = (state: {game: GameState}) => ({
    jwt: state.game.jwt,
    character: state.game.character,
    credentialsLoaded: state.game.credentialsLoaded,
    characterList: state.game.characterList
})
  
const mapDispatch = {
    ThunkListCharacters: thunkListCharacters,
    ThunkStartEngine: thunkStartEngine
}
  
const connector = connect(mapState, mapDispatch)
  
type PropsFromRedux = ConnectedProps<typeof connector>

class Characters extends Component<PropsFromRedux> {
    componentDidMount() {
        const { credentialsLoaded } = this.props;
        if (credentialsLoaded === false) {
            this.props.ThunkListCharacters();
        }
    }

    render() {
        return(
            <div id='characters'>
                {this.props.characterList.map(e => (
                    <div id='character_details' key={e.id + '_' + e.accountId}>
                        <h2>{e.nick}</h2>
                        <p>{e.world.name}</p>
                        <button onClick={() => {
                            localStorage.setItem('character', e.id.toString());
                            this.props.ThunkStartEngine();
                        }}>
                            Enter
                        </button>
                    </div>
                ))}
            </div>
        );
    }
}

export default connector(Characters);