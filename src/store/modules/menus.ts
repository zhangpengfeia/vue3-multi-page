/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-15 08:34:38
 * @LastEditTime: 2023-02-15 09:09:59
 */
import { defineStore } from 'pinia'
import { store } from '..'

type nav = {
  id: string | number
}[]

interface List {
  navList: nav
}

export const menusList = defineStore('menus', {
  state:():List => ({
    navList: [
      { id: 2 },
      { id: 3 },
      { id: 4 }
    ]
  }),
  getters: {
    getNavList():nav {
      return this.navList
    }
  },
  actions: {
    setNavList(t:nav) {
      this.navList = t
    }
  }
})

export const menusListWitOut = () => {
  return menusList(store)
}