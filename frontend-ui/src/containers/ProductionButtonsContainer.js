import { connect } from 'react-redux';
import { makeWidgetsAction, sellWidgetsAction, hireWorkerDronesAction, hireSalesDronesAction } from '../actions';

import ProductionButtons from '../components/ProductionButtons';

const mapStateToProps = state => {
  return {
    widgetPrice: state.widgetSellPrice,
    workerDronePrice: state.workerDronePrice,
    salesDronePrice: state.salesDronePrice,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    makeWidget: numWidgets => {
      dispatch(makeWidgetsAction(numWidgets))
    },
    sellWidget: numWidgets => {
      dispatch(sellWidgetsAction(numWidgets))
    },
    buyWorkerDrone: numWorkers => {
      dispatch(hireWorkerDronesAction(numWorkers))
    },
    buySalesDrone: numWorkers => {
      dispatch(hireSalesDronesAction(numWorkers))
    },
  };
};

const ProductionButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionButtons);

export default ProductionButtonsContainer;