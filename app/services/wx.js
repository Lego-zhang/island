// 好用的帮助方法
const util = require('util');
const { AuthFailed } = require('../../core/http-exception');
const { User } = require('../../app/models/user');
const { generateToken } = require('../../core/util');
const { Auth } = require('../../middlewares/auth');
const axios = require('axios');

// 管理微信的相关业务逻辑
class WXManager {
  static async codeToToken(code) {
    // openid 小程序用户的唯一标识 鉴定
    // code appic appsecet 三个参数
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret, code);

    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new AuthFailed('openid获取失败');
    }
    const { errcode } = result.data;
    const { errmsg } = result.data;
    if (errcode) {
      throw new AuthFailed(`openid获取失败:${errmsg}`);
    }

    // openid 建立档案 写入user 表中 生成uid

    let user = await User.getUserByOpenid(result.data.openid);
    if (!user) {
      user = await User.registerByOpenid(result.data.openid);
    }
    return generateToken(user.id, Auth.USER);
  }
}

module.exports = {
  WXManager,
};
