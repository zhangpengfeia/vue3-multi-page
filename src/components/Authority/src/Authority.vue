<!--
 Access control component for fine-grained access control.
-->
<script lang="tsx">
import { usePermission } from '@/hooks/web/usePermission'
import { getSlot } from '@/utils/tsxHelper'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Authority',
  props: {
    /*
      value: 权限列表
    */
    value: {
      type: [Number, Array, String] as PropType<string | string[]>,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { hasPermission } = usePermission()

    const renderAuth = () => {
      const { value } = props
      if (!value) {
        return getSlot(slots)
      }
      return hasPermission(value) ? getSlot(slots) : null
    }

    return () => renderAuth()
  }
})
</script>
