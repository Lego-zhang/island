
const Router = require('koa-router');

const router = new Router();

const { HotBook } = require('@models/hot-book');

router.get('/v1/book/hot_list', async (ctx, next) => {
  const hotBook = await HotBook.getAll();
  ctx.body = { books: hotBook };
});

module.exports = router;
