const db = require('./connection');
const Joi = require('joi');
const config = require('config');

// --------------------------------------------------------------------------------------------------

/**
 * Validate user schema
 * @param user {object}
 * @returns {ValidationResult<*>}
 */
const isValidUser = user => {
  const schema = {
    profile_id: Joi.string().required(),
    refresh_token: Joi.string().required(),
    access_token: Joi.string().required(),
    first_name: Joi.string(),
    last_name: Joi.string(),
  };
  return Joi.validate(user, schema, { allowUnknown: true });
};


/**
 * Check if user exists
 * @param user {object}
 * @returns {*}
 */
const userExists = user => {
  return db('users').where('profile_id', user.profile_id)
    .then(res => {
      return res.length > 0;
    })
};


/**
 * Add user to table
 * @param user
 * @returns {*}
 */
const addUser = user => {
  return userExists(user)
    .then(exists => {
      if ( exists ) {
        return db('users')
          .where('profile_id', user.profile_id)
          .update(user);
      } else {
        return db('users').insert(user);
      }
    })
  
};


/**
 * Gets user
 * @param user {object}
 * @returns {*}
 */
const getUser = user => {
  return db('users').where('profile_id', user.profile_id);
};




module.exports = {
  getUser,
  isValidUser,
  addUser
};
