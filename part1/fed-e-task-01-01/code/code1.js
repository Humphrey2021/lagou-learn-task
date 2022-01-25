/*
  将下面异步代码使用 Promise 的方法改进
  尽量用看上去像同步代码的方式
  setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
      var b = 'lagou'
      setTimeout(function () {
        var c = 'I ♥ U'
        console.log(a + b +c)
      }, 10)
    }, 10)
  }, 10)
*/

const PT = str => new Promise(resolve => setTimeout(() => resolve(str), 10))

let a = 'hello'
let b = 'lagou'
let c = 'I ♥ U'

PT(a).then(a => PT(a + b)).then(b => PT(b + c)).then(sum => console.log(sum))
