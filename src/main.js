import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MoviesApp from './components/MoviesApp.jsx';

import store from './store';

import 'normalize.css';
import './assets/main.css';

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <MoviesApp />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
