<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table'
import { Search } from '@/components/Search'
import { loginApi } from '../../interface/login'
import { TableData } from '../../interface/login/types'
import { h, reactive, unref } from 'vue'
import { ElTag, ElButton } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { useRouter } from 'vue-router'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

const { register, tableObject, methods, elTableRef } = useTable<TableData>({
  getListApi: loginApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods

const { push } = useRouter()

getList()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'display_time',
    label: '时间',
    search: {
      show: true
    }
  },
  {
    field: 'importance',
    label: '123',
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () => (cellValue === 1 ? 'df' : cellValue === 2 ? 'df' : 'df')
      )
    }
  },
  {
    field: 'pageviews',
    label: 'f24324'
  },
  {
    field: 'action',
    width: '260px',
    label: '操作'
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}
const delData = async (row: TableData | null, multiple: boolean) => {}

const action = (row: TableData, type: string) => {
  push(`/test/example-${type}?id=${row.id}`)
}
</script>

<template>
  <ContentWrap title="表格">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />
    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'edit')"> 编辑 </ElButton>
        <ElButton type="success" @click="action(row, 'detail')"> 详情 </ElButton>
        <ElButton type="danger" @click="delData(row, false)"> 删除 </ElButton>
      </template>
      <template #expand="data">
        <div class="ml-30px">
          <div>标题：{{ data.row.title }}</div>
          <div>作者：{{ data.row.author }}</div>
          <div>创建时间：{{ data.row.display_time }}</div>
        </div>
      </template>
    </Table>
  </ContentWrap>
</template>
