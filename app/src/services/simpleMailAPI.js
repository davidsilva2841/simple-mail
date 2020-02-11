import axios from 'axios';


const url = (process.env.NODE_ENV === 'development') ?
    'http://localhost:3000/api' :
    'https://simplemail.link/api';

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});


/**
 * Get labels & filters
 * @returns {*}
 */
export function getLabelFilters() {
  // return api.get('/testing/gmail/labels-filters0');
  return api.get('/gmail/labels-filters');
}


/**
 * Get emails
 * @returns {*}
 */
export function getEmails() {
  // return api.get('/testing/gmail/email0');
  return api.get('/gmail/email');
}


/**
 * Create a filter
 * @param body {object}
 * @returns {*}
 */
export function createFilter(body) {
  return api.post('/gmail/filter', body);
}


/**
 * Delete a filter
 * @param filterId {string}
 * @returns {*}
 */
export function deleteFilter(filterId) {
  return api.delete('/gmail/filter', {params: {filterId}});
}


export default api;
