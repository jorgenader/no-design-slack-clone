import React from 'react';

import {Connector} from '../service/websocket_service';

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        Connector(
            'cursor/stream/',
            ::this.onError, ::this.onReceiveMessage).then((service) => {
                this.service = service;
            });
        this.state = {time: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.onTick(), 32);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    onTick() {
        if (this.service && this.service.ws.readyState === 1) {
            this.service.send('test', {time: new Date().getTime()});
        }
    }

    onError(error) {
        console.log(error);
        clearInterval(this.timerID);
    }

    onReceiveMessage(message) {
        this.setState({time: new Date(message.time)});
    }

    render() {
        const {time} = this.state;
        const {id} = this.props;
        return <div className="time-display">{id + 1}: {time.toTimeString()} {time.getMilliseconds()}ms</div>;
    }
}
