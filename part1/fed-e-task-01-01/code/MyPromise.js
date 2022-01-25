/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        // 如果在执行执行器的时候报错了，需要捕获错误情况
        try {
            // 传入立即执行的执行器
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    // promise 状态
    status = PENDING
    // 成功之后的值
    value = undefined
    // 失败之后的原因
    reason = undefined
    // 成功之后的回调
    successCallback = []
    // 失败之后的回调
    failCallback = []
    resolve = value => {
        // 因为状态一旦确定就不可以更改，所以需要有一层判断
        if (this.status !== PENDING) return
        // 状态更改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 判断成功回调是否存在，存在则调用
        // this.successCallback && this.successCallback(this.value)
        // 当使用 then 方法多次调用时，添加多个处理函数
        while (this.successCallback.length) this.successCallback.shift()()
    }
    reject = reason => {
        // 因为状态一旦确定就不可以更改，所以需要有一层判断
        if (this.status !== PENDING) return
        // 状态更改为失败
        this.status = REJECTED
        // 保存失败后的原因
        this.reason = reason
        // 判断失败回调是否存在，存在则调用
        // this.failCallback && this.failCallback(this.reason)
        // 当使用 then 方法多次调用时，添加多个处理函数
        while (this.failCallback.length) this.failCallback.shift()()
    }
    then(successCallback, failCallback) {
        // 实现 .then() 参数可选
        successCallback = successCallback ? successCallback : value => value
        failCallback = failCallback ? failCallback : reason => { throw reason }
        // then 方法返回的是一个 promise，实现链式调用
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            // 判断当状态为成功时，调用成功回调
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    // 如果 then 方法在执行过程中报错，需要捕获到这个错误，并提示出来
                    try {
                        let v = successCallback(this.value)
                        // 判断 v 的值是普通值还是promise对象
                        // 如果是普通值，直接调用 resolve
                        // 如果是 promise 对象，查看promise对象返回的结果
                        // 再根据promise对象返回的结果，决定调用resolve还是reject
                        resolvePromise(promise2, v, resolve, reject) // 此时primise2还获取不到，所以需要将此编程异步代码
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    // 如果 then 方法在执行过程中报错，需要捕获到这个错误，并提示出来
                    try {
                        // 当状态为失败时，调用失败回调
                        let v = failCallback(this.reason)
                        // 判断 v 的值是普通值还是promise对象
                        // 如果是普通值，直接调用 resolve
                        // 如果是 promise 对象，查看promise对象返回的结果
                        // 再根据promise对象返回的结果，决定调用resolve还是reject
                        resolvePromise(promise2, v, resolve, reject) // 此时primise2还获取不到，所以需要将此编程异步代码
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else {
                // 状态是等待，意味着是异步操作的时候
                // 此时需要将callback存储起来
                this.successCallback.push(() => {
                    setTimeout(() => {
                        // 如果 then 方法在执行过程中报错，需要捕获到这个错误，并提示出来
                        try {
                            let v = successCallback(this.value)
                            // 判断 v 的值是普通值还是promise对象
                            // 如果是普通值，直接调用 resolve
                            // 如果是 promise 对象，查看promise对象返回的结果
                            // 再根据promise对象返回的结果，决定调用resolve还是reject
                            resolvePromise(promise2, v, resolve, reject) // 此时primise2还获取不到，所以需要将此编程异步代码
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.failCallback.push(() => {
                    setTimeout(() => {
                        // 如果 then 方法在执行过程中报错，需要捕获到这个错误，并提示出来
                        try {
                            // 当状态为失败时，调用失败回调
                            let v = failCallback(this.reason)
                            // 判断 v 的值是普通值还是promise对象
                            // 如果是普通值，直接调用 resolve
                            // 如果是 promise 对象，查看promise对象返回的结果
                            // 再根据promise对象返回的结果，决定调用resolve还是reject
                            resolvePromise(promise2, v, resolve, reject) // 此时primise2还获取不到，所以需要将此编程异步代码
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
    // 实现 catch 方法
    catch (failCallback) {
        // catch 方式其实就是 then 方法，只是第一个参数传入 undefined 就ok了
        return this.then(undefined, failCallback)
    }
    // 谁先 finally 方法
    finally(callback) {
        // 如果成功失败都会执行，所以不依赖状态
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value)
            // callback()
            // return value
        }, reason => {
            return MyPromise.resolve(callback()).then(() => { throw reason })
            // callback()
            // throw reason
        })
    }
    // 实现 all 方法，接收一个数组参数
    static all(array) { // 基础版，未考虑异常情况，没有对传入数据做校验，默认传值是正确的
        let result = [] // 返回值
        let index = 0 // 索引
        return new MyPromise((resolve, reject) => {
            // 添加数据h桉树，key 即索引
            function addData(key, value) {
                result[key] = value // 将结果传入返回值中
                index++ // 每次添加都自增 1
                // 因为可能内部存在异步代码，for循环是立即执行完成，所以，需要在判断全部相等之后，再去返回 resolve
                if (index === array.length) { // 判断，只有当所有的全部添加完成之后，返回 resolve
                    resolve(result)
                }
            }
            // 循环遍历传入的数组参数
            for (let i = 0; i < array.length; i++) {
                let current = array[i] // 拿到当前的值
                if (current instanceof MyPromise) {
                    // promise 对象
                    current.then(value => { addData(i, value) }, error => reject(error))
                } else {
                    // 普通值
                    addData(i, array[i])
                }
            }
        })
    }
    // 实现静态 resolve 方法， 传入参数
    static resolve(value) {
        // 判断参数是否为 promise，如果是，直接返回
        if (value instanceof MyPromise) return value
        // 如果是一个普通值，则返回 promise，在 resolve中传入 value
        return new MyPromise(resolve => resolve(value))
    }
}

function resolvePromise(promise2, v, resolve, reject) {
    // 如果返回的primise同当前的promise是同一个promise，则报错并return 阻止程序继续向下执行
    if (promise2 === v) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (v instanceof MyPromise) {
        // v.then(value => resolve(value), reason => reject(reason))
        v.then(resolve, reject)
    } else {
        resolve(v)
    }
}

module.exports = MyPromise
