require('dotenv').config();

const common = {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

module.exports = {
  development: {
    ...common,
    url: process.env.DATABASE_URL,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  },
  test: { ...common, url: process.env.DATABASE_URL },
  production: {
    ...common,
    url: process.env.DATABASE_URL,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  },
};
