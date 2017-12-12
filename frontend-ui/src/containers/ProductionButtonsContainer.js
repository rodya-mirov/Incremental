import { connect } from 'react-redux';
import { makeWidgetsAction, sellWidgetsAction } from '../actions';

import ProductionButtons from '../components/ProductionButtons';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => {
  return {
    makeWidget: numWidgets => {
      dispatch(makeWidgetsAction(numWidgets))
    },
    sellWidget: numWidgets => {
      dispatch(sellWidgetsAction(numWidgets))
    }
  };
};

const ProductionButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionButtons);

export default ProductionButtonsContainer;