// @flow

import { connect } from "react-redux";
import type { State } from "../state";

import InfoPanel from "../components/InfoPanel";

const mapStateToProps = (state: State) => {
  // console.log("State used for InfoPanel: " + JSON.stringify(state));
  return {
    money: state.amtMoney,
    materials: state.numMaterials,
    widgets: state.numWidgets,

    buyerDrones: state.numBuyerDrones,
    buyerCostPerTick: state.numBuyerDrones.times(state.buyerDroneUpkeep),

    workerDrones: state.numWorkerDrones,
    workerCostPerTick: state.numWorkerDrones.times(state.workerDroneUpkeep),

    salesDrones: state.numSalesDrones,
    salesCostPerTick: state.numSalesDrones.times(state.salesDroneUpkeep)
  };
};

const InfoPanelContainer = connect(mapStateToProps)(InfoPanel);

export default InfoPanelContainer;
