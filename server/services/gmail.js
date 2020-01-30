const { google } = require('googleapis');
const config = require('config');
const emails = require('../data/emails');

// --------------------------------------------------------------------------------------------------

/**
 * Gets authorization token object
 * @param accessToken {string}
 * @param refreshToken {string}
 * @returns {{access_token : *, refresh_token : *, scope : string[], token_type : string}}
 */
const getToken = (accessToken, refreshToken) => {
	return {
    "access_token": accessToken,
    "refresh_token": refreshToken,
    scope: [
      'profile',
      'https://www.googleapis.com/auth/gmail.metadata',
      'https://www.googleapis.com/auth/gmail.labels',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.settings.basic',
      'https://mail.google.com/'
    ],
    "token_type": "Bearer",
  };
};


/**
 * Gets gmail api
 * @param token
 * @returns {*}
 */
const getGmail = (token) => {
  let auth = new google.auth.OAuth2(
    config.get('client.id'),
    config.get('client.secret'),
    config.get('client.redirectUri'),
  );
  auth.setCredentials(token);
  
  return google.gmail({ version: 'v1', auth: auth });
};


/**
 * Gets labels
 * @param gmail
 * @returns {*}
 */
const getLabels = (gmail) => {
  return gmail.users.labels.list({ userId: 'me' })
    .then(result => {
      return result.data.labels;
    });
};


/**
 * Gets filters
 * @param gmail
 * @returns {*}
 */
const getFilters = (gmail) => {
  return gmail.users.settings.filters.list({userId: 'me'})
    .then(result => {
      return result.data.filter;
    });
};


/**
 * Gets individual message data
 * @param gmail
 * @param id
 * @returns {*}
 */
const getMessage = (gmail, id) => {
  return gmail.users.messages.get({
    id: id,
    userId: 'me',
    format: 'metadata',
    metadataHeaders: ['From', 'Delivered-To']
  })
};


/**
 * Extracts info needed from message
 * @param gmail
 * @param id
 * @returns {PromiseLike<{snippet : string, headers : string, id : *}> | Promise<{snippet : (*|string), headers : string, id : *}>}
 */
const getInfo = (gmail, id) => {
  return getMessage(gmail, id)
    .then(result => {
      return {
        id: id,
        snippet: result.data.snippet || '',
        headers: result.data.payload.headers || ''
      };
    })
};


/**
 * Gets list of message ids
 * @param gmail
 * @param nextPageToken
 * @returns {PromiseLike<any> | Promise<any>}
 */
const getMessages = (gmail, nextPageToken = '') => {
  return gmail.users.messages.list({
    userId: 'me',
    maxResults: 500,
    nextPageToken: nextPageToken
  })
  .then(result => {
    console.log(`FILE: gmail.js () | result: \n`, result);
    return result;
  });
};


/**
 * Gets all messages
 * @param gmail
 * @returns {PromiseLike<unknown[]> | Promise<unknown[]>}
 */
const getAllInfo = gmail => {
  return getMessages(gmail)
    .then(result => {
      let messages = result.data.messages;
      
      let promises = [];
      for (let message of messages) {
        promises.push(getInfo(gmail, message.id));
      }
      return Promise.all(promises);
    })
    .then(data => {
      return emails.clean(data);
    })
};


/**
 * Create a label
 * @param gmail
 * @param label
 * @returns {*}
 */
const createLabel = (gmail, label) => {
  console.log(`FILE: gmail.js createLabel() | : \n`, );
  return gmail.users.labels.create({
    userId: 'me',
    resource: label
  })
};


/**
 * Create a filter
 * @param gmail
 * @param filter {object}
 * @returns {*}
 */
const createFilter = (gmail, filter) => {
  return gmail.users.settings.filters.create({
    userId: 'me',
    resource: filter
  })
};


/**
 * Delete a filter
 * @param gmail
 * @param filterId
 */
const deleteFilter = (gmail, filterId) => {
  return gmail.users.settings.filters.delete({
    userId: 'me',
    id: filterId
  })
};


module.exports = {
  deleteFilter,
  createLabel,
  createFilter,
  getGmail,
  getToken,
  getMessage,
  getMessages,
  getInfo,
  getAllInfo,
  getLabels,
  getFilters,
};




