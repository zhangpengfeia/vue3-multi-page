/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-14 16:31:19
 * @LastEditTime: 2023-02-25 21:38:22
 */
const config: {
  base_url: {
   base: String,
   dev: String,
   test: String,
   pro: String
 },
 request_timeout: Number,
 default_headers: String
} = {

  base_url: {
     // 接口前缀
    base: '/api',

    // 开发
    dev: "/api",

    // 测试
    test: "",

    // 生产
    pro: ""
  },
  // 超时
  request_timeout: 5000,

  // 接口请求类型
  default_headers: 'application/json'
}

export { config }