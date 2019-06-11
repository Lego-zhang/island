const Router = require('koa-router');

const router = new Router();


router.post('/v1/:id/classic/latest', (ctx, nest) => {
  // 获取URL中的参数
  const path = ctx.params;
  // 获取URL问号后面的参数
  const { query } = ctx.request;
  // 获取header中的参数
  const headers = ctx.request.header;

  const { body } = ctx.request;
  ctx.body = { keg: ctx.path };

  if (true) {
    const error = new Error('这是一段文字');
    error.errorCode = 10001;
    error.requestUrl = `${ctx.method} ${ctx.path}`;
    error.status = 400;
    throw error;
  }
});

module.exports = router;
