// @flow

import React from "react";

import { Log } from "../logs";

function LogRow(props: { log: Log }) {
  return (
    <tr>
      <td>{props.log.getMessage()}</td>
    </tr>
  );
}

export default LogRow;
