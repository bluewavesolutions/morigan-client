import React, { Component, ChangeEvent } from 'react';
import { ChatState } from './types';
import { connect, ConnectedProps } from 'react-redux';
import { updateChatMessage, sendChatMessage } from './actions';
import './Chat.css';

const mapState = (state: {chat: ChatState}) => ({
    messages: state.chat.messages,
    chatMessage: state.chat.chatMessage
})
  
const mapDispatch = {
    UpdateChatMessage: updateChatMessage,
    SendChatMessage: sendChatMessage
}
  
const connector = connect(mapState, mapDispatch)
  
type PropsFromRedux = ConnectedProps<typeof connector>

class Chat extends Component<PropsFromRedux> {
    render() {
        return (
            <div id="chat">
                <div id="chat_messages">
                    {this.props.messages.map(message => (
                        <div className="chat_message">
                            {JSON.stringify(message)}
                        </div>
                    ))}
                </div>
                <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    this.props.UpdateChatMessage(event.target.value);
                }} />
                <button onClick={async () => {
                    this.props.SendChatMessage({
                        sessionToken: '',
                        message: this.props.chatMessage,
                        messageTo: '',
                        messageType: 'GLOBAL',
                    });
                }}>
                    Send
                </button>
            </div>
        )
    }
}

export default connector(Chat);