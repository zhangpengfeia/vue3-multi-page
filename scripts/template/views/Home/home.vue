<script setup lang="ts">
import { ref } from 'vue'
import { loginApi } from '../../interface/login'
// 调接口，在vite.config.ts proxy 切换ip和端口
let testData = ref({})
const getTestData = async () => {
  const res = await loginApi({
    password: '123456',
    username: 'admin'
  })
  testData.value = res
}
getTestData()
</script>

<template>
  <div>
    主页 <br />
    {{ testData }}
  </div>
</template>
