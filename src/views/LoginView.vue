<template>
  <div class="login">
    <div class="form-cls">
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
  >
    <h2>后台管理系统</h2>
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
      <el-button @click="resetForm()">Reset</el-button>
    </el-form-item>
  </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { LoginData } from "@/type/login";
import { login } from "@/request/api";
import { FormInstance, ElMessage } from 'element-plus';
import { defineComponent, reactive, toRefs, ref } from 'vue';
import router from "@/router";

export default defineComponent({
  setup() {
    const data = reactive(new LoginData())

    const rules = {
      username: [
        {
          required: true,  //是否必须字段
          message: "请输入用户名",   // 触发的提示信息
          trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3,   // 最小字符书
          max: 5,   // 最大字符数
          message: "用户名长度需要在3-5个字符之间",  // 触发的提示信息
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,  //是否必须字段
          message: "请输入密码",   // 触发的提示信息
          trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3,   // 最小字符书
          max: 6,   // 最大字符数
          message: "密码长度需要在3-5个字符之间",  // 触发的提示信息
          trigger: "blur"
        }
      ]
    }

    const ruleFormRef = ref<FormInstance>()

    const resetForm = () => {
      data.ruleForm.username = ""
      data.ruleForm.password = ""
    }

    const submitForm = (formEl: FormInstance | undefined) => {
        if(!formEl) return
        formEl.validate((valid) => {
          if(valid) {
            login(data.ruleForm).then(res => {
              console.log(res)
              localStorage.setItem("token", res.data.token)
              ElMessage({ type: 'success', message: '登录成功！'})
              router.push('/')
            }).catch( e => {
              ElMessage({ type: 'warning', message: '登录失败，用户名或密码错误' })
            })
        }
      })
    }

    return { 
      ...toRefs(data),
      rules,
      resetForm,
      submitForm,
      ruleFormRef
    };
  }
})
</script>

<style scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .form-cls {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 40px;
    width: 400px;
    padding: 20px;
    border-radius: 4px;
  }
  
  h2{
    text-align: center;
    margin-bottom: 20px;
  }
</style>