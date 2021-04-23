import React from 'react';
import { useGlobalState } from '../../../StateContext';
import './Style.scss';

const DayNightSwitcher = () => {
    const [, dispatch] = useGlobalState();

    const onChangeHandler = () => {
        dispatch({ type: 'GLOBAL_CHANGE_THEME' });
    };

    return (
        <label className="dayNight">
            <input type="checkbox" onChange={onChangeHandler} />
            <div />
        </label>
    );
};

export default DayNightSwitcher;
