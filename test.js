function func1() {
  func2();
}
async function func2() {
  try {
    await func3();
  } catch (error) {
    console.log('error');
  }
}
function func3() {
  // setTimeout(() => {
  //   throw new Error('error');
  // }, 1000);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const r = Math.random();
      if (r < 0.5) {
        reject('error');
      }
    }, 1000);
  });
}

func1();


// 没有发生异常 正确返回结果
// 发生了异常

// 函数设计
// 判断出异常 return false null
// throw new Erron

// 好习惯
// 在调用别人的第三方库的时候try catch
// 进行全局异常处理


// 在异步操作中无法捕捉到异常，只对同步是有效的

// node
// 无阻塞，高并发
// 异步操作是其保障
// 大量操作依赖回调函数

// 异步操作是当一个耗时很长的请求进来的时候，会停下当前耗时的任务去执行另外一个任务
