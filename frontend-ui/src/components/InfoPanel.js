// @flow

import React from "react";
import bigInt from "big-integer";

type Props = {
  money: bigInt,
  materials: bigInt,
  widgets: bigInt,

  buyerDrones: bigInt,
  buyerCostPerTick: bigInt,

  workerDrones: bigInt,
  workerCostPerTick: bigInt,

  salesDrones: bigInt,
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
        <td>Materials:</td>
        <td>{props.materials.toString()}</td>
      </tr>
      <tr>
        <td>Widgets:</td>
        <td>{props.widgets.toString()}</td>
      </tr>
      <tr>
        <td>Buyer Drones:</td>
        <td>{props.buyerDrones.toString()}</td>
        <td>Cost/Tick:</td>
        <td>${props.buyerCostPerTick.toString()}</td>
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

export default InfoPanel;
