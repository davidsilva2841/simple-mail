import {createSlice} from '@reduxjs/toolkit';

import * as simpleMail from '../../services/simpleMailAPI.js';
import {setStatus, handleError, isBusy} from '../status/statusSlice.js';
const statusTypes = require('../status/types.js');


const labelsSlice = createSlice({
  name: 'labels',
  initialState: {},
  reducers: {}
});

export default labelsSlice.reducer;


export function createLabel (name, textColor='', backgroundColor='') {
  const getBody = (name, textColor, backgroundColor) => {
    let body = {
      labelListVisibility: 'labelShow',
      messageListVisibility: 'show',
      name,
    };
  	if (textColor || backgroundColor) {
  	  body.color = {};
  	  textColor ? body.color.textColor = textColor : null;
      backgroundColor ? body.color.backgroundColor = backgroundColor : null;
    }
    return body;
  };
  
  return async (dispatch, getState) => {
    if ( await dispatch(isBusy()) ) return;
    
    try {
      dispatch(setStatus(true, 'Creating a label', statusTypes.inProgress));
      
      let body = getBody(name, textColor, backgroundColor);
      await simpleMail.createLabel(body);
      
      dispatch(setStatus(false, 'Finished creating label', statusTypes.complete));
      
    } catch (error) {
      dispatch(handleError(error, false));
    }
  }
}



