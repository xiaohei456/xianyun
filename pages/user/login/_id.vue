<template>
  <div class="login">
    <div class="band"></div>

    <div class="LoginBox">
      <div class="header">
        <span
          v-for='(item,index) in ["登录","注册"]'
          :key="index"
          :class="{active:current===index}"
          @click="current=index"
        >{{item}}</span>
      </div>
      <div class="center">
        <div class="login" v-show="current===0">
          <LoginForm />
        </div>
        <div class="register" v-show="current!==0">
          <RegisterForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入登录跟注册组件
import LoginForm from "@/components/user/LoginForm.vue";
import RegisterForm from "@/components/user/RegisterForm.vue";
export default {
  // 注册组件
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      current: 0
    };
  },
  mounted(){
    //   获取参数1
    var current=this.$route.params.id
    this.current=Number(current)
  }
};
</script>

<style lang='less' scoped>
.login {
  position: relative;
  background-color: #fff;
  .band {
    width: 100%;
    height: 700px;

    background: url("http://127.0.0.1:1337/assets/images/th03.jfif") center
      center;
  }
  .LoginBox {
    position: absolute;
    top: 50%;
    right: 500px;
    transform: translateY(-50%);
     width: 360px;
     background-color: #fff;
  cursor: pointer;
  .header {
    display: flex;
    span {
      flex: 1;
      height: 50px;
      background-color: rgb(240,240,240);
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        border-top: 2px solid orange;
        color: orange;
        background-color: #fff;
      }
    }
  }
  .center {
    background-color: #fff;
    padding: 20px;
  }
  }
}

</style>