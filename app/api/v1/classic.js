const Router = require('koa-router');
// const { HttpException, ParameterException } = require('../../../core/http-exception');
// const { PositiveIntegerValidator } = require('../../validators/validator');
const { Auth } = require('../../../middlewares/auth');
const { Flow } = require('../../models/flow');


const router = new Router({
  prefix: '/v1/classic',
});


router.get('/latest', new Auth().m, async (ctx, next) => {
  // 排序最新一期
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC'],
    ],
  });


  ctx.body = flow;
});

module.exports = router;
