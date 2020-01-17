// 二次封装 axios 模块，包含拦截器等信息。
import axios from 'axios'
import qs from 'qs'
import config from './config'
import Cookies from 'js-cookie'
import router from '@/router'
import { Message } from 'element-ui'

// 使用vuex做全局loading时使用
// import store from '@/store'
export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
      // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
      baseURL: config.baseURL,
      // `headers` 是即将被发送的自定义请求头
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': Cookies.get('token'),
        accessToken: Cookies.get('token')
      },
      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return data
      }],
      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data
      }],
      // `method` 是创建请求时使用的方法
      method: 'post', // 默认是 get
      // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
      // 如果请求话费了超过 `timeout` 的时间，请求将被中断
      timeout: 5000,
      // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json', // 默认的
      // 先注释掉，开启mock会影响到请求，关闭mock时，可以把此功能打开
      // `onUploadProgress` 允许为上传处理进度事件
      // onUploadProgress: function (progressEvent) {
      //   // 对原生进度事件的处理
      // },
      // `onDownloadProgress` 允许为下载处理进度事件
      onDownloadProgress: function (progressEvent) {
        // 对原生进度事件的处理
      },
      // `maxContentLength` 定义允许的响应内容的最大尺寸
      maxContentLength: 2000
      // // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
      // // `keepAlive` 默认没有启用
      // httpAgent: new http.Agent({ keepAlive: true }),
      // httpsAgent: new https.Agent({ keepAlive: true }),

      // // 'proxy' 定义代理服务器的主机名称和端口
      // // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
      // // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
      // proxy: {
      //   host: '127.0.0.1',
      //   port: 9000,
      //   auth: {
      //     username: 'mikeymike',
      //     password: 'rapunz3l'
      //   }
      // }
    })
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get('token')
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        // 2. 带上token
        if (token) {
          config.headers.accessToken = token
        }
        if (config.method === 'post') {
          config.data = qs.stringify(config.data)
        }
        return config
      },
      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest)// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data = ''
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }

        // // 拦截后台返回的状态
        // if (data.status === undefined) {
        //   // 若不是正确的返回code，且已经登录，就抛出错误
        //   const err = new Error(data.desc)
        //   err.data = data
        //   err.response = response
        //   err.response.status = 401
        //   err.message = '未授权，请登录'
        //   router.push('/404')
        //   throw err
        // }

        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        Message({
          message: err.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
