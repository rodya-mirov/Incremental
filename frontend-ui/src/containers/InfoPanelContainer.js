import { connect } from 'react-redux';

import InfoPanel from '../components/InfoPanel';

const mapStateToProps = state => {
  console.log("State used for InfoPanel: " + JSON.stringify(state));
  return {
    money: state.amtMoney,
    widgets: state.numWidgets,
    workerDrones: state.numWorkerDrones,
  };
};

const mapDispatchToProps = dispatch => ({});

const InfoPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPanel);

export default InfoPanelContainer;