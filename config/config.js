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
};
