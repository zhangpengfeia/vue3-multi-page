/*
 * @Description:
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-15 08:34:38
 * @LastEditTime: 2023-02-15 09:09:59
 */
import { defineStore } from 'pinia'
// import { store } from '..'

interface List {
  constantRouterMapS: AppRouteRecordRaw[]
  asyncRouterMapS: AppRouteRecordRaw[]
}

export const useRouterMapS = defineStore('routerMapS', {
  state: (): List => ({
    constantRouterMapS: [],
    asyncRouterMapS: []
  }),
  getters: {
    getConstantRouterMapS(): AppRouteRecordRaw[] {
      return this.constantRouterMapS
    },
    getAsyncRouterMapS(): AppRouteRecordRaw[] {
      return this.asyncRouterMapS
    }
  },
  actions: {
    setConstantRouterMapS(t: AppRouteRecordRaw[]) {
      this.constantRouterMapS = t
    },
    setAsyncRouterMapS(t: AppRouteRecordRaw[]) {
      this.asyncRouterMapS = t
    }
  }
})
