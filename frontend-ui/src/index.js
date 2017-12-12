import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, dispatch } from 'redux';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import reducer, { initialState } from './reducers';

import './index.css';
import { updateAction } from './actions/index';

const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

setInterval(() => store.dispatch(updateAction()), 1000);

// Boilerplate from the generator; I forgot what it does (efficiency???)
registerServiceWorker();
