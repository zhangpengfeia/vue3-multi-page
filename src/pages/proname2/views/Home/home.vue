<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import { loginApi } from '../../interface/login'
// 调接口，在vite.config.ts proxy 切换ip和端口
let testData = ref({})
const flagLoading = ref(false)
const getTestData = async () => {
  flagLoading.value = true
  const res = await loginApi({
    password: '123456',
    username: 'admin'
  })
  testData.value = res
  if (res) {
    ElNotification({
      title: 'Success',
      message: '请求成功',
      type: 'success'
    })
  }
  setTimeout(() => {
    flagLoading.value = false
  }, 3000)
}
</script>

<template>
  <div>
    主页
    <br />
    <ElButton type="primary" :loading="flagLoading" @click="getTestData()"
      >点击发送请求测试接口</ElButton
    >
    <br />
    <div class="w-500px min-h-50px">
      {{ testData }}
    </div>
  </div>
</template>
