import React from 'react';
import PropTypes from 'prop-types';

/**
 * Panel for displaying "do things" buttons
 */
const ProductionButtons = ({ makeWidget, sellWidget }) => (
  <div className="productionButtons">
    <button onClick={() => makeWidget(1)}>
      Make Widget
    </button>
    <button onClick={() => sellWidget(1)}>
      Sell Widget
    </button>
  </div>
);

ProductionButtons.propTypes = {
  makeWidget: PropTypes.func.isRequired, // make a new widget
  sellWidget: PropTypes.func.isRequired  // sell an existing widget for money
};

export default ProductionButtons;