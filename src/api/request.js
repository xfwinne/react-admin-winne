import axios from 'axios';
import { message } from 'antd';
// 创建axios实例
const service = axios.create({
  // baseURL: '/apiUrl', // api 的 base_url
  // timeout: 60000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    // config.headers.Authorization = 'JWT ' + getToken() // 在请求头规定的字段上加token
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => { // 请求成功
    /**
     * 结合自己业务进行代码判断
     */
    const res = response.data
    if (res.status === 0) { // 请求后台定义的status为0是正确响应
      // console.log(res)
      return res
    } else { // 请求后台定义的status为其他值为错误响应，直接在这里进行处理提示就好了(不要再返回promise出去了)，那么在调用请求的地方就需不需要写那么多重复的错误捕捉
      message.error(res.msg);
      // console.log(res)
      // return false
      // 下面可以根据自己和后端的对接定义分类提示
      // if (res.status === 401) { // 登录态过期
      //   console.log(401)
      //   res.message = '登录态过期,请重新登录'
      //   return Promise.reject(res)
      // } else if (res.status === 403) { // 没权限访问
      //   console.log(403)
      //   res.message = '对不起，管理员未对您开放此权限'
      //   return Promise.reject(res)
      // } else if (res.status === 429) { // 操作太频繁
      //   res.message = '您的操作太频繁，请稍后再试'
      //   return Promise.reject(res)
      // } else {
      //   message.error(res.msg);
      //   // return Promise.reject(res)
      // }
    }
  },
  error => { // 请求出错(暂时还不知道为什么请求出错了也会进到then中，然后没返回的话then中拿到的数据时undefined)
    console.log(error)
    // 请求接口请求异常处理
    if (!error.response) {
      console.log(error)
      message.error('服务器出错了，请联系管理员');
      // return false
    } else {
      console.log(error)
      message.error(error.response.status + '服务器出错了，请联系管理员');
      // return false
    }
    return false
    // return Promise.reject(error);
  }
)

export default service
