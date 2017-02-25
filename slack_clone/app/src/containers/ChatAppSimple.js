import React from 'react';
import {connect} from 'react-redux';
import {Resource} from 'tg-resources';

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

        this.service = null;
        this.api = new Resource('/api/v1/simple/messages');
        this.api.fetch().then((data: Array<Object>) => data.reverse().forEach(msg => this.onReceiveMessage(msg)));
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
        if (!this.service) {
            return;
        }
        this.props.dispatch(setName(name));
        this.service.send('join', {user: name});
    }

    render() {
        const {name} = this.props;

        return (
            <div>
                <div className="col-md-12">
                    <div className="row">
                        <MessageList />
                    </div>
                    <div className="row message--input">
                        {name ?
                            <NameInput multiline text="Send" onSet={text => this.onSendMessage(text)} /> :
                            <NameInput text="Set name" onSet={input => this.onSetName(input)} />
                        }
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
