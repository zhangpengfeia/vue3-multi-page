export type UserLoginType = {
  username: string
  password: string
}

export type UserType = {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}

export type TableData = {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: string
  pageviews: number
}
