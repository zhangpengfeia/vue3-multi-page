/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-14 08:54:49
 * @LastEditTime: 2023-02-25 21:28:09
 */
import axios from 'axios';

// import { ElMessage } from 'element-plus'

import { config } from './config'

const {  base_url } = config
console.log(import.meta.env.VITE_API_BASEPATH);

export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]
  
// const configOptions:AxiosRequestConfig = {
  
// }

const service = axios.create({
  baseURL: PATH_URL,
  timeout: 5000
})


// 拦截
service.interceptors.request.use(config => {
  // let token = document.cookie.indexOf("name")
  // console.log(token)
  return config
}, err => {
  return Promise.reject(err)
})

// 响应
service.interceptors.response.use(result => {
  return result.data
}, err => {
  return Promise.reject(err);
})


export { service }



//get

//post

//put

//delete