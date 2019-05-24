
const Router = require('koa-router');

const router = new Router();

router.get('/v1/book/latest', (ctx, nest) => {
  ctx.body = { keg: ctx.path };
});

module.exports = router;
