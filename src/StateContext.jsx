import React from 'react';

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'GLOBAL_CHANGE_THEME':
            return {
                ...state,
                isThemeDark: !state.isThemeDark,
            };
        case 'SOME_OTHER_CASE': {
            return {
                ...state,
            };
        }

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const initialState = {
    isThemeDark: true,
};

const GlobalStateContext = React.createContext(initialState);

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(globalReducer, initialState);
    const value = [state, dispatch];
    const { isThemeDark } = state;
    return (
        <GlobalStateContext.Provider value={value}>
            <div className={`app ${isThemeDark ? 'is-dark' : 'is-light'}`}>{children}</div>
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = React.useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within the GlobalStateProvider');
    }
    return context;
};
