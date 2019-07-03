
const Router = require('koa-router');

const { RegisterValidator } = require('../../validators/validator');

const { success } = require('../../lib/helper');

const { User } = require('../../models/user');

// 增加路由前缀
const router = new Router({
  prefix: '/v1/user',
});

// 注册 新增数据 put get delete
// 中间键 是一种静态

router.post('/register', async (ctx) => {
  // 思维路径
  // 接收参数 LinValidetor
  // email password1 pasoword2 nickname

  const v = await new RegisterValidator().validate(ctx);


  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname'),
  };
  const r = await User.create(user);
  success();
});

module.exports = router;
