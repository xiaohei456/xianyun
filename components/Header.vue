<template>
  <div>
    <div class="header">
      <div class="bx">
        <div class="left">
          <h1>
            <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
          </h1>
          <nuxt-link
            :to="item.path"
            v-for="(item,index) in linkList"
            :key="item.id"
            :class="{active:linkIndex===index}"
            
          ><div @click='linkIndex=index'>{{item.name}}</div></nuxt-link>
        </div>
        <div class='right'  v-if='userInfo.token'>
         
          <el-dropdown>
  <div >
     <span>
            <img :src="$axios.defaults.baseURL+userInfo.user.defaultAvatar" alt="" style='width:20px'>
          </span>
          <span>{{userInfo.user.username}}</span><i class="el-icon-arrow-down el-icon--right"></i>
  </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人中心</el-dropdown-item>
    <el-dropdown-item><div @click='outLogin'>退出</div></el-dropdown-item>
    
  </el-dropdown-menu>
</el-dropdown>
        </div>
        <div class="right" v-else>
          <nuxt-link to="/">消息</nuxt-link>
          <nuxt-link to="/user/login/0">登录 / 注册</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkList: [
        {
          id: 1,
          name: "首页",
          path: "/"
        },
        { id: 2, name: "旅游攻略", path: "/" },
        {
          id: 3,
          name: "酒店",
          path: "/"
        },
        {
          id: 4,
          name: "国内机票",
          path: "/air"
        }
      ],
      linkIndex: ''
    };
  },
  mounted(){
    // 获取本地储存
    var info=localStorage.getItem('xianyun_userInfo')
    if(info){
      // 把值赋值给user仓库
      this.$store.commit('user/editInfo',JSON.parse(info))
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.user.userInfo
    }

  },
  methods: {
    outLogin(){
      // 清除本地存储的·数据
      localStorage.removeItem('xianyun_user')
      // 清除仓库的数据
      this.$store.commit('user/editInfo',{token:"",user:{}})
      // 提示退出登录成功
    this.$message('退出成功')
      // 再跳转到登录页面，显示登录
      setTimeout(() => {
      this.$router.push('/user/login/0')
        
      }, 1000);
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  border-bottom:1px solid #ddd;
  box-shadow: 0 0 5px #ddd;
  .bx {
    display: flex;
    justify-content: space-between;
height:60px;
    .left {
      display: flex;
      align-items: center;
      h1{
        margin-right:20px;
        img{
          width:170px;
        }
      }
      a{
        height:100%;
        position:relative;
        div{
          padding:0 20px;
          height:100%;
          display: flex;
      align-items: center;
     &:hover{
       position:relative;
        color:#0094ff;
      &::before{
        position:absolute;
        content:'';
        width:100%;
        height:3px;
        bottom:0;
        left:0;
        background-color: #0094ff;

      }
     }
        }
      
        &.active{
          background-color: #0094ff;
          div{
          color:#fff !important;

          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      
      img{
        vertical-align:text-bottom;
      }
      a{
        font-size:14px;
        margin:0 10px;
      }
      
    }
    
  }
}
</style>