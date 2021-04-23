import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import HomepageContainer from './components/Homepage/HomepageContainer';
import './assets/styles/bootstrap-grid.scss'; // Import Bootstrap Grid's
import './assets/styles/global.scss';
import { GlobalStateProvider } from './StateContext';

ReactDOM.render(
    <React.StrictMode>
        <div className="app">
            <GlobalStateProvider>
                <HomepageContainer />
            </GlobalStateProvider>
        </div>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
