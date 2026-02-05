<template>
  <div>
    <div class="login">
      <el-form
        :model="form"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <div>{{ myCom }}</div>
        <div>{{ form.username }}</div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { loginCheck, laterLogin } from '@/api/system/login'
  import { routerToByName } from '@/utils/route/route'
  import { reactive, onMounted, computed, effect } from 'vue'
  const form = reactive({
    username: '111',
    password: '222',
  })

  const myCom = computed(() => {
    return form.username + '哈哈'
  })

  const login = () => {
    console.log(form)
    loginCheck(form).then((res) => {
      const { token } = res.data
      localStorage.setItem('token', token)
    })
  }

  onMounted(() => {
    laterLogin().then(
      (res) => {
        routerToByName('home')
        console.log(res)
      },
      (err) => {
        console.log(err)
      },
    )
  })

  effect(() => {
    console.log('effect 监听到 username:', form.username)
  })
</script>
2
