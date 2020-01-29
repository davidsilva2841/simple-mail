import simpleMail from "../api/simpleMail";


export const getLabels = () => {
  return async (dispatch, getState) => {
    simpleMail.get('/test/gmail/labels1')
      .then(result => {
        console.log(`FILE: emailActions.js | result: \n`, result);
      })
      .catch(error => {
        console.error(`FILE: emailActions.js | ERROR: \n`, error);
      });
  }
  
};
