# island
## Node koa
## 库 
### 发送HTTP请求
axios
### 路由系统
koa - router
### node服务器自动重启
- nodemon
- 为什么要全局安装
```
// 绑定要启动的服务器
nodemon app.js
``` 

### 问题
- 什么中间件非要加async
    - 因为中间不加async await 会报错
    - async会将函数强制转换为一个promise
- 中间件为什么要强制加async await 
    - 保证koa的洋葱模型使用
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

## 关于API
1. 先是建立路由系统
    - 按照主题进行拆分
    - 以数据类型为主题的划分
### API版本
1. 为什么会出现多版本
- 业务出现变更
- 客户端兼容性 
- 最多支持3个版本
1. 如何api 携带 版本号
    - ==路径==
    - 查询参数中
    - 放入Header中

## 编程思维
1. web开发好的代码
    - 方便阅读
    - 利于维护
    - 提高编程效率
2. 什么是开闭原则
    - 不要去修改代码
    - 而是扩展代码
3. 什么是循环引用
    - A 文件引用B文件，B文件引用A文件，这样会出现一些查不出的问题，nodeJS不会报错
4. 为什么不能调用入口文件
    - 不能把入口文件当做一个模块进行调用
    - 入口文件具有最高级别
    - 只能入口文件导入其他模块
    - 文件要划分层次，一般都是上层调用下层而不是下层调用上层

## 其他
### 如何将调试与自动重启相结合