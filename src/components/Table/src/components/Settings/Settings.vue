<script lang="tsx">
import { PropType } from 'vue'
import type { TableColumn, TableSetting } from '@/types/table'
import { defineComponent, computed } from 'vue'
import ColumnSetting from './ColumnSetting.vue'

export default defineComponent({
  name: 'TableSetting',
  components: {
    ColumnSetting
  },
  props: {
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    setting: {
      type: Object as PropType<TableSetting>,
      default: () => ({})
    }
  },
  emits: ['set-column'],
  setup(props, { emit }) {
    // const table = getTable()
    const getSetting = computed((): TableSetting => {
      return {
        redo: true,
        size: true,
        setting: true,
        fullScreen: false,
        ...props.setting
      }
    })

    function handleColumnChange(data: TableColumn[]) {
      emit('set-column', data)
    }

    return () => (
      <div class="table-settings py-10px flex">
        {getSetting.value.setting ? (
          <ColumnSetting columns={props.columns} onSetColumn={handleColumnChange} />
        ) : undefined}
      </div>
    )
  }
})
</script>
<style lang="less">
.table-settings {
  & > * {
    margin-right: 12px;
  }

  svg {
    width: 1.3em;
    height: 1.3em;
  }
}
</style>
