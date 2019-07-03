const Sequelize = require('sequelize');

const {
  dbname, host, port, user, password,
} = require('../config/config').database;

const sequelize = new Sequelize(dbname, user, password, {
  dialect: 'mysql',
  host,
  port,
  lodding: true,
  timezone: '+08:00',
  define: {
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
  },
});

// 将模型创建到数据库中
sequelize.sync({
  force: true,
});

module.exports = {
  sequelize,
};
