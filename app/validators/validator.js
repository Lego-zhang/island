const { LinValidator, Rule } = require('../../core/lin-validator-v2');
const { User } = require('../models/user');
const { LoginType, ArtType } = require('../lib/enum');

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '需要是正整数', { min: 1 }),
    ];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '不符合Email规范'),
    ];
    this.password1 = [
      // 用户指定范围
      new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'),
    ];
    this.password2 = this.password1;
    this.nickname = [
      // 用户指定范围
      new Rule('isLength', '昵称不符合长度规范', { min: 4, max: 32 }),
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;

    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同');
    }
  }

  async validateEmail(vals) {
    const { email } = vals.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw new Error('email已存在');
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    // 账号
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32,
      }),
    ];
    // 密码
    this.secret = [
      // 是必须要传的么
      // web 账号+密码
      // 登录 多元化 小程序 密码
      // 当用户打开微信的时候已经将密码验证李， 已经是合法用户了
      // 如果是小程序的话直接用account就行了

      /*
        1.可以为空 可以不传
        2.
       */
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128,
      }),
    ];
  }

  // type 用TYPE区分不同的用户登录方式
  // js模拟枚举
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必须参数');
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type是参数不合法');
    }
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [
      new Rule('isLength', '不允许为空', { min: 1 }),
    ];
  }
}

function checkType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
    throw new Error('type是必须参数');
  }
  type = parseInt(type);

  if (!LoginType.isThisType(type)) {
    throw new Error('type是参数不合法');
  }
}

function checkArtType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
    throw new Error('type是必须参数');
  }
  type = parseInt(type);

  if (!ArtType.isThisType(type)) {
    throw new Error('type是参数不合法');
  }
}

function checkType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
    throw new Error('type是必须参数');
  }
  type = parseInt(type);

  if (!LoginType.isThisType(type)) {
    throw new Error('type是参数不合法');
  }
}


class Checker {
  constructor(type) {
    this.enumType = type;
  }

  check(vals) {
    let type = vals.body.type || vals.path.type;
    if (!type) {
      throw new Error('type是必须参数');
    }
    type = parseInt(type);

    if (!this.enumType.isThisType(type)) {
      throw new Error('type是参数不合法');
    }
  }
}


class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super();

    this.validateType = checkArtType
    // const checker = new Checker(ArtType);
    // this.validateType = checker.check.bind(checker);
  }
}

class ClasscValidator extends LikeValidator {

}


module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClasscValidator,
};
