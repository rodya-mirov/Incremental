// @flow

import { connect } from "react-redux";

import InfoPanel from "../components/InfoPanel";

const mapStateToProps = state => {
  // console.log("State used for InfoPanel: " + JSON.stringify(state));
  return {
    money: state.amtMoney,
    widgets: state.numWidgets,

    workerDrones: state.numWorkerDrones,
    workerCostPerTick: state.numWorkerDrones.times(state.workerDroneUpkeep),

    salesDrones: state.numSalesDrones,
    salesCostPerTick: state.numSalesDrones.times(state.salesDroneUpkeep)
  };
};

const InfoPanelContainer = connect(mapStateToProps)(InfoPanel);

export default InfoPanelContainer;
