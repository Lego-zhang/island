const bcrypt = require('bcryptjs');

const { Sequelize, Model } = require('sequelize');

const { sequelize } = require('../../core/db');


// 更改被导入文件的名称 const { sequelize: db }
class User extends Model {

}
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      // 盐
      // 位数 成本
      // 明文 ，加密  2段相同的字符串生成不同的加密字符串，防止彩虹攻击
      const salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue('password', psw);
    },
  },
  opendi: {
    type: Sequelize.STRING(64),
    unique: true,
  },

}, { sequelize, tableName: 'user' });

module.exports = {
  User,
};
