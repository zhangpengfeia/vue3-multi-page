<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { IDomEditor } from '@wangeditor/editor'
import { FormSchema } from '@/types/form'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<any>>,
    default: () => null
  }
})

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'author',
    label: '作者',
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'display_time',
    label: '时间',
    component: 'DatePicker',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'importance',
    label: '状态',
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: '重要',
          value: 3
        },
        {
          label: '良好',
          value: 2
        },
        {
          label: '一般',
          value: 1
        }
      ]
    }
  },
  {
    field: 'pageviews',
    label: '数量',
    component: 'InputNumber',
    value: 0,
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'content',
    component: 'Editor',
    colProps: {
      span: 24
    },
    componentProps: {
      defaultHtml: '',
      onChange: (edit: IDomEditor) => {
        const { setValues } = methods
        setValues({
          content: edit.getHtml()
        })
      }
    },
    label: '内容'
  }
])

const rules = reactive({
  title: [required()],
  author: [required()],
  importance: [required()],
  pageviews: [required()],
  display_time: [required()],
  content: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues, setSchema } = methods
    setValues(currentRow)
    setSchema([
      {
        field: 'content',
        path: 'componentProps.defaultHtml',
        value: currentRow.content
      }
    ])
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>

<template>
  <Form :rules="rules" @register="register" />
</template>
