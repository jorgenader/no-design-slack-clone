import React from 'react';

type MessageProps = {
    user: string,
    message: string,
};

export default ({user, message}: MessageProps) => <p className="message"><b>{user}:</b> {message}</p>;
