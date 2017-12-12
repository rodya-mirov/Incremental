import React from 'react';
import PropTypes from 'prop-types';
import bigInt from 'big-integer';

/**
 * Panel for displaying current assets.
 */
const InfoPanel = ({ money, widgets, workerDrones }) => (
  <table className="infoPanel-table">
    <tbody>
      <tr><td>Money:</td><td>{money.toString()}</td></tr>
      <tr><td>Widgets:</td><td>{widgets.toString()}</td></tr>
      <tr><td>Worker Drones:</td><td>{workerDrones.toString()}</td></tr>
    </tbody>
  </table>
);

InfoPanel.propTypes = {
  money: PropTypes.instanceOf(bigInt).isRequired,  // amount of money owned
  widgets: PropTypes.instanceOf(bigInt).isRequired, // amount of widgets owned
  workerDrones: PropTypes.instanceOf(bigInt).isRequired,
};

export default InfoPanel;