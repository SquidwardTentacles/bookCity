module.exports = function getReqDatae (ctx) {
  return new Promise((resolve, reject) => {
    let datab = ''
    ctx.req.on('data', (data) => {
      datab += data
    })
    ctx.req.on('end', () => {
      let arr = datab.split('&')
      let obj = {}
      for (let i = 0; i < arr.length; i++) {
        let value = arr[i].split('=')
        obj[value[0]] = value[1]
      }
      resolve(obj)
    })
  })
}