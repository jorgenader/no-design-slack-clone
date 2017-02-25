import React from 'react';
import {connect} from 'react-redux';

import Message from '../components/Message';

type MessageListProps = {
    messages: Array<Object>,
};

const MessageList = ({messages}: MessageListProps) => (
    <div className="message--list">
        {messages.map(message => <Message key={message.id} message={message.message} user={message.user} />)}
    </div>
);

export default connect(({messages}) => ({messages}))(MessageList);
