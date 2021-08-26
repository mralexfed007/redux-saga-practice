import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import {ConnectedRouter} from 'connected-react-router'
import store from './redux';
import {history} from './redux/reducers';
import Routes from './routes';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.min.css';

const theme = createTheme();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') 
);