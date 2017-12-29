// @flow

import React from "react";

import { BigInteger } from "../libs/big-int-wrapper";
import costViewer from "./costViewer";

export type DroneBuyData = {
  buyDrone: BigInteger => void,
  dronePrice: BigInteger,
  droneUpkeep: BigInteger
};

export type ProductionButtonsProps = {
  buyMaterials: BigInteger => void,
  materialsPrice: BigInteger,

  makeWidget: BigInteger => void,
  materialsPerWidget: BigInteger,

  sellWidget: BigInteger => void,
  widgetPrice: BigInteger,

  buyerDrone: DroneBuyData,
  workerDrone: DroneBuyData,
  salesDrone: DroneBuyData
};

const ButtonComponent = (props: { onClick: () => void, text: string }) => {
  return (
    <td>
      <button onClick={props.onClick}>{props.text}</button>
    </td>
  );
};

const DroneBuyComponent = (props: {
  droneData: DroneBuyData,
  droneName: string
}) => {
  const costData = costViewer({
    units: "$",
    amtInstant: props.droneData.dronePrice,
    amtPerUpkeep: props.droneData.droneUpkeep
  });
  const message = `Hire ${props.droneName}: ${costData}`;
  return (
    <ButtonComponent
      onClick={() => props.droneData.buyDrone(new BigInteger(1))}
      text={message}
    />
  );
};

/**
 * Panel for displaying "do things" buttons
 */
const ProductionButtons = (props: ProductionButtonsProps) => {
  console.log("Production buttons props", props);
  return (
    <div className="productionButtons">
      <table>
        <tr>
          <ButtonComponent
            onClick={() => props.buyMaterials(new BigInteger(1))}
            text={
              "Buy Materials (for $" + props.materialsPrice.toString() + ")"
            }
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
          <DroneBuyComponent
            droneData={props.buyerDrone}
            droneName={"buyer drone"}
          />
          <DroneBuyComponent
            droneData={props.workerDrone}
            droneName={"worker drone"}
          />
          <DroneBuyComponent
            droneData={props.salesDrone}
            droneName={"sales drone"}
          />
        </tr>
      </table>
    </div>
  );
};

export default ProductionButtons;
