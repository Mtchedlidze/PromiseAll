function promiseAll(...promises: Promise<unknown>[]) {
  return new Promise((resolve, reject) => {
    const results: unknown[] = []
    let resolved: number = 0

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((result) => {
          results[i] = result
          resolved++
          if (resolved === promises.length) resolve(results)
        })
        .catch(reject)
    }
  })
}

//promise samples
const promiseSample1 = Promise.resolve(1)
const promiseSample2 = Promise.resolve(2)
const promiseSample3 = Promise.resolve(3)
//tests
promiseAll(promiseSample1, promiseSample2, promiseSample3).then((val) => {
  console.log(val) // => [1,2,3]
})

promiseAll(promiseSample2, promiseSample1, promiseSample3).then((val) => {
  console.log(val) // => [2,1,3]
})

//reject test
promiseAll(
  promiseSample2,
  promiseSample1,
  promiseSample3,
  Promise.reject('oops')
)
  .then((val) => {
    console.log(val)
  })
  .catch(console.log) //=>oops
