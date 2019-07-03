const Router = require('koa-router');
const { HttpException, ParameterException } = require('../../../core/http-exception');
const { PositiveIntegerValidator } = require('../../validators/validator');

const router = new Router();


router.post('/v1/:id/classic/latest', async (ctx, nest) => {
  // 获取URL中的参数
  const path = ctx.params;
  // 获取URL问号后面的参数
  const { query } = ctx.request;
  // 获取header中的参数
  const { header } = ctx.request;

  const { body } = ctx.request;

  const v = await new PositiveIntegerValidator().validate(ctx);

  const id = v.get('path.id');


  ctx.body = { keg: id };
});

module.exports = router;
