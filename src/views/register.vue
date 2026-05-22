<template>
   <div class="register-container">
     <h1>注册页面</h1>
   </div>
  <div>{{ state.count }}</div>
  <div>{{ state.name }}</div>
</template>

<script setup>
import {reactive} from 'vue'
const state = reactive({
  count: 0,
  name: 'John'
})
state.count = 10
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("@/assets/images/login_bg.png") no-repeat center;
}
</style>