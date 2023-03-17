import { isArray } from '@/utils/is'
import { RoleEnum } from '@/enums/roleEnum'
import { useUserStore } from '@/store/modules/user'
import { intersection } from 'lodash-es'

export const usePermission = () => {
  const userStore = useUserStore()

  const hasPermission = (
    value?: RoleEnum | RoleEnum[] | string | string[],
    def = true
  ): boolean => {
    // Visible by default
    if (!value) {
      return def
    }

    // 单个权限
    if (!isArray(value)) {
      return userStore.getRoles?.includes(value as RoleEnum)
    }
    // intersection 返回传入数组的交集元素，如果大于0，说明有权限
    // 多权限
    return (intersection(value, userStore.getRoles) as RoleEnum[]).length > 0
  }

  const changeRole = async (roles: RoleEnum | RoleEnum[]): Promise<void> => {
    if (!isArray(roles)) {
      roles = [roles]
    }
    userStore.setRoles(roles)
  }

  return {
    hasPermission,
    changeRole
  }
}
