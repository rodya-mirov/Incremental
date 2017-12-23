// @flow

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import registerServiceWorker from "./registerServiceWorker";

import App from "./components/App";
import reducer from "./reducers";
import { initialState } from "./state";
import { updateAction } from "./actions/index";

import "./index.css";

let root = document.getElementById("root");

if (root != null) {
  const store = createStore(reducer, initialState);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );

  setInterval(() => store.dispatch(updateAction()), 100);

  // Boilerplate from the generator; I forgot what it does (efficiency???)
  registerServiceWorker();
} else {
  console.error("Could not find DOM element 'root', exploding");
}
