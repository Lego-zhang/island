# island

## Node koa

## 库

#### 发送 HTTP 请求

axios

#### 路由系统

koa - router

#### 路由自动注册

require-directory

#### node 服务器自动重启

- nodemon
- 为什么要全局安装


```
// 绑定要启动的服务器
nodemon app.js
```

#### 创建数据库表

[sequelize](http://docs.sequelizejs.com)

- 先要连接数据库

#### 连接数据库

mysql2

#### 生成jwt令牌

jsonwebtoken

### 关于模板引擎

```js
// 引入模板
const { sequelize } = require("../../core/db");
// 更改被导入文件的名称
const { sequelize: db } = require("../../core/db");
// 输出模板
module.exports = {
  sequelize
};
```
bcryptjs 
### 加密



### 关于 node

- 无阻塞，高并发
- 异步操作是其保障
- 大量操作依赖回调函数

### 路由

#### 如何自动路由注册

1. 如何能自动加载某个目录下面的路由模块
2. 如何自动导入路由模块

#### 参数传递

##### get

- url 路劲传参

```
/v1/:id/book/latest
```

- url 问号后面进行传参

```
/v1/book/latest?param=
```

##### post

- header
- body


#### body 与 URL
- body 传递的是JSON格式，原来是什么类型，传递过来就是什么类型
- url或者?进行传递的话，传过来的就是字符串

### 异常处理

- 调用函数的三种状态
  - 没有发生异常，正确返回结果
  - 没有发生异常，没有返回结果
  - 发生了异常
- 处理异常
  - return false null
  - throw new Erron
- 如何捕捉异常
  - 在调用别人的第三方库的时候 try catch
  - 进行全局异常处理
- 捕获异常在同步中是有效的
  - 如果使用异步 使用 Promise async await
  - promise 必须要包装异步函数
- 使用全局异常处理
  - 监听错误
  - 输出一段有意义的提示信息
- 如何将错误返回给客户端
  - 不应该将全局捕捉到的信息返回客户端、
  - error 信息量大
  - error 简化 清晰明了的信息 返回前端
- 返回那些信息
  - HTTP Status Code (http 状态码) 只能返回大致的异常是什么
  - message 文字话的错误信息
  - - error_code 详细，开发者自己定义 10001
  - request_url 当前请求的 url
- 错误的分类
  - 已知型的错误
    - 检验出来的错误
  - 未知型的错误
    - 程序潜在的错误 无意识 根本就不知道他出错了
- 建立一个全局异常处理的类
  - 继承于 KOC 的 Error 类

### 问题

- 什么是无阻塞，高并发
  - 异步操作是当一个耗时很长的请求进来的时候，会停下当前耗时的任务去执行另外一个任务
- 什么中间件非要加 async
  - 因为中间不加 async await 会报错
  - async 会将函数强制转换为一个 promise
- 中间件为什么要强制加 async await
  - 保证 koa 的洋葱模型使用
  - 保证中间件与中间件之间的执行顺序
- 为什么一定要保证洋葱模型
  - 因为中间件的上下文(ctx)的正常调用

```js
app.use((ctx,next)=>{
    const r= ctx.r;
    console.log(r)
    // undefined
})

app.use(async (ctx,next)=>{
    const res = await.get('https://')
    ctx.r = res
    await next()
})

```

## 方法

1. 获取根目录的方法

```
process.cwd()
```

## 关于 API

1. 先是建立路由系统
   - 按照主题进行拆分
   - 以数据类型为主题的划分
2. 建立异常处理
3. 建立验证层

### API 版本

1. 为什么会出现多版本

- 业务出现变更
- 客户端兼容性
- 最多支持 3 个版本

1. 如何 api 携带 版本号
   - ==路径==
   - 查询参数中
   - 放入 Header 中

## User 系统

1. 所需信息
   - 账号、密码
   - 附属信息:昵称、email 、手机
2. 设置 ID 编号系统
   - 数字自增长
   - 高并发时容易重复
   - 最好不要使用 字符串 随机字符串 GUID 数据量大时查询速度非常慢
   - 接口保护 权限 访问接口 Token 令牌

## 用户登录
### 令牌
- 过期时间 

### 权限
- 限制 token 角色
#### 分级
- scope



## 数据库

1. 关系型数据库
   - mysql
     - 增删改查 (CRUD)
     - ORM
   - SQLServer
   - Oracle
   - PostgresSQL
2. 非关系型数据库
   - Redis
     - KEY:VALUE 做缓存
   - MongoDB
3. 主键
   - 关系型数据库
   - 不能重复
   - 不能为空
### 表的建立
#### 实体表
 - 记录本身相关信息 事物 表 映射
#### 业务表
 - 抽象记录业务，解决业务问题
#### 数据库事务
 - 数据库事务可以保持数据的一致性



## 小程序、公众号

    - 共同的ID unionID

## 编程思维

1. web 开发好的代码
   - 方便阅读
   - 利于维护
   - 提高编程效率
2. 什么是开闭原则
   - 不要去修改代码
   - 而是扩展代码
3. 什么是循环引用
   - A 文件引用 B 文件，B 文件引用 A 文件，这样会出现一些查不出的问题，nodeJS 不会报错
4. 为什么不能调用入口文件
   - 不能把入口文件当做一个模块进行调用
   - 入口文件具有最高级别
   - 只能入口文件导入其他模块
   - 文件要划分层次，一般都是上层调用下层而不是下层调用上层
5. 入口文件
   - 入口文件不需要，不需要过多的业务代码，显得太过于臃肿
   - 分离入口文件代码
6. 怎样能提高
   - 动脑筋
   - 思考
   - 能不能简化

### 业务逻辑
- 将业务逻辑写在Model中
### 业务分层
- 可以在 Model层上建立Services
- thinkphp 分为 Model Services logic

## 其他

### 如何将调试与自动重启相结合

## 目录树

core 公共方法
APP api 路由
middlewares
    exception 异常处理中间件

#### 2019年07月25日15:42:29
- 函数不能保持或者保存变量的
- 不要循环查询数据库，查询数据库次数 不可控

#### 2019年07月26日14:39:31
- 如果要在for循环中编写复杂的逻辑，将这段逻辑抽离出来一个函数
- 所有字符串的key都是字符串，如果要使用INT类型的记得转型
- js中二维数组平铺 使用 lodash 库中的 flatten