import React from 'react';
import {connect} from 'react-redux';

import CursorList from './CursorList';
import Capture from './Capture';
import NameInput from '../components/NameInput';

import {setName} from '../actions';

type CursorAppProps = {
    name: string,
    onSetName: () => void,
};

const CursorApp = ({name, onSetName}: CursorAppProps) => {
    if (!name) {
        return (<div><CursorList /><NameInput onSet={onSetName} /></div>);
    }
    return (
        <div>
            <Capture />
            <CursorList />
        </div>
    );
};

export default connect(
    state => ({
        name: state.name,
    }),
    dispatch => ({
        onSetName: name => dispatch(setName(name)),
    }))(CursorApp);
