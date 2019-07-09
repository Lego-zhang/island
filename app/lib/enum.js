/**
 * 验证传入的值是否存在于LoginType中
*/
function isThisType(val) {
  for (const key in this) {
    if (this[key] == val) {
      return true;
    }
  }
  return false;
}

/**
 * 微信登录
 * email 登录
 * 手机号登录
 * 管理员登录
*/

const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EAIL: 200,
  isThisType,
};

module.exports = {
  LoginType,
};
