// @flow

import React from "react";
import PropTypes from "prop-types";

import bigInt from "big-integer";

type ProductionButtonsProps = {
  makeWidget: (number | bigInt) => void,
  sellWidget: (number | bigInt) => void,
  widgetPrice: bigInt,
  buyWorkerDrone: (number | bigInt) => void,
  workerDronePrice: bigInt,
  buySalesDrone: (number | bigInt) => void,
  salesDronePrice: bigInt
};

/**
 * Panel for displaying "do things" buttons
 */
const ProductionButtons = (props: ProductionButtonsProps) => (
  <div className="productionButtons">
    <button onClick={() => props.makeWidget(1)}>Make Widget</button>
    <button onClick={() => props.sellWidget(1)}>
      Sell Widget (for ${props.widgetPrice.toString()})
    </button>
    <button onClick={() => props.buyWorkerDrone(1)}>
      Hire Worker Drone (for ${props.workerDronePrice.toString()})
    </button>
    <button onClick={() => props.buySalesDrone(1)}>
      Hire Sales Drone (for ${props.salesDronePrice.toString()})
    </button>
  </div>
);

ProductionButtons.propTypes = {
  makeWidget: PropTypes.func.isRequired, // make a new widget
  sellWidget: PropTypes.func.isRequired, // sell an existing widget for money
  widgetPrice: PropTypes.instanceOf(bigInt).isRequired, // price of a widget (selling)
  buyWorkerDrone: PropTypes.func.isRequired, // hire a worker who will make widgets
  workerDronePrice: PropTypes.instanceOf(bigInt).isRequired, // cost of hiring a worker drone
  buySalesDrone: PropTypes.func.isRequired, // hire a worker who will sell widgets
  salesDronePrice: PropTypes.instanceOf(bigInt).isRequired // cost of hiring a sales drone
};

export default ProductionButtons;
