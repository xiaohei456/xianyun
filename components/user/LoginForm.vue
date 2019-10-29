<template>
  <el-form :model="LoginForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input v-model="LoginForm.username" placeholder='请输入用户名/手机号'></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input v-model="LoginForm.password"  placeholder='请输入密码'></el-input>
    </el-form-item>
    <span class='forget'>忘记密码</span>
    <div style='height:30px'></div>
    <el-form-item>
      <el-button type="primary" @click="submitForm" style='width:100%;'>登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      LoginForm: {
        username: "13192922529",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      // 判断表单的布尔值
      this.$refs.ruleForm.validate(val => {
        // 如果表单验证通过，发起请求
        if(val){
          
          this.$store.dispatch('user/login',this.LoginForm)
          .then(res=>{
            // 登录成功后跳转到主页面
            this.$router.push('/')
          })
        }else{
          this.$message('输入错误')
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.forget{
    float:right;
    font-size:14px;
    color:#0094ff;
}
</style>