// @flow
import React from 'react';
import {connect} from 'react-redux';

import Channel from '../components/Channel';

import {getChannelList} from '../selectors';

type ChannelType = {
    id: number,
    label: string,
    name: string,
};

type ChannelListPropTypes = {
    channels: Array<ChannelType>,
    onClick: (id: number) => void,
};

const ChannelList = ({channels, onClick}: ChannelListPropTypes) => (
    <div className="channel-list">
        {channels.map(item => <Channel label={item.label} onClick={() => onClick(item.id)} />)}
    </div>
);

export default connect(
    state => ({channels: getChannelList(state)}),
    dispatch => ({
        onClick: (channelId) => dispatch(),
    }),
)(ChannelList);
