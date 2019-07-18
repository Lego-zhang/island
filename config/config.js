module.exports = {
  /**
   * 环境
   * 生产 prod
   * 开发 dev
   * */
  environment: 'dev',
  /**
   * 数据库连接
   * */
  database: {
    dbname: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60 * 60 * 24 * 30,
  },
  wx: {
    appId: 'wxa2062f6e5a3fe2ab',
    appSecret: 'a252073ee64423cd01deb3291fad0d0e',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
};
