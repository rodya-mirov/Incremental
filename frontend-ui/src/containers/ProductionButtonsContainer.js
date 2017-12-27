// @flow
import { connect } from "react-redux";
import type { State } from "../state";

import {
  makeWidgetsAction,
  sellWidgetsAction,
  hireBuyerDronesAction,
  hireWorkerDronesAction,
  hireSalesDronesAction,
  buyMaterialsAction
} from "../actions";

import ProductionButtons from "../components/ProductionButtons";

const mapStateToProps = (state: State) => {
  return {
    materialsPrice: state.materialBuyPrice,
    materialsPerWidget: state.materialsPerWidget,
    widgetPrice: state.widgetSellPrice,

    buyerDronePrice: state.buyerDronesData.hirePrice,
    workerDronePrice: state.workerDronesData.hirePrice,
    salesDronePrice: state.salesDronesData.hirePrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buyMaterials: numMaterials => {
      dispatch(buyMaterialsAction(numMaterials));
    },
    makeWidget: numWidgets => {
      dispatch(makeWidgetsAction(numWidgets));
    },
    sellWidget: numWidgets => {
      dispatch(sellWidgetsAction(numWidgets));
    },

    buyBuyerDrone: numBuyers => {
      dispatch(hireBuyerDronesAction(numBuyers));
    },
    buyWorkerDrone: numWorkers => {
      dispatch(hireWorkerDronesAction(numWorkers));
    },
    buySalesDrone: numWorkers => {
      dispatch(hireSalesDronesAction(numWorkers));
    }
  };
};

const ProductionButtonsContainer = connect(mapStateToProps, mapDispatchToProps)(
  ProductionButtons
);

export default ProductionButtonsContainer;
