// @flow

import React from "react";

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

export default LogPanel;
