// @flow

import React from "react";
import PropTypes from "prop-types";
import bigInt from "big-integer";

type Props = {
  money: bigInt,
  widgets: bigInt,
  workerDrones: bigInt,
  salesDrones: bigInt,
  workerCostPerTick: bigInt,
  salesCostPerTick: bigInt
};

/**
 * Panel for displaying current assets.
 */
const InfoPanel = (props: Props) => (
  <table className="infoPanel-table">
    <tbody>
      <tr>
        <td>Money:</td>
        <td>${props.money.toString()}</td>
      </tr>
      <tr>
        <td>Widgets:</td>
        <td>{props.widgets.toString()}</td>
      </tr>
      <tr>
        <td>Worker Drones:</td>
        <td>{props.workerDrones.toString()}</td>
        <td>Cost/Tick:</td>
        <td>${props.workerCostPerTick.toString()}</td>
      </tr>
      <tr>
        <td>Sales Drones:</td>
        <td>{props.salesDrones.toString()}</td>
        <td>Cost/Tick:</td>
        <td>${props.salesCostPerTick.toString()}</td>
      </tr>
    </tbody>
  </table>
);

InfoPanel.propTypes = {
  money: PropTypes.instanceOf(bigInt).isRequired, // amount of money owned
  widgets: PropTypes.instanceOf(bigInt).isRequired, // amount of widgets owned

  workerDrones: PropTypes.instanceOf(bigInt).isRequired,
  workerCostPerTick: PropTypes.instanceOf(bigInt).isRequired,

  salesDrones: PropTypes.instanceOf(bigInt).isRequired,
  salesCostPerTick: PropTypes.instanceOf(bigInt).isRequired
};

export default InfoPanel;
