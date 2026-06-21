<template>
   <div class="register-container">
       <div style="position: relative; width: 600px; text-align: center">
          <h3 style="font-size: 28px; color: #333;">用户注册</h3>
          <p style="color: #999; font-size: 14px;">请输入您的账户信息</p>
       </div>
       <div style="position: relative; padding: 10px; width: 600px;">
         <el-form
               ref="ruleFormRef"
               style="max-width: 600px; text-align: center"
               :model="ruleForm"
               :rules="rules"
               label-width="auto"
           >
             <el-form-item label="用户名" prop="userNname">
               <el-input v-model="ruleForm.userNname" />
             </el-form-item>
             <el-form-item label="用户头像" prop="avatar">
               <el-input v-model="ruleForm.avatar" type="textarea" />
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="submitForm(ruleFormRef)">
                 提交
               </el-button>
               <el-button @click="resetForm(ruleFormRef)">重置</el-button>
             </el-form-item>
         </el-form>
       </div>
   </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const ruleFormRef = ref()
const ruleForm = ref({
  userName: '',
  avatar: '',
})

const rules = reactive({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度需要3~5个字符', trigger: 'blur' },
  ],
  avatar: [
    { message: '请输入头像地址', trigger: 'blur' },
    { min: 0, max: 200, message: '头像地址最大不能超过200个字符', trigger: 'blur' },
  ],
})

const submitForm = async (formEl) => {

  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped>
.register-container {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: auto;
  color: bisque;
}
</style>