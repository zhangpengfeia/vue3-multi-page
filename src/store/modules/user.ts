/*
 * @Description:
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-14 15:57:09
 * @LastEditTime: 2023-02-15 09:25:05
 */
import { defineStore } from 'pinia'
import { store } from '..'
// import { UserInfo } from '@/types/store'
// import { getUserInfo } from '@/api/user'
import { isArray } from '@/utils/is'
import { useCache } from '@/hooks/web/useCache'

type roles = String[]

interface User {
  token?: String
  roles: roles
  lastUpdateTime: number
  UserInfo: any
}

const { wsCache } = useCache()

export const useUserStore = defineStore('user', {
  state: (): User => ({
    token: undefined,
    roles: [],
    UserInfo: null,
    lastUpdateTime: 0
  }),
  getters: {
    getToken(): String {
      return this.token || wsCache.get('token')
    },
    getRoles(): roles {
      return this.roles
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    }
  },
  actions: {
    setToken(t: String) {
      this.token = t
    },
    setRoles(t: roles) {
      this.roles = t
    },
    setUserInfo(user: any) {
      this.UserInfo = user
    },
    async getUserInfoAction() {
      // 系统嵌套在crm里，默认已经登录，所以不判断token了
      // if (!this.getToken) return null
      // const userInfo = await getUserInfo()
      // const { data } = userInfo
      // const { roles = ['admin', 'test'] } = data
      const roles = ['admin', ''] // 模拟权限
      if (isArray(roles)) {
        // const roleList = roles.map((item) => item) as roles
        this.setRoles(roles)
        // wsCache.set('roles', roles)
      } else {
        this.setRoles([])
        // wsCache.set('roles', [])
      }
      // this.setUserInfo(userInfo)
      return roles
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
