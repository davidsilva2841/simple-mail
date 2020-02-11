import simpleMail from '../../../api/simpleMail.js';
import * as types from '../../../constants/ActionTypes.js';


const status = require('../../../constants/StatusTypes.js');
const notifications = require('../../../services/notifications.js');


// --------------------------------------------------------------------------------------------------

/**
 * Delete a filter
 * @param filterId
 * @returns {function(...[*]=)}
 */
export function deleteFilter(filterId) {
  return async (dispatch, getState) => {
    dispatch(updateStatus('Deleting filter', status.inProgress, true));
    simpleMail.delete('/gmail/filter', {params: {filterId}}).then(result => {
      dispatch(updateStatus('Deleted filter', status.complete, false));
      console.log(`FILE: emailActions.js | result: \n`, result);
    }).catch(error => {
      dispatch(updateStatus('Error deleting filter', status.error, false));
      console.error(`FILE: emailActions.js | ERROR: \n`, error);
    });
  };
}


// --------------------------------------------------------------------------------------------------
// Creating a filter

/**
 * Gets post body for creating a new filter
 * @param newFilters
 * @param labels
 * @returns {{criteria : {from : string, to : string}, action : {addLabelIds : *, removeLabelIds : *}}}
 */
function getPostBody(newFilters, labels) {
  const getLabelIds = (array, labels) => {
    return labels.filter(label => array.indexOf(label.name) !== -1).
        map(item => item.id);
  };
  
  const getCriteria = (array) => {
    return (array.length) ? `(${ array.join(',') })` : '';
  };
  
  return {
    criteria: {
      to: getCriteria(newFilters[ 0 ].values),
      'from': getCriteria(newFilters[ 1 ].values),
    },
    action: {
      addLabelIds: getLabelIds(newFilters[ 2 ].values, labels),
      removeLabelIds: getLabelIds(newFilters[ 3 ].values, labels),
    },
  };
}


// --------------------------------------------------------------------------------------------------

// function updateStatus (message = '', type, running) {
//   return {
//     type: types.UPDATE_STATUS,
//     payload: {
//       running,
//       message,
//       type
//     }
//   }
// }

function updateStatus(dispatch, message = '', type, running) {
  const update = () => {
    return {
      type: types.UPDATE_STATUS,
      payload: {
        running,
        message,
        type,
      },
    };
  };
  dispatch(update());
}


// --------------------------------------------------------------------------------------------------

/**
 * If filters modal is ready for another action
 * @param filters
 * @param dispatch
 * @param message
 * @param status
 * @param running
 * @returns {boolean}
 */
function isReady({filters}, dispatch, message, status, running) {
  if ( filters.status.running ) {
    notifications.warning('Please wait for current operation to complete');
    return false;
  } else {
    updateStatus(dispatch, message, status, running);
    return true;
  }
}


/**
 * Create a new filter
 * @param newFilters {array}
 * @param labels {array} - List of all labels
 * @param originalFilterId {string}
 * @returns {function(...[*]=)}
 */
export function createFilter(newFilters, labels, originalFilterId) {
  return async (dispatch, getState) => {
    if ( !isReady(getState(), dispatch, 'Creating filter', status.inProgress,
        true) ) return;
    
    simpleMail.post('/gmail/filter', getPostBody(newFilters, labels)).
        then(() => {
          updateStatus(dispatch, 'Created filter', status.complete, false);
          if ( originalFilterId ) dispatch(deleteFilter(originalFilterId));
        }).
        catch(error => {
          let message = 'Unknown error';
          try {
            if ( error.response.status === 400 ) {
              message = error.response.message;
            }
          } catch (err) {
          
          }
          updateStatus(dispatch, `Error while creating filter: ${ message }`,
              status.error, false);
        });
    
  };
}


// --------------------------------------------------------------------------------------------------

