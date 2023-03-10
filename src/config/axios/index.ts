/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-14 08:54:49
 * @LastEditTime: 2023-02-25 21:41:12
 */
import { service } from './service'

import {config} from './config'



const request = (options:any) => {
  const { url, method, headersType,data } = options
  console.log(options)
  return service({
    url,
    method,
    data,
    headers: {
      'Content-Type': headersType || config.default_headers
    }
  })
}


export default {
  get: <T = any>(options:any) => {
    return request({method: 'get', ...options}) as unknown as T
  },
  post: <T = any>(options:any) => {
    return request({method: 'post', ...options}) as unknown as T
  }
}