const Sequelize = require('sequelize');

const {
  dbname, host, port, user, password,
} = require('../config/config').database;

const sequelize = new Sequelize(dbname, user, password, {
  dialesct: 'mysql',
  host,
  port,
  lodding: true,
  timezone: '+08:00',
});

module.exports = {
  sequelize,
};
