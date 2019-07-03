class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super();
    this.msg = msg;
    this.code = code;
    this.errorCode = errorCode;
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super();
    this.code = 400;
    this.msg = msg;
    this.errorCode = errorCode;
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 201;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || 0;
  }
}

module.exports = {
  HttpException, ParameterException, Success,
};
