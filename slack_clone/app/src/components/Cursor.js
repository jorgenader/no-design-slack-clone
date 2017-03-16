import React from 'react';

type CursorType = {
    x: number,
    y: number,
    name: string,
}

export default ({x, y, name}: CursorType) => (
    <i className="cursor" style={{top: `${y}%`, left: `${x}%`}}>{name}</i>
);
