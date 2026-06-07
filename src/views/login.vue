<template>
  <div class="login-container">
    <div style="display: flex; width: 500px; background-color: bisque; background: rgba(255,255,255,0.65);">
      <div style="flex: 1; padding: 48px; display: flex; flex-direction: column; justify-content: center">
        <div style="text-align: center">
          <h3 style="font-size: 28px; color: #333">登录</h3>
          <p style="color: #999; font-size: 14px;">请输入您的登录信息</p>
        </div>
        <el-form :model="loginForm" ref="loginRef" style="text-align: center;" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName" size="large" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" size="large" placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item style="display: flex; width: 100%;">
            <el-button type="primary" style="width: 100%;" :loading="loading" @click="handleLogin">登录</el-button>
          </el-form-item>
          <div style="color: #666; text-align: center">
            还没有账户?
            <router-link to="/register" style="color: #409eff; margin-left: 5px; text-decoration: none">
              立即注册
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import useUserStore from "@/stores/modules/userStore.js"

// 表单实例
const loginRef = ref()

// 表单数据
const loginForm = ref({
  userName: null,
  password: null
})

const loading = ref(false)

// 表单字段参数校验
const rules = ref({
  userName: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 8, message: '长度必须在3~8之间', trigger: 'blur'}
  ],
})

// 用户状态管理
const userStore = useUserStore()
const router = useRouter()

// 处理登录事件
const handleLogin = () => {
  loginRef.value.validate(valid => {
    if (valid) {
      // 打开加载状态
      loading.value = true

      // 调用登录方法
      // console.log(loginForm.value,'看看用户输入的用户名和密码')
      userStore.login(loginForm.value).then(resp => {
        const redirectPath = '/'
        router.push(redirectPath)
      }).catch(() => {
        loading.value = false
      })
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/login_bg.png") no-repeat center;
  background-size: cover;
  position: relative;
}
</style>