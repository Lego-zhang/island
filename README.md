# island
## Node koa
## 库 
### 发送HTTP请求
axios
### 路由系统
koa - router

### 问题
- 什么中间件非要加async
    - 因为中间不加async await 会报错
    - async会将函数强制转换为一个promise
- 中间件为什么要强制加async await 
    - 保证koa的洋葱模型使用
    - 保证中间件与中间件之间的执行顺序
- 为什么一定要保证洋葱模型
    - 因为中间件的上下文(ctx)的正常调用
···js
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

···

## 关于API
1. 先是建立路由系统
    - 按照主题进行拆分
    - 以数据类型为主题的划分

## 编程思维
1. web开发好的代码
    - 方便阅读
    - 利于维护
    - 提高编程效率