<script lang="tsx">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/modules/user'
// import { usePermission } from '@/hooks/web/usePermission'
import { Authority } from '@/components/Authority'
import { ElButton, ElDivider } from 'element-plus'
import { usePermission } from '@/hooks/web/usePermission'
import { Icon } from '@/components/Icon'
import { RoleEnum } from '@/enums/roleEnum'

// enum RoleEnum {
//   // super admin
//   ADMIN = 'admin',
//   // tester
//   TEST = 'test'
// }

const userStore = useUserStore()

export default defineComponent({
  name: 'Permission',
  setup() {
    const { hasPermission, changeRole } = usePermission()

    // 组件形式权限控制
    const AuthorityRoles = () => {
      return (
        <>
          <p>组件形式权限控制</p>
          <Authority value={RoleEnum.ADMIN}>
            <ElButton type="primary">拥有admin角色权限可见</ElButton>
          </Authority>
          <Authority value={RoleEnum.TEST}>
            <ElButton type="primary">拥有test角色权限可见</ElButton>
          </Authority>
          <Authority value={[RoleEnum.ADMIN, RoleEnum.TEST]}>
            <ElButton type="primary">拥有admin,test角色权限可见 </ElButton>
          </Authority>
        </>
      )
    }

    // v-if形式控制
    const IfRoles = () => {
      const adminRole = hasPermission(RoleEnum.ADMIN)
      const testRole = hasPermission(RoleEnum.TEST)
      const adminTestRole = hasPermission([RoleEnum.ADMIN, RoleEnum.TEST])
      return (
        <>
          <p>v-if形式控制</p>
          {adminRole ? <ElButton type="primary">拥有admin角色权限可见</ElButton> : null}

          {testRole ? <ElButton type="primary">拥有test角色权限可见</ElButton> : null}

          {adminTestRole ? <ElButton type="primary">拥有admin,test角色权限可见</ElButton> : null}
        </>
      )
    }

    // 自定义指令
    const VAuthRoles = () => {
      const roles = [RoleEnum.ADMIN, RoleEnum.TEST]
      return (
        <>
          <p>
            自定义指令形式，切换权限后需要点击右上角 <Icon icon="ant-design:sync-outlined"></Icon>{' '}
            手动刷新
          </p>
          <ElButton v-auth={RoleEnum.ADMIN} type="primary">
            拥有admin角色权限可见
          </ElButton>
          <ElButton v-auth={RoleEnum.TEST} type="primary">
            拥有test角色权限可见
          </ElButton>
          <ElButton v-auth={roles} type="primary">
            拥有admin,test角色权限可见
          </ElButton>
        </>
      )
    }

    const ChangeRoles = () => {
      return (
        <div>
          <p>权限切换</p>
          <ElButton type="primary" onClick={() => changeRole(RoleEnum.ADMIN)}>
            点击切换权限Admin
          </ElButton>
          <ElButton type="primary" onClick={() => changeRole(RoleEnum.TEST)}>
            点击切换权限Test
          </ElButton>
          <ElButton type="primary" onClick={() => changeRole([RoleEnum.ADMIN, RoleEnum.TEST])}>
            点击切换权限admin,Test
          </ElButton>
        </div>
      )
    }

    return () => (
      <>
        <p>当前角色: {userStore.getRoles}</p>
        <br></br>
        {ChangeRoles()}
        <ElDivider />
        {AuthorityRoles()}
        <ElDivider />
        {IfRoles()}
        <ElDivider />
        {VAuthRoles()}
      </>
    )
  }
})
</script>

<style lang="scss" scoped></style>
