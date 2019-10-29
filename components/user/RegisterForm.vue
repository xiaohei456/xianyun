<template>
  <el-form :model="RegisterForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input v-model="RegisterForm.username" placeholder="请输入用户名/手机号"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input placeholder="验证码" v-model="RegisterForm.captcha">
        <template slot="append">
          <div @click="verify">发送验证码</div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="nickname">
      <el-input v-model="RegisterForm.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="RegisterForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="password2">
      <el-input v-model="RegisterForm.password2" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm" style="width:100%;">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== this.RegisterForm.password) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      RegisterForm: {
        username: "13192922529",
        password: "123456",
        nickname: "11",
        captcha: "",
        password2: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      // 判断表单的布尔值
      this.$refs.ruleForm.validate(val => {
        if (val) {
          var { password2, ...form } = this.RegisterForm;
          console.log(form);
          // 发送请求注册用户
          this.$axios.post("/accounts/register", form).then(res => {
            console.log(res);
            if (res.status === 200) {
              if (res.data.token) {
                this.$message("注册成功，去登陆吧。");
                setTimeout(() => {
                  this.$router.push("/user/login/0");
                }, 1000);
              }
            } else {
              this.$message.error("输入错误");
            }
          });
        } else {
          // 表单验证错误
          this.$message.error("表单验证错误");
        }
      });
    },
    // 获取手机验证码
    verify() {
      // 首先判断手机格式
      let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (reg.test(this.RegisterForm.username)) {
        //  发送axios请求
        this.$axios
          .post("/captchas", { tel: this.RegisterForm.username })
          .then(res => {
            this.RegisterForm.captcha = res.data.code;
            this.$message("验个屁！！！");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //  手机格式错误
        this.$message.error("请输入正确的手机号");
      }
    }
  }
};
</script>

<style>
</style>