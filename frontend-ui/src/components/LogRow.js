import React from 'react';

function LogRow(props) {
  return (<tr><td>{props.log.getMessage()}</td></tr>);
}

export default LogRow;