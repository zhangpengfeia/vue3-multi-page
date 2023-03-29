<script setup lang="ts">
import { Descriptions } from '@/components/Descriptions'
import { reactive, unref } from 'vue'
import { Form } from '@/components/Form'
import { ElFormItem, ElInput, ElButton } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'
import { useForm } from '@/hooks/web/useForm'
import { DescriptionsSchema } from '@/types/descriptions'

const { required } = useValidator()

const data = reactive({
  username: 'chenkl',
  nickName: '梦似花落。',
  age: 26,
  phone: '13655971xxxx',
  email: '502431556@qq.com',
  addr: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的地址',
  sex: '男',
  certy: '3505831994xxxxxxxx'
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: 'nickName',
    label: '昵称'
  },
  {
    field: 'phone',
    label: '手机号'
  },
  {
    field: 'email',
    label: '邮箱'
  },
  {
    field: 'addr',
    label: '地址'
  }
])

const form = reactive({
  username: '',
  nickName: '',
  phone: '',
  email: '',
  addr: ''
})

const rules = reactive({
  username: [required()],
  nickName: [required()],
  phone: [required()],
  email: [required()],
  addr: [required()]
})

const { register, elFormRef } = useForm()

const formValidation = () => {
  unref(elFormRef)!.validate((isValid) => {
    console.log(isValid)
  })
}
</script>

<template>
  <Descriptions title="描述" message="1" :data="data" :schema="schema" />

  <Form is-custom :model="form" :rules="rules" @register="register">
    <Descriptions title="面熟" :data="data" :schema="schema" class="mt-20px">
      <template #username>
        <ElFormItem prop="username">
          <ElInput v-model="form.username" />
        </ElFormItem>
      </template>
    </Descriptions>
    <div class="text-center mt-10px">
      <ElButton @click="formValidation"> 表单验证</ElButton>
    </div>
  </Form>
</template>

<style lang="less" scoped>
.is-required--item {
  position: relative;

  &::before {
    margin-right: 4px;
    color: var(--el-color-danger);
    content: '*';
  }
}
</style>
