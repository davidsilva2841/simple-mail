// PostgresSQL connection
// --------------------------------------------------------------------------------------------------


const config = require('config');
const pg = require('knex')({
  client: 'postgres',
  connection: config.get('postgreSQL'),
});


module.exports = pg;

