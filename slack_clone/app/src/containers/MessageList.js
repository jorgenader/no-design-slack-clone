import React from 'react';
import {connect} from 'react-redux';

import Message from '../components/Message';

type MessageListProps = {
    messages: Array<Object>,
};

class MessageList extends React.Component {
    props: MessageListProps;

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    render() {
        const {messages} = this.props;
        return (
            <div className="message--list" ref={(div) => { this.messageList = div; }}>
                {messages.map(message => <Message key={message.id} message={message.message} user={message.user} />)}
            </div>
        );
    }
}

export default connect(({messages}) => ({messages}))(MessageList);
