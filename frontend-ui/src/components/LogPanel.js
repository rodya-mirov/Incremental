import React from 'react';
import PropTypes from 'prop-types';

import LogRow from './LogRow'

/**
 * Panel for displaying current assets.
 */
const LogPanel = ({ logs }) => (
  <div className="logPanel-div">
    Important Messages:
    <table className="logPanel-table">
      <tbody>
        { logs.map((log, index) => (<LogRow log={log} key={index} />)) }
      </tbody>
    </table>
  </div>
);

LogPanel.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default LogPanel;