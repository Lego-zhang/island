const bcrypt = require('bcryptjs');

const { Sequelize, Model } = require('sequelize');

const { sequelize } = require('../../core/db');

const { NotFound, AuthFailed } = require('../../core/http-exception');


// 更改被导入文件的名称 const { sequelize: db }
class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AuthFailed('账号不存在');
    }

    // 查询密码
    const correct = bcrypt.compareSync(
      plainPassword, user.password,
    );
    if (!correct) {
      throw new AuthFailed('密码不正确');
    }
    return user;
  }

  // 查询openId
  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid,
      },
    });
    return user;
  }

  // 新增用户方法
  static async registerByOpenid(openid) {
    return await User.create({
      openid,
    });
  }
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
  openid: {
    type: Sequelize.STRING(64),
    unique: true,
  },

}, { sequelize, tableName: 'user' });

module.exports = {
  User,
};
