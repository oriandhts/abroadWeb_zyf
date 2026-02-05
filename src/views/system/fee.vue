<template>
  <div>this is the provide data from privider{{ message }}</div>
</template>

<script lang="ts" setup>
  import { inject, onMounted, ref } from 'vue'
  import { eventBus } from '@/eventBus/eventBus'

  const message = inject('message')
  const message_mitt = ref('等待消息...')
  onMounted(() => {
    console.log('你好')
    eventBus.on('global-notification', (msg) => {
      message_mitt.value = msg
      console.log(msg, 'eventbus成功了')
    })
  })
</script>
