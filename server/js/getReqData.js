function getRequestData (ctx) {
  return new Promise((resolve, reject) => {
    let datab = ''
    ctx.req.on('data', data => {
      console.log(data.toString(), 'd')

      datab += data
    })
    ctx.req.on('end', () => {
      let reqMethods = ctx.request.method
      let obj = {}
      if (reqMethods === 'POST') {
        let arr = datab.split('&')
        for (let i = 0; i < arr.length; i++) {
          let value = arr[i].split('=')
          obj[value[0]] = value[1]
        }
      } else if (reqMethods === 'PUT') {
        obj = JSON.parse(datab)
      }
      resolve(obj)

    })
  })
}

module.exports = async function getReqDatae (ctx) {
  let reqMethods = ctx.request.method
  // 判断请求方式
  let methodTypeQuery = reqMethods === 'GET' || reqMethods === 'DELETE'
  let obj = {}
  if (methodTypeQuery) {
    obj = ctx.request.query
  } else {
    obj = await getRequestData(ctx)
  }
  return obj
  // if(reqMethods!=='GET')
  // console.log(data, 'ddddddddddd')

  // return new Promise((resolve, reject) => {
  //   let datab = ''
  //   ctx.req.on('data', (data) => {
  //     datab += data
  //   })
  //   ctx.req.on('end', () => {
  //     let obj = {}
  //     if (reqMethods === 'POST') {
  //       let arr = datab.split('&')
  //       for (let i = 0; i < arr.length; i++) {
  //         let value = arr[i].split('=')
  //         obj[value[0]] = value[1]
  //       }
  //     } else if (reqMethods === 'PUT') {
  //       obj = JSON.parse(datab)
  //     }
  //     console.log(datab, '参数')

  //     if (!Object.values(obj).length) {
  //       reject({ msg: '数据获取失败', code: 002 })
  //     } else {
  //       resolve(obj)

  //     }
  //   })
  // })
}