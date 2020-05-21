import React, { Component } from 'react';
import './BottomPanel.css';

class BottomPanel extends Component {
    render() {
        return (
            <div id="bottom_panel">
                <button onClick={() => {
                    localStorage.removeItem('character');
                    window.location.reload();
                }}>
                    Logout
                </button>
            </div>
        )
    }
}

export default BottomPanel;