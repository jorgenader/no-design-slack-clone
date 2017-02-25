import React from 'react';
import {connect} from 'react-redux';

import {Connector} from '../service/websocket_service';

import NameInput from '../components/NameInput';
import MessageList from '../containers/MessageList';

import {setName, ERROR, ADD_MESSAGE} from '../actions';

type ChatWindowProps = {
    name: string,
    dispatch: () => void,
};

class ChatWindow extends React.Component {
    props: ChatWindowProps;

    constructor(props) {
        super(props);

        Connector(
            'simple/stream/',
            ::this.onError, ::this.onReceiveMessage).then((service) => {
                this.service = service;
            });
    }

    onError(error) {
        this.props.dispatch({type: ERROR, error});
    }

    onReceiveMessage(message) {
        this.props.dispatch({type: ADD_MESSAGE, data: {...message}});
    }

    onSendMessage(message) {
        this.service.send('message', {text: message, user: this.props.name});
    }

    onSetName(name) {
        this.props.dispatch(setName(name));
        this.service.send('join', {user: name});
    }

    render() {
        const {name} = this.props;

        if (!name) {
            return (
                <div style={{width: '400px'}}>
                    <NameInput text="Set name" onSet={input => this.onSetName(input)} />
                </div>
            );
        }

        return (
            <div>
                <div className="col-md-4">
                    {/* render user list */}
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <MessageList />
                    </div>
                    <div className="row message--input">
                        <NameInput multiline text="Send" onSet={text => this.onSendMessage(text)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        name: state.name,
    }),
    dispatch => ({
        dispatch,
    }))(ChatWindow);
