const Router = require('koa-router');
// const { HttpException, ParameterException } = require('../../../core/http-exception');
// const { PositiveIntegerValidator } = require('../../validators/validator');
const { Auth } = require('../../../middlewares/auth');
const { Flow } = require('../../models/flow');
const { Art } = require('../../models/art');
const { Favor } = require('@models/favor');
const { PositiveIntegerValidator, ClasscValidator } = require('../../validators/validator');
const { NotFound } = require('../../../core/http-exception');


const router = new Router({
  prefix: '/v1/classic',
});


router.get('/latest', new Auth().m, async (ctx) => {
  // 排序最新一期
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC'],
    ],
  });

  const art = await Art.getData(flow.art_id, flow.type);
  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeLatest);
  ctx.body = art;
});

router.get('/:index/next', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index',
  });
  const index = v.get('path.index');
  const flow = await Flow.findOne({
    where: {
      index: index + 1,
    },
  });

  if (!flow) {
    throw new NotFound();
  }
  const art = await Art.getData(flow.art_id, flow.type);
  const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeNext);
  ctx.body = art;
});


router.get('/:index/previous', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index',
  });
  const index = v.get('path.index');
  const flow = await Flow.findOne({
    where: {
      index: index - 1,
    },
  });

  if (!flow) {
    throw new NotFound();
  }
  const art = await Art.getData(flow.art_id, flow.type);
  const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likePrevious);
  ctx.body = art;
});

router.get('/:type/:id', new Auth().m, async (ctx) => {
  const v = await new ClasscValidator().validate(ctx);
  const id = v.get('path.id');
  const type = parseInt(v.get('path.type'));

  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid);

  artDetail.art.setDataValue('like_status', artDetail.like_status);

  ctx.body = artDetail.art;
});

router.get('/:type/:id/favor', new Auth().m, async (ctx) => {
  const v = await new ClasscValidator().validate(ctx);
  const id = v.get('path.id');
  const type = parseInt(v.get('path.type'));


  const art = await Art.getData(id, type);
  if (!art) {
    throw new NotFound();
  }
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid);

  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: like,
  };
});

router.get('/favor', new Auth().m, async (ctx) => {
  const { uid } = ctx.auth;
  ctx.body = await Favor.getMyClassicFavors(uid);
});


module.exports = router;
