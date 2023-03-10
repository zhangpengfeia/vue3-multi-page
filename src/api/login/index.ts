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
  code: String | Number,
  data: T extends any ? T : T & any,
  message: String
}

// export const loginApi = (data: UserLoginType): Promise<IResponse<UserType>> => request.get({url:'/login'})
export const loginApi = (data: UserLoginType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/employee/login',data })
}
// export const loginInitApi = (data:UserLoginType):Promise<IResponse> => request.post('/logininit', data)


// export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
//   return request.post({ url: '/user/login', data })
// }

// export const loginOutApi = (): Promise<IResponse> => {
//   return request.get({ url: '/user/loginOut' })
// }

// export const getUserListApi = ({ params }: AxiosConfig) => {
//   return request.get<{
//     total: number
//     list: UserType[]
//   }>({ url: '/user/list', params })
// }

// export const getAdminRoleApi = (
//   params: RoleParams
// ): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
//   return request.get({ url: '/role/list', params })
// }

// export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
//   return request.get({ url: '/role/list', params })
// }
