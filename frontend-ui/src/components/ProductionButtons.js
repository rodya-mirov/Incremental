import React from 'react';
import PropTypes from 'prop-types';

import bigInt from 'big-integer';

/**
 * Panel for displaying "do things" buttons
 */
const ProductionButtons = props => (
  <div className="productionButtons">
    <button onClick={() => props.makeWidget(1)}>
      Make Widget
    </button>
    <button onClick={() => props.sellWidget(1)}>
      Sell Widget (for ${props.widgetPrice.toString()})
    </button>
    <button onClick={() => props.buyWorkerDrone(1)}>
      Hire Worker Drone (for ${props.workerDronePrice.toString()})
    </button>
    <button onClick={() => { console.log("Trying to buy a sales drone ..."); return props.buySalesDrone(1); }}>
      Hire Sales Drone (for ${props.salesDronePrice.toString()})
    </button>
  </div>
);

ProductionButtons.propTypes = {
  makeWidget: PropTypes.func.isRequired,  // make a new widget
  sellWidget: PropTypes.func.isRequired,  // sell an existing widget for money
  widgetPrice: PropTypes.instanceOf(bigInt).isRequired, // price of a widget (selling)
  buyWorkerDrone: PropTypes.func.isRequired, // hire a worker who will make widgets
  workerDronePrice: PropTypes.instanceOf(bigInt).isRequired, // cost of hiring a worker drone
  buySalesDrone: PropTypes.func.isRequired, // hire a worker who will sell widgets
  salesDronePrice: PropTypes.instanceOf(bigInt).isRequired, // cost of hiring a sales drone
};

export default ProductionButtons;