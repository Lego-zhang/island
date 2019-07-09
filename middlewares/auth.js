const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { Forbbiden } = require('../core/http-exception');

class Auth {
  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      const errorMsg = 'token不合法';
      if (!userToken || !userToken.name) {
        throw new Forbbiden(errorMsg);
      }

      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey);
      } catch (error) {
        // token 不合法
        // token 过期
        if (error.name == 'TokenExpriredError') {
          throw new Forbbiden('token已过期');
          errorMsg = 'token已过期';
        }
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };


      // token 检测
      // token 开发者 传递令牌
      // token body header 约定
      // Http 规定 身份验证机制 HttpBasicAuth

      await next();
    };
  }
}
module.exports = {
  Auth,
};
