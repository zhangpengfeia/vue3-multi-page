<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table'
import { loginApi } from '../../interface/login'
import { TableData } from '../../interface/login/types'
import { h, reactive, unref } from 'vue'
import { ElTag, ElButton } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { useRouter } from 'vue-router'

const { register, tableObject, methods, elTableRef } = useTable<TableData>({
  getListApi: loginApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList } = methods

const { push } = useRouter()

getList()

const columns = reactive<TableColumn[]>([
  // {
  //   field: 'index',
  //   label: '序号',
  //   type: 'index'
  // },
  {
    field: 'title',
    label: '标题'
  },
  {
    field: 'author',
    label: '作者'
  },
  {
    field: 'display_time',
    label: '创建时间'
  },
  {
    field: 'importance',
    label: '状态',
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () => (cellValue === 1 ? '重要' : cellValue === 2 ? '派发' : '审核中')
      )
    }
  },
  {
    field: 'action',
    label: '操作'
  }
])

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}
const delData = async (row: TableData | null, multiple: boolean) => {}

const action = (row: TableData, type: string) => {
  push(`/example/example-${type}?id=${row.id}`)
}
</script>

<template>
  <ContentWrap title="表格">
    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="columns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)"> 操作 </ElButton>
      </template>

      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'edit')"> 编辑 </ElButton>
        <ElButton type="success" @click="action(row, 'detail')"> 详情 </ElButton>
        <ElButton type="danger" @click="delData(row, false)"> 删除 </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
