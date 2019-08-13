const Router = require('koa-router');

const { Auth } = require('../../../middlewares/auth');

const { Favor } = require('../../models/favor');

const { LikeValidator } = require('../../validators/validator');

const { success } = require('../../lib/helper');


const router = new Router({
  prefix: '/v1/like',
});

router.post('/', new Auth().m, async (ctx) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id',
  });

  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);

  success();
});

router.post('/cancel', new Auth().m, async (ctx) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id',
  });

  await Favor.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);

  success();
});

// 不要让前端把uid 当参数进行传递，这样就会更换uid号窃取用户资料

module.exports = router;
