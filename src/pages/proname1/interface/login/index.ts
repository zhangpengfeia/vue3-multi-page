/*
 * @Description:
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-14 08:53:03
 * @LastEditTime: 2023-02-25 21:30:16
 */
import request from '@/config/axios'
import type { UserLoginType, UserType } from './types'

interface IResponse<T = any> {
  code: String | Number
  data: T extends any ? T : T & any
  message: String
}

export const loginApi = (data: UserLoginType): Promise<IResponse<any>> => {
  return request.post({ url: '/employee/login', data })
}
