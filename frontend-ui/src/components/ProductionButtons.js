// @flow

import React from "react";

import bigInt from "big-integer";

type ProductionButtonsProps = {
  buyMaterials: bigInt => void,
  materialsPrice: bigInt,
  makeWidget: bigInt => void,
  materialsPerWidget: bigInt,
  sellWidget: bigInt => void,
  widgetPrice: bigInt,
  buyBuyerDrone: bigInt => void,
  buyerDronePrice: bigInt,
  buyWorkerDrone: bigInt => void,
  workerDronePrice: bigInt,
  buySalesDrone: bigInt => void,
  salesDronePrice: bigInt
};

const ButtonComponent = (props: { onClick: void => void, text: string }) => {
  return (
    <td>
      <button onClick={props.onClick}>{props.text}</button>
    </td>
  );
};

/**
 * Panel for displaying "do things" buttons
 */
const ProductionButtons = (props: ProductionButtonsProps) => (
  <div className="productionButtons">
    <table>
      <tr>
        <ButtonComponent
          onClick={() => props.buyMaterials(bigInt(1))}
          text={"Buy Materials (for $" + props.materialsPrice.toString() + ")"}
        />
        <ButtonComponent
          onClick={() => props.makeWidget(bigInt(1))}
          text={"Make Widget (for M" + props.materialsPrice.toString() + ")"}
        />
        <ButtonComponent
          onClick={() => props.sellWidget(bigInt(1))}
          text={"Sell Widget (for $" + props.materialsPrice.toString() + ")"}
        />
      </tr>
      <tr>
        <ButtonComponent
          onClick={() => props.buyBuyerDrone(bigInt(1))}
          text={
            "Hire Buyer Drone (for $" + props.buyerDronePrice.toString() + ")"
          }
        />
        <ButtonComponent
          onClick={() => props.buyWorkerDrone(bigInt(1))}
          text={
            "Hire Worker Drone (for $" + props.workerDronePrice.toString() + ")"
          }
        />
        <ButtonComponent
          onClick={() => props.buySalesDrone(bigInt(1))}
          text={
            "Hire Sales Drone (for $" + props.salesDronePrice.toString() + ")"
          }
        />
      </tr>
    </table>
  </div>
);

export default ProductionButtons;
