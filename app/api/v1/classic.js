const Router = require('koa-router');
// const { HttpException, ParameterException } = require('../../../core/http-exception');
// const { PositiveIntegerValidator } = require('../../validators/validator');
const { Auth } = require('../../../middlewares/auth');


const router = new Router({
  prefix: '/v1/classic',
});


router.get('/latest', new Auth().m, async (ctx, next) => {
  // // 获取URL中的参数
  // const path = ctx.params;
  // // 获取URL问号后面的参数
  // const { query } = ctx.request;
  // // 获取header中的参数
  // const { header } = ctx.request;

  // const { body } = ctx.request;

  // const v = await new PositiveIntegerValidator().validate(ctx);

  // const id = v.get('path.id');


  // ctx.body = { keg: id };
  ctx.body = ctx.auth.uid;
});

module.exports = router;
