// 接口请求函数封装（避免在多次调用到同一个接口的时候都要重复编写url和method）
import request from './request'
import {apiUrl} from './apiUrl'

// 登录
export function reqLogin (params) {
  return request({
    url: `${apiUrl.reqLogin}`,
    method: 'post',
    data: params
  })
}
// // get请求方式写法
// export function reqLogin (params) {
//   return request({
//     url: `${apiUrl.reqLogin}`,
//     method: 'get',
//     params
//   })
// }