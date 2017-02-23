import React from 'react';

type NameInputProps = {onSet: () => void};

export default ({onSet}: NameInputProps) => {
    let nameInput;

    return (
        <div style={{margin: '0 auto', display: 'inline'}}>
            <input minLength={1} ref={el => nameInput = el} />
            <button onClick={() => nameInput.value? onSet(nameInput.value): false}>Set name</button>
        </div>
    );
};
