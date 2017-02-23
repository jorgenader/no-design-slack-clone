import React from 'react';


export default class Capture extends React.Component {
    componentDidMount() {
        window.onmousemove = (evt) => {
            console.log(evt);
        };
    }

    render() {
        return null;
    }
}
