// @flow

import { connect } from "react-redux";

import LogPanel from "../components/LogPanel";

const mapStateToProps = state => {
  // console.log("State used for LogPanel: " + JSON.stringify(state));
  return {
    logs: state.logs
  };
};

const LogPanelContainer = connect(mapStateToProps)(LogPanel);

export default LogPanelContainer;
