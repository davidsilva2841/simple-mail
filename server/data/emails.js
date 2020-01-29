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
      sendersDomain
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


module.exports = {
  clean
};


