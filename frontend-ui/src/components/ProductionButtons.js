// @flow

import React from "react";

import { BigInteger } from "../libs/big-int-wrapper";

type ProductionButtonsProps = {
  buyMaterials: BigInteger => void,
  materialsPrice: BigInteger,
  makeWidget: BigInteger => void,
  materialsPerWidget: BigInteger,
  sellWidget: BigInteger => void,
  widgetPrice: BigInteger,
  buyBuyerDrone: BigInteger => void,
  buyerDronePrice: BigInteger,
  buyWorkerDrone: BigInteger => void,
  workerDronePrice: BigInteger,
  buySalesDrone: BigInteger => void,
  salesDronePrice: BigInteger
};

const ButtonComponent = (props: { onClick: () => void, text: string }) => {
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
          onClick={() => props.buyMaterials(new BigInteger(1))}
          text={"Buy Materials (for $" + props.materialsPrice.toString() + ")"}
        />
        <ButtonComponent
          onClick={() => props.makeWidget(new BigInteger(1))}
          text={
            "Make Widget (for M" + props.materialsPerWidget.toString() + ")"
          }
        />
        <ButtonComponent
          onClick={() => props.sellWidget(new BigInteger(1))}
          text={"Sell Widget (for $" + props.widgetPrice.toString() + ")"}
        />
      </tr>
      <tr>
        <ButtonComponent
          onClick={() => props.buyBuyerDrone(new BigInteger(1))}
          text={
            "Hire Buyer Drone (for $" + props.buyerDronePrice.toString() + ")"
          }
        />
        <ButtonComponent
          onClick={() => props.buyWorkerDrone(new BigInteger(1))}
          text={
            "Hire Worker Drone (for $" + props.workerDronePrice.toString() + ")"
          }
        />
        <ButtonComponent
          onClick={() => props.buySalesDrone(new BigInteger(1))}
          text={
            "Hire Sales Drone (for $" + props.salesDronePrice.toString() + ")"
          }
        />
      </tr>
    </table>
  </div>
);

export default ProductionButtons;
