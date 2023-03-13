<script lang="ts" setup></script>

<template>
  <div
    class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:(py-4 flex items-center space-y-0 space-x-6)"
  >
    <!-- <img
      class="block mx-auto h-24 rounded-full sm:(mx-0 flex-shrink-0)"
      src="/img/erin-lindford.jpg"
      alt="Woman's Face"
    /> -->
    <div class="text-center space-y-2 sm:text-left">
      <div class="space-y-0.5">
        <p class="text-lg text-black font-semibold">Erin Lindford</p>
        <p class="text-gray-500 font-medium">产品经理</p>
      </div>
      <button
        class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:(text-white bg-purple-600 border-transparent) focus:(outline-none ring-2 ring-purple-600 ring-offset-2)"
      >
        消息
      </button>
    </div>
  </div>

  <button
    w:bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
    w:text="sm white"
    w:font="mono light"
    w:p="y-2 x-4"
    w:border="2 rounded blue-200"
  >
    Button
  </button>
  <div class="text-28px !text-purple-600 text-blue-600 p-110px"> important class </div>
</template>

<style lang="less" scoped></style>
