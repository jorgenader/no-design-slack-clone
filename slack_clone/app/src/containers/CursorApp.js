import React from 'react';

import Counter from '../components/Counter';

type CursorAppProps = {
    count: number,
};

const CursorApp = ({count}: CursorAppProps) => (
    <div>
        {[...Array.from(new Array(6), (x, i) => i)].map(id => <Counter key={id} id={id} />)}
    </div>
);

export default CursorApp;
