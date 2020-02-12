import {MDBToast} from 'mdbreact';
const statusTypes = require('../features/status/types.js');

const settings = {
  position: 'top-right',
  autoClose: 5000,
  closeButton: true,
};

export const messages = {
  waitForCurrentOperationToComplete: {
    message: 'Please wait for the current operation to complete.',
    statusType: statusTypes.inProgress,
  },
};

export const info = message => {
  MDBToast.info(message, settings);
};

export const success = message => {
  MDBToast.success(message, settings);
};

export const warning = message => {
  MDBToast.warning(message, settings);
};

export const error = message => {
  MDBToast.error(message, settings);
};

export const notify = ({message, statusType}) => {
  switch ( statusType ) {
    case statusTypes.inProgress:
      info(message);
      break;
    case statusTypes.complete:
      success(message);
      break;
    case statusTypes.error:
      error(message);
      break;
    default:
      info(message);
  }
};


/**
 * Notifies user that session is busy
 */
export function handleBusy() {
  notify(messages.waitForCurrentOperationToComplete);
}










