import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './BottomPanel.css';

class BottomPanel extends Component {
    render() {
        return (
            <div id="bottom_panel">
                <div className="button green" onClick={() => {
                    localStorage.removeItem('character');
                    window.location.reload();
                }}>
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                </div>
            </div>
        )
    }
}

export default BottomPanel;