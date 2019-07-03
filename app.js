const Koa = require('koa');
const parser = require('koa-bodyparser');

const InitManager = require('./core/init');
// AOP 全局异常处理
const catchError = require('./middlewares/exception');

// require('./app/models/user');

const app = new Koa();

app.use(catchError);
// 路由自动注册
app.use(parser());

InitManager.initCore(app);

app.listen(3000);
