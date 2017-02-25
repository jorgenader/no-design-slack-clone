import {combineReducers} from 'redux';

import * as actions from './actions';

const name = (state = '', action) => {
    switch (action.type) {
        case actions.SET_NAME:
            return action.name;
        default:
            return state;
    }
};

const messages = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_MESSAGE:
            return [{...action.data}, ...state];
        default:
            return state;
    }
};

const cursors = (state = {}, action) => {
    switch (action.type) {
        case actions.CURSOR_SET_POSITION:
            return {[action.payload.name]: action.payload.position, ...state};
        default:
            return state;
    }
};

export default combineReducers({name, cursors, messages});
