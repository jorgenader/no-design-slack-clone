import React from 'react';
import classnames from 'classnames';


type ChannelPropType = {label: string, onClick: (number) => void};
type ChannelStateType = {hover: boolean};

export default class Channel extends React.Component {
    props: ChannelPropType;
    state: ChannelStateType;

    constructor(props) {
        super(props);

        this.state = {hover: false};
    }

    render() {
        const channelClasses = classnames('channel', {'channel--hover': this.state.hover});
        return <button className={channelClasses} onClick={this.props.onClick}>#{this.props.label}</button>;
    }
}
