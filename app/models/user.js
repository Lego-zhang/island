const { sequelize } = require('../../core/db');

const { Sequelize, Model } = require('sequelize');

// 更改被导入文件的名称 const { sequelize: db }
class User extends Model {

}
User.init({

  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  opendi: {
    type: Sequelize.STRING(64),
    unique: true,
  },
  id: {
    type: Sequelize.INIEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, { sequelize });
