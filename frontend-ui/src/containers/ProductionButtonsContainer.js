// @flow
import { connect } from "react-redux";
import type { State, DronesData } from "../state";

import {
  makeWidgetsAction,
  sellWidgetsAction,
  hireBuyerDronesAction,
  hireWorkerDronesAction,
  hireSalesDronesAction,
  buyMaterialsAction
} from "../actions";

import ProductionButtons from "../components/ProductionButtons";
import { BigInteger } from "../libs/big-int-wrapper";
import type {
  DroneBuyData,
  ProductionButtonsProps
} from "../components/ProductionButtons";

const mapStateToProps = (state: State) => {
  let droneTypeMapper = (data: DronesData) => {
    return {
      dronePrice: data.hirePrice,
      upkeepPrice: data.upkeepPrice
    };
  };

  return {
    materialsPrice: state.materialBuyPrice,
    materialsPerWidget: state.materialsPerWidget,
    widgetPrice: state.widgetSellPrice,

    buyerDrone: droneTypeMapper(state.buyerDronesData),
    workerDrone: droneTypeMapper(state.workerDronesData),
    salesDrone: droneTypeMapper(state.salesDronesData)
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    buyMaterials: (numMaterials: BigInteger) => {
      dispatch(buyMaterialsAction(numMaterials));
    },
    makeWidget: numWidgets => {
      dispatch(makeWidgetsAction(numWidgets));
    },
    sellWidget: numWidgets => {
      dispatch(sellWidgetsAction(numWidgets));
    },

    buyerDrone: numDrones => {
      dispatch(hireBuyerDronesAction(numDrones));
    },
    workerDrone: numWorkers => {
      dispatch(hireWorkerDronesAction(numWorkers));
    },
    salesDrone: numWorkers => {
      dispatch(hireSalesDronesAction(numWorkers));
    }
  };
};

const mergeProps = (
  stateProps,
  dispatchedProps,
  ownProps
): ProductionButtonsProps => {
  const convertToProps = (
    stateProps: DronesData,
    dispatchProps: BigInteger => void
  ): DroneBuyData => {
    return {
      buyDrone: dispatchProps,
      dronePrice: stateProps.hirePrice,
      droneUpkeep: stateProps.upkeepPrice
    };
  };

  return {
    buyMaterials: dispatchedProps.buyMaterials,
    materialsPrice: stateProps.materialsPrice,

    makeWidget: dispatchedProps.makeWidget,
    materialsPerWidget: stateProps.materialsPerWidget,

    sellWidget: dispatchedProps.sellWidget,
    widgetPrice: stateProps.widgetPrice,

    buyerDrone: convertToProps(
      stateProps.buyerDrone,
      dispatchedProps.buyerDrone
    ),
    workerDrone: convertToProps(
      stateProps.workerDrone,
      dispatchedProps.workerDrone
    ),
    salesDrone: convertToProps(
      stateProps.salesDrone,
      dispatchedProps.salesDrone
    )
  };
};

const ProductionButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProductionButtons);

export default ProductionButtonsContainer;
