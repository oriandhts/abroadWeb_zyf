<template>
  <div>父组件传递下来的props{{ programme }}</div>
  <el-button @click="emit('update-programme', 'Australia')"></el-button>\
  <!--  -->
  <div>发送请求</div>
  <el-button @click="notifyAll()"></el-button>
  <fee />
</template>

<script setup lang="ts"></script>
