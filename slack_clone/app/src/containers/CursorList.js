import React from 'react';
import {connect} from 'react-redux';

import Cursor from '../components/Cursor';

type CursorListProps = {
    cursors: Object,
};

const CursorList = ({cursors}: CursorListProps) => (
    <div>
        {Object.entries(cursors).map(([name, pos]) => (<Cursor name={name} {...pos} />))}
    </div>
);

export default connect(({cursors}) => ({cursors}))(CursorList);
