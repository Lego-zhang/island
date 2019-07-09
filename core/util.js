const jwt = require('jsonwebtoken');
/** *
 *
 */
// const findMembers = function (instance, {
function findMembers(instance, {
  prefix,
  specifiedType,
  filter,
}) {
  // 递归函数
  function _find(instance) {
    // 基线条件（跳出递归）
    if (instance.__proto__ === null) { return []; }

    let names = Reflect.ownKeys(instance);
    names = names.filter(name =>
    // 过滤掉不满足条件的属性或方法名
      _shouldKeep(name));

    return [...names, ..._find(instance.__proto__)];
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true;
      }
    }
    if (prefix) {
      if (value.startsWith(prefix)) { return true; }
    }
    if (specifiedType) {
      if (instance[value] instanceof specifiedType) { return true; }
    }
  }

  return _find(instance);
}

// const generateToken = function (uid, scope) {
//   const { secretKey } = global.config.security;
//   const { expiresIn } = global.config.security;
//   const token = jwt.sign({
//     uid,
//     scope,
//   }, secretKey, {
//     expiresIn,
//   });
//   return token;
// };

const generateToken = function (uid, scope) {
  /**
   * {} 往Token令牌中放入的信息
   * key 我们自己要定义的私有钥匙
   * {} 可选的配置项
   * */

  const { secretKey } = global.config.security;
  const { expiresIn } = global.config.security;
  const token = jwt.sign({
    uid,
    scope,
  }, secretKey, {
    expiresIn,
  });

  return token;
};

module.exports = {
  findMembers,
  generateToken,
};


// const generateToken = function (uid, scope) {
//     const secretKey = global.config.security.secretKey
//     const expiresIn = global.config.security.expiresIn
//     const token = jwt.sign({
//         uid,
//         scope
//     }, secretKey, {
//         expiresIn: expiresIn
//     })
//     return token
// }
