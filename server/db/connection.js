// PostgresSQL connection
// --------------------------------------------------------------------------------------------------
// let config;
// if (process.env.NODE_ENV === 'production') {
//   config = {
//     host: process.env.POSTGRES_HOST,
//     port: process.env.POSTGRES_PORT,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DATABASE
//   }
//
// } else {
//   config = require('');
// }

const config = require('config');

const pg = require('knex')({
  client: 'postgres',
  connection: config.get('postgreSQL'),
});


module.exports = pg;

