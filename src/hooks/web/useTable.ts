import { Table, TableExpose } from '@/components/Table'
import { ElTable, ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, watch, computed, unref, nextTick } from 'vue'
import { get } from 'lodash-es'
import type { TableProps } from '@/components/Table/src/types'
import { TableSetPropsType } from '@/types/table'

interface TableResponse<T = any> {
  total: number
  list: T[]
  pageNumber: number
  pageSize: number
}

interface UseTableConfig<T = any> {
  // getListApi: (option: any) => Promise<IResponse<TableResponse<T>>>
  getListApi: any
  delListApi?: (option: any) => Promise<IResponse>
  // 返回数据格式配置
  response: {
    list: string
    total?: string
  }
  // 默认传递的参数
  defaultParams?: Recordable
  props?: TableProps
}

interface TableObject<T = any> {
  pageSize: number
  currentPage: number
  total: number
  tableList: T[]
  params: any
  loading: boolean
  currentRow: Nullable<T>
}

export const useTable = <T = any>(config?: UseTableConfig<T>) => {
  const tableObject = reactive<TableObject<T>>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 10,
    // 表格数据
    tableList: [],
    // AxiosConfig 配置
    params: {
      ...(config?.defaultParams || {})
    },
    // 加载中
    loading: true,
    // 当前行的数据
    currentRow: null
  })

  const paramsObj = computed(() => {
    return {
      ...tableObject.params,
      pageSize: tableObject.pageSize,
      pageIndex: tableObject.currentPage
    }
  })

  watch(
    () => tableObject.currentPage,
    () => {
      methods.getList()
    }
  )

  watch(
    () => tableObject.pageSize,
    () => {
      // 当前页不为1时，修改页数后会导致多次调用getList方法
      if (tableObject.currentPage === 1) {
        methods.getList()
      } else {
        tableObject.currentPage = 1
        methods.getList()
      }
    }
  )

  // Table实例
  const tableRef = ref<typeof Table & TableExpose>()

  // ElTable实例
  const elTableRef = ref<ComponentRef<typeof ElTable>>()

  const register = (ref: typeof Table & TableExpose, elRef: ComponentRef<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = unref(elRef)
  }

  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    if (!table) {
      console.error('The table is not registered. Please use the register method to register')
    }
    return table
  }

  const delData = async (ids: string[] | number[]) => {
    const res = await (config?.delListApi && config?.delListApi(ids))
    if (res) {
      ElMessage.success('删除成功')

      // 计算出临界点
      const currentPage =
        tableObject.total % tableObject.pageSize === ids.length || tableObject.pageSize === 1
          ? tableObject.currentPage > 1
            ? tableObject.currentPage - 1
            : tableObject.currentPage
          : tableObject.currentPage

      tableObject.currentPage = currentPage
      methods.getList()
    }
  }

  const methods = {
    getList: async () => {
      tableObject.loading = true
      // const res = await config?.getListApi(unref(paramsObj)).finally(() => {
      // tableObject.loading = false
      // })
      // 模拟数据
      tableObject.loading = false
      const res = {
        code: '0000',
        data: {
          total: 100,
          list: [
            {
              id: '1413833-102686-4311914-99812-94340',
              author: 'Karen',
              title: 'Nabz Qzysgzx Ocduhfh Pjyilw Pvqkc Jjjqzv Ekls Cdihxkb',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 2,
              display_time: '1987-07-14 07:00:50',
              pageviews: 4569
            },
            {
              id: '83010-7912150-4811915-815980-211152',
              author: 'Eric',
              title: 'Iournfh Wdpflt Krfnc Pxt Rmhgf Jcrirly',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 3,
              display_time: '1987-05-28 00:10:59',
              pageviews: 2834
            },
            {
              id: '14121315-15221111-4101335-101071011-122144',
              author: 'Barbara',
              title: 'Lgqoopqzk Xojoasiyrh Xrjtvlm Enoponbifq Gwpsxzshw',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 3,
              display_time: '2021-09-17 14:03:19',
              pageviews: 2925
            },
            {
              id: '132865-77319-406714-1021445-122319',
              author: 'Charles',
              title: 'Jwjy Jyanim Wde Ouwnwrrns Ivqg Jhyshemn Wrg Efndmy',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 3,
              display_time: '2000-03-20 18:11:38',
              pageviews: 3430
            },
            {
              id: '14012214-914136-48109-811217-7714614',
              author: 'Gary',
              title: 'Swvjxql Heineww Ocqwubiqp Efdjhn Ckwd Jobi Ujsixb',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 3,
              display_time: '2022-09-03 12:03:25',
              pageviews: 2699
            },
            {
              id: '126146-2114611-409138-1113946-611045',
              author: 'Michelle',
              title: 'Vxoq Wmnsuwslx Grbmqbghh Fqo Okgf Awjlq Plctzlrtwo',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 1,
              display_time: '1971-01-14 14:46:56',
              pageviews: 3475
            },
            {
              id: '521126-397911-44021-81111513-1114413',
              author: 'Matthew',
              title: 'Qwsnollcb Ojudljuuqd Oofi Ljvkw Ufnpyfxzps Fykiiqfwu Qpwe Yldvupj',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 2,
              display_time: '1977-03-05 05:15:06',
              pageviews: 4201
            },
            {
              id: '25443-5134127-411030-111510124-1515151310',
              author: 'Patricia',
              title: 'Aalaknxtu Jotn Hluhhep Ymepjkob Lsf Vyssfgzcw Ulshekthk Plxs Mxhlqr',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 2,
              display_time: '2019-10-03 08:49:17',
              pageviews: 3708
            },
            {
              id: '490149-138524-48351-80693-97839',
              author: 'Brian',
              title: 'Ffxll Jtdkpfih Tcxdqng Iykiexe Pkjrhhhvd Hyhf Mofyrgoyp Btymrijzu Govuosh',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 3,
              display_time: '1989-07-12 04:57:20',
              pageviews: 312
            },
            {
              id: '15391015-1428113-431553-814187-14115118',
              author: 'Patricia',
              title: 'Clmsilg Mkrmi Jedvflfas Myuwzogwo Bch Trbanug Ivzqy',
              content:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
              importance: 2,
              display_time: '2021-01-31 09:22:56',
              pageviews: 1403
            }
          ]
        }
      }
      if (res) {
        tableObject.tableList = get(res.data || {}, config?.response.list as string)
        tableObject.total = get(res.data || {}, config?.response?.total as string) || 0
      }
    },
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },
    setColumn: async (columnProps: TableSetPropsType[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },
    getSelections: async () => {
      const table = await getTable()
      return (table?.selections || []) as T[]
    },
    // 与Search组件结合
    setSearchParams: (data: Recordable) => {
      tableObject.currentPage = 1
      tableObject.params = Object.assign(tableObject.params, {
        pageSize: tableObject.pageSize,
        pageIndex: tableObject.currentPage,
        ...data
      })
      methods.getList()
    },
    // 删除数据
    delList: async (ids: string[] | number[], multiple: boolean, message = true) => {
      const tableRef = await getTable()
      if (multiple) {
        if (!tableRef?.selections.length) {
          ElMessage.warning('请选择要删除的数据')
          return
        }
      } else {
        if (!tableObject.currentRow) {
          ElMessage.warning('请选择要删除的数据')
          return
        }
      }
      if (message) {
        ElMessageBox.confirm('是否删除所选中数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await delData(ids)
        })
      } else {
        await delData(ids)
      }
    }
  }

  config?.props && methods.setProps(config.props)

  return {
    register,
    elTableRef,
    tableObject,
    methods
  }
}
