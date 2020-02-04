import {  MDBToast } from "mdbreact";
import * as status from '../constants/StatusTypes.js';

const settings = {
  position: 'top-right',
  autoClose: 5000,
  closeButton: true,
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

export const notify = (message, statusType) => {
  switch (statusType) {
    case status.inProgress:
      info(message);
      break;
    case status.complete:
      success(message);
      break;
    case status.error:
      error(message);
      break;
    default:
      info(message);
  }
};









