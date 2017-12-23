// @flow

import React from "react";
import PropTypes from "prop-types";

import LogRow from "./LogRow";
import { Log } from "../logs";

/**
 * Panel for displaying current assets.
 */
const LogPanel = (props: { logs: Array<Log> }) => (
  <div className="logPanel-div">
    Important Messages:
    <table className="logPanel-table">
      <tbody>
        {props.logs.map((log, index) => <LogRow log={log} key={index} />)}
      </tbody>
    </table>
  </div>
);

LogPanel.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default LogPanel;
