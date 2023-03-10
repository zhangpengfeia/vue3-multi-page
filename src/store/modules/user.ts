/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-14 15:57:09
 * @LastEditTime: 2023-02-15 09:25:05
 */
import { defineStore } from 'pinia'
import { store } from '..'

type roles = {
  role: String[]
  name: string
}

interface User {
  token: String,
  roles: roles[]
}

export const useInfo = defineStore('user', {
  state:():User => ({
    token: "store user",
    roles: [
      {
        name:"zhang",
        role: ['admin'],
      },
      {
        name:"li",
        role: ['edit'],
      },
      {
        name:"wang",
        role: ['tourist'],
      },
      {
        name:"ma",
        role: ['admin', 'edit'],
      },
    ]
  }),
  getters: {
    getToken():String {
      return this.token
    },
    getRoles():roles[] {
      return this.roles
    },
  },
  actions: {
    setToken(t:String) {
      this.token = t
    },
    setRoles(t:roles[]) {
      this.roles = t
    }
  }
})

export const useInfoWitOut = () => {
  return useInfo(store)
}