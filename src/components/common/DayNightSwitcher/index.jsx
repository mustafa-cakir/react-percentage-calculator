import React from 'react';
import { useGlobalState } from '../../../StateContext';
import './Style.scss';

const DayNightSwitcher = () => {
    const [state, dispatch] = useGlobalState();
    const { isThemeDark } = state;

    const onChangeHandler = () => {
        dispatch({ type: 'GLOBAL_CHANGE_THEME' });
    };

    return (
        <label className="dayNight">
            <input type="checkbox" defaultChecked={!isThemeDark} onChange={onChangeHandler} />
            <div />
        </label>
    );
};

export default DayNightSwitcher;
