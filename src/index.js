import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-73091430-2');

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

registerServiceWorker();
