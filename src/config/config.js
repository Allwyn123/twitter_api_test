let config = {};

/* mongodb connection configuration */
let noSqlDbConfig = {
  url: process.env.DB_URL || 'mongodb://localhost:27017/',
  name: process.env.DB_NAME || 'twitterdb',
};

config.db = { noSqlDbConfig };


config.client = process.env.CLIENT_URL || '*';

module.exports = config;
