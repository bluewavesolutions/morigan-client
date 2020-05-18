import React, { Component } from 'react';
import Chat from '../chat/Chat';
import './LeftPanel.css';

class LeftPanel extends Component {
    render() {
        return (
            <div id="left_panel">
                <Chat />
            </div>
        )
    }
}

export default LeftPanel;