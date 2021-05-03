const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'password',
    database: env.DB_NAME || 'web-project',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;