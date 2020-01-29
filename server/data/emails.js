const _ = require('underscore');
// --------------------------------------------------------------------------------------------------
/**
 * Gets sender from email
 * @param headers
 * @returns {string}
 */
const getSender = (headers) => {
  let receivedFrom =  headers.filter(header => header.name === 'From');
  if (receivedFrom.length) {
    receivedFrom = receivedFrom[0].value;
  } else {
    return 'MISSING_FROM';
  }
  
  if (receivedFrom.includes(' ')) {
    receivedFrom = receivedFrom
      .split('<')[1]
      .replace('>', '');
  }
  return receivedFrom;
};


/**
 * Gets sent to email from email
 * @param headers
 * @returns {*}
 */
const getSentTo = (headers) => {
  let sentTo =  headers.filter(header => header.name === 'Delivered-To');
  sentTo.length === 0 ?
    sentTo = sentTo =  headers.filter(header => header.name === 'From')
    : null ;
  
  if (sentTo.includes('<')) {
    sentTo = sentTo
      .split('<')[1]
      .replace('>', '');
  }
  return sentTo[0].value;
};


/**
 * Extracts info from emails
 * @param emails
 */
const getCleanedEmails = emails => {
  let cleanedEmails = [];
  
  for(let email of emails) {

    let sender = getSender(email.headers);
    let sentTo = getSentTo(email.headers);
    let sendersDomain = '@' + sender.split('@')[1];
    cleanedEmails.push({
      sender,
      sentTo,
      sendersDomain,
      id: email.id
    });


  }
  return cleanedEmails;
};


/**
 * Cleans all emails
 * @param emails
 * @returns {{emails : [], sumByDomain : any}}
 */
const clean = emails => {
  let cleanedEmails = getCleanedEmails(emails);
  let sumByDomain = _.extend({}, _.countBy(cleanedEmails, 'sendersDomain'));
  return {
    emails: cleanedEmails,
    sumByDomain
  };
};

/**
 * Sorts labels
 * @param labels
 * @returns {unknown[]}
 */
const sortLabels = labels => {
	return _.sortBy(labels, 'name');
};


const cleanLabels = labels => {
  let cleanedLabels = [];
  for(let label of labels) {
  	if (!label.color){
  	  label.color = {
  	    textColor: '',
        backgroundColor: ''
      }
    }
  	cleanedLabels.push(label)
  }
  
  return _.sortBy(cleanedLabels, 'name');
};

const cleanFilters = (filters, labels) => {
  let cleanedFilters = [];
  
  const getActions = (actionList) => {
    if (!actionList) {
      return [];
    }
    
  	let actions = [];
    for(let action of actionList) {
  		actions.push({
        id: action,
        name: _.findWhere(labels, {id: action}).name
      })
  	}
    return actions;
  };
  
  for(let filter of filters) {
    let newFilter = {
      id: filter.id
    };
    newFilter.addLabels = filter.action.addLabelIds ? getActions(filter.action.addLabelIds) : [];
    newFilter.removeLabels = filter.action.removeLabelIds ?  getActions(filter.action.removeLabelIds) : [];
    newFilter.sentToAddress = filter.criteria.to ? filter.criteria.to.split(',')  : [];
    newFilter.fromAddress = filter.criteria['from'] ? filter.criteria['from'].split(',')  : [];
    
    cleanedFilters.push(newFilter);
  }
  return cleanedFilters;
};

module.exports = {
  clean,
  sortLabels,
  cleanLabels,
  cleanFilters
};


