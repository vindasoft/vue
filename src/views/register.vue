<template>
   <div class="register-container">
       <div style="position: relative; width: 600px; text-align: center">
          <h3 style="font-size: 28px; color: #333">用户注册</h3>
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
             <el-form-item label="Activity name" prop="userNname">
               <el-input v-model="ruleForm.userNname" />
             </el-form-item>
             <el-form-item label="Activity form" prop="remark">
               <el-input v-model="ruleForm.remark" type="textarea" />
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="submitForm(ruleFormRef)">
                 Create
               </el-button>
               <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
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
  remark: '',
})

const rules = reactive({
  userName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  remark: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
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
  position: relative;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: auto;
  color: bisque;
}
</style>