import WebSocket from 'reconnecting-websocket';

// import * from '../actions';

export default class CursorService {
    constructor() {
        let siteUrl = window.location.host;
        const options = {connectionTimeout: 1000};

        siteUrl = siteUrl.replace(/https:\/\/(.*)/, 'wss://$1/cursor/stream/');
        siteUrl = siteUrl.replace(/http:\/\/(.*)/, 'ws://$1/cursor/stream/');

        this.ws = WebSocket(siteUrl, options);
        this.ws.onmessage = this.messageRecv;
    }

    messageRecv = (data) => {
        console.log(data);
    };

    send = (name, x, y) => {
        this.ws.send(JSON.stringify({type: 'cursor.update', text: {name, x, y}}));
    };
}
