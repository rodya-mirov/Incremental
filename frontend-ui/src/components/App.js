// @flow

import React from "react";

import "./App.css";

import InfoPanelContainer from "../containers/InfoPanelContainer";
import ProductionButtonsContainer from "../containers/ProductionButtonsContainer";
import LogPanelContainer from "../containers/LogPanelContainer";

/**
 * Main application component. Properties drawn from redux state
 */
const App = (props: mixed) => (
  <div className="app">
    <InfoPanelContainer />
    <ProductionButtonsContainer />
    <LogPanelContainer />
  </div>
);

export default App;
