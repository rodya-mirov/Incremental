import { connect } from 'react-redux';
import { makeWidgetsAction, sellWidgetsAction, hireWorkerDronesAction } from '../actions';

import ProductionButtons from '../components/ProductionButtons';

const mapStateToProps = state => ({});
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
  };
};

const ProductionButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionButtons);

export default ProductionButtonsContainer;