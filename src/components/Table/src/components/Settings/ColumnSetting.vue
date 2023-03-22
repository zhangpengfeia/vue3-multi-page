<script lang="tsx">
import { Icon } from '@/components/Icon'
import { TableColumn } from '@/types/table'
import {
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElDivider,
  ElPopover,
  ElTooltip
} from 'element-plus'
import { cloneDeep, isBoolean } from 'lodash-es'
import { computed, defineComponent, nextTick, PropType, ref, unref } from 'vue'
import { TableProps } from '../../types'
import Sortablejs from 'sortablejs'
import type Sortable from 'sortablejs'
import { isNullAndUnDef } from '@/utils/is'

export default defineComponent({
  name: 'ColumnSetting',
  props: {
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    }
  },
  emits: ['set-column'],
  setup(props, { emit }) {
    const mergeProps = ref<TableProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    // 要拿到 cloums 和 setcloums
    const { columns } = unref(getProps)
    const vColumns = ref(cloneDeep(columns).map((v) => v.field)) // 新表头

    const checkAll = ref(true) // 全选
    const isIndeterminate = ref(false)
    let inited = false // 拖拽组件是否加载
    const columnListRef = ref<ComponentRef<typeof ElCheckboxGroup>>() // 复选组件

    // 全选/全不选
    const onChangeAllColumns = (val: boolean) => {
      vColumns.value = val ? cloneDeep(columns).map((v) => v.field) : []
      isIndeterminate.value = false
      setColumns(vColumns.value)
    }
    // 复选框改变时
    const onChangeColumns = (value: string[]) => {
      checkAll.value = value.length === columns.length
      setColumns(value)
    }
    // 重置
    let sortable: Sortable
    let sortableOrder: string[] = []
    // reset columns
    function reset() {
      checkAll.value = true
      onChangeAllColumns(true)
      // sortable.sort(sortableOrder) 先注释排序
    }

    // 修改表头
    const setColumns = (value: string[], path = 'show') => {
      const filterColumns: TableColumn[] = columns.map((v) => {
        const find = value.findIndex((c: string) => {
          return c === v.field
        })
        const vis = find !== -1
        return { field: v.field, value: path === 'show' ? vis : find, path }
      })
      emit('set-column', filterColumns)
    }
    // 弹窗显示时
    const popoverShow = () => {
      if (inited) return
      nextTick(() => {
        const columnListEl = unref(columnListRef)
        if (!columnListEl) return
        const el = columnListEl.$el as any
        if (!el) return
        sortable = Sortablejs.create(unref(el), {
          animation: 500,
          delay: 400,
          delayOnTouchOnly: true,
          handle: '.table-column-drag-icon',
          onEnd: (evt) => {
            const { oldIndex, newIndex } = evt
            if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
              return
            }
            // Sort column
            const columnsCopy: TableColumn[] = cloneDeep(columns)
            if (oldIndex > newIndex) {
              columnsCopy.splice(newIndex, 0, columnsCopy[oldIndex])
              columnsCopy.splice(oldIndex + 1, 1)
            } else {
              columnsCopy.splice(newIndex + 1, 0, columnsCopy[oldIndex])
              columnsCopy.splice(oldIndex, 1)
            }
            setColumns(
              columnsCopy
                .filter((f) => (isBoolean(f.show) ? f.show : true))
                .map((col) => col.field),
              'sort'
            )
          }
        })
        // 记录原始order 序列
        sortableOrder = sortable.toArray()
        inited = true
      })
    }

    // 提示
    const renderElTooltip = () => {
      return (
        <span>
          <ElTooltip effect="dark" placement="right">
            {{
              content: () => <span>设置列</span>,
              default: () => (
                <Icon
                  size={18}
                  class="cursor-pointer"
                  icon={'ant-design:setting-outlined'}
                  color="color"
                />
              )
            }}
          </ElTooltip>
        </span>
      )
    }

    // 渲染表头
    const renderColumns = () => {
      return (
        <div>
          <div class="flex items-center">
            <ElCheckbox
              v-model={checkAll.value}
              key={'all'}
              label={'all'}
              indeterminate={isIndeterminate.value}
              onChange={onChangeAllColumns}
            >
              列展示
            </ElCheckbox>
            <ElButton onClick={reset} type="primary" size="small" class="ml-15px">
              重置
            </ElButton>
          </div>
          <ElDivider class="!my-5px" />
          <ElCheckboxGroup v-model={vColumns.value} onChange={onChangeColumns} ref={columnListRef}>
            {columns.map((v) => {
              return (
                <div key={v.field} class="flex items-center">
                  <Icon
                    size={18}
                    icon={'ant-design:drag-outlined'}
                    color="color"
                    class="cursor-pointer table-column-drag-icon mr-7px"
                  />
                  <ElCheckbox key={v.field} label={v.field}>
                    {v.label}
                  </ElCheckbox>
                </div>
              )
            })}
          </ElCheckboxGroup>
        </div>
      )
    }

    const content = () => {
      return <div>{renderColumns()}</div>
    }

    const render = () => {
      return (
        <ElPopover trigger={'click'} onShow={popoverShow}>
          {{
            reference: () => renderElTooltip(),
            default: () => content()
          }}
        </ElPopover>
      )
    }
    return () => (
      <div>
        {/* 在tsx中使用el-popover */}
        {render()}
      </div>
    )
  }
})
</script>
<style lang="scss" scoped></style>
