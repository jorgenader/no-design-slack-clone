export class WebSocketService {
    constructor(path, onError = null, onMessage = null) {
        this.onMessage = onMessage || this.onMessage;
        this.onError = onError;

        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

        const siteUrl = `${protocol}://${window.location.host}/${path}`;
        console.log(`Connecting to ${siteUrl}`); // eslint-disable-line

        this.ws = new WebSocket(siteUrl);
        this.ws.addEventListener('message', this.parseMessage);
    }

    addEventListener(type, listener, useCapture) {
        this.ws.addEventListener(type, listener, useCapture);
    }

    removeEventListener(type, listener, useCapture) {
        this.ws.removeEventListener(type, listener, useCapture);
    }

    parseMessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.error) {
            this.onError(data.error);
        } else {
            this.onMessage(data);
        }
    };

    onError = (error) => {
        console.error(error); // eslint-disable-line
    };

    onMessage = (data) => {
        console.log(data);  // eslint-disable-line
    };

    send = (channel, data) => {
        this.ws.send(JSON.stringify({type: channel, ...data}));
    };
}

export const Connector = (path, onError = null, onMessage = null) => (
    new Promise((resolve, reject) => {
        const socket = new WebSocketService(path, onError, onMessage);

        socket.addEventListener('error', reject);
        const onConnect = () => {
            socket.removeEventListener('error', reject);
            resolve(socket);
            socket.removeEventListener('open', onConnect);
            console.log(`Connected ...`); // eslint-disable-line
        };
        socket.addEventListener('open', onConnect);
    })
);
