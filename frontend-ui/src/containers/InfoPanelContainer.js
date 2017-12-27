// @flow

import { connect } from "react-redux";
import type { State } from "../state";
import type { Props } from "../components/InfoPanel";

import InfoPanel from "../components/InfoPanel";

const mapStateToProps = (state: State): Props => {
  // console.log("State used for InfoPanel: " + JSON.stringify(state));
  return {
    money: state.amtMoney,
    materials: state.numMaterials,
    widgets: state.numWidgets,

    buyerDrones: state.buyerDronesData.numDrones,
    buyerCostPerTick: state.buyerDronesData.numDrones.times(
      state.buyerDronesData.upkeepPrice
    ),

    workerDrones: state.workerDronesData.numDrones,
    workerCostPerTick: state.workerDronesData.numDrones.times(
      state.workerDronesData.upkeepPrice
    ),

    salesDrones: state.salesDronesData.numDrones,
    salesCostPerTick: state.salesDronesData.numDrones.times(
      state.salesDronesData.upkeepPrice
    )
  };
};

const InfoPanelContainer = connect(mapStateToProps)(InfoPanel);

export default InfoPanelContainer;
