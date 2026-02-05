<template>
  <div><el-button>发送全局通知</el-button></div>
</template>

<script setup lang="ts">
  import { eventBus } from '@/eventBus/eventBus'
  import { onMounted } from 'vue'

  onMounted(() => {
    console.log('你好')
    eventBus.on('global-notification', (msg) => {
      console.log(msg, 'eventbus成功了')
    })
  })
</script>
