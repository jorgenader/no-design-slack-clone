import React from 'react';
import classnames from 'classnames';

type NameInputProps = {
    text: string,
    multiline: boolean,
    onSet: () => void,
};

export default ({text, onSet, multiline}: NameInputProps) => {
    let nameInput;

    const onClickHandler = () => {
        if (nameInput.value && nameInput.value !== '' && nameInput.value !== null) {
            onSet(nameInput.value);
            nameInput.value = '';
            if (multiline) {
                nameInput.focus();
            }
        }
    };

    const onKeyPress = (evt) => {
        if (evt.charCode === 13) {
            if (multiline && evt.shiftKey) {
                nameInput.value += '\n';
            } else {
                evt.preventDefault();
                onClickHandler();
            }
        }
    };

    const btnClasses = classnames('btn', 'btn-default', {multiline});

    const input = multiline ?
        <textarea className="form-control" autoFocus rows="3" onKeyPress={onKeyPress} ref={el => nameInput = el} /> :
        <input className="form-control" autoFocus onKeyPress={onKeyPress} ref={el => nameInput = el} />;

    return (
        <div className="input-group">
            {input}
            <span className="input-group-btn">
                <button className={btnClasses} onClick={onClickHandler} type="button">{text}</button>
            </span>
        </div>
    );
};
