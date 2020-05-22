import React, { Component, ChangeEvent } from 'react';
import { ChatState } from './types';
import { connect, ConnectedProps } from 'react-redux';
import { updateChatMessage, sendChatMessage, changeKeyboardManagerStatus } from './actions';
import './Chat.css';

const mapState = (state: {chat: ChatState}) => ({
    messages: state.chat.messages,
    chatMessage: state.chat.chatMessage
})
  
const mapDispatch = {
    UpdateChatMessage: updateChatMessage,
    SendChatMessage: sendChatMessage,
    ChangeKeyboardManagerStatus: changeKeyboardManagerStatus
}
  
const connector = connect(mapState, mapDispatch)
  
type PropsFromRedux = ConnectedProps<typeof connector>

class Chat extends Component<PropsFromRedux> {
    render() {
        return (
            <div className="chat-container">
                <div className="chat-wrapper">
                    <div className="chat-messages">
                        <div className="chat-buffer">
                            {this.props.messages.map(e => (
                                <div className="chat-message">
                                    <small>[{e.Time}]</small> {e.Nick}: {e.Message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="chat-input">
                    <input type="text"
                        value={this.props.chatMessage}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => this.props.UpdateChatMessage(event.target.value)}
                        onFocus={() => this.props.ChangeKeyboardManagerStatus('locked')}
                        onBlur={() => this.props.ChangeKeyboardManagerStatus('unlocked')} />
                    <div className="button green flat" onClick={async () => {
                        this.props.SendChatMessage({
                            message: this.props.chatMessage
                        });

                        const element = document.getElementsByClassName("chat-wrapper")[0];
                        element.scrollTop = element.scrollHeight;
                    }}>
                        >
                    </div>
                </div>
            </div>
        )
    }
}

export default connector(Chat);