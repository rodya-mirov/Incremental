import React from 'react';

import './App.css';

import InfoPanelContainer from '../containers/InfoPanelContainer';
import ProductionButtonsContainer from '../containers/ProductionButtonsContainer';

/**
 * Main application component. Properties drawn from redux state
 */
const App = props => (
  <div className="app">
    <InfoPanelContainer />
    <ProductionButtonsContainer />
  </div>
);

export default App;
