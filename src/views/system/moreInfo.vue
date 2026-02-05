<template>
  <div>父组件传递下来的props{{ programme }}</div>
  <el-button @click="emit('update-programme', 'Australia')"></el-button>\
  <!--  -->
  <div>发送请求</div>
  <el-button @click="notifyAll()"></el-button>
  <fee />
</template>

<script setup lang="ts">
  import fee from './fee.vue'
  defineProps(['programme'])
  const emit = defineEmits(['update-programme'])

  import { eventBus } from '@/eventBus/eventBus'

  function notifyAll() {
    eventBus.emit('global-notification', 'Hello from Component A')
    console.log('成功发送了嘛')
  }
</script>
