<template>
  <div class="post bx">
      <!-- 攻略主页 -->
      <div class="recommend">
          <Nav/>
          <div class='city'>推荐城市</div>
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt="">
          <input type="hidden" v-model="city" >

      </div>
      <div class="main">
          <!-- 搜索 -->
          <div class="search">
              <input type="text" v-model='inpvalue' @blur='inpBlur'>
              <i class="el-icon-zoom-out fdj"></i>
              <p><span>推荐：</span><span>广州</span><span>上海</span><span>北京</span></p>
          </div>
          <!-- 推荐攻略 -->
          <div class="list">
               <postList :postList='postList' />

          </div>
         
          
      </div>

  </div>
</template>

<script>
// 引入组件
import Nav from "@/components/post/nav.vue"
import postList from "@/components/post/postList.vue"
export default {
    data(){
        return {
            postList:[],
            inpvalue:this.$route.query.city
    
        }

    },
    components:{
        Nav,postList
    },
    computed:{
        city(){
            // 获取数据
            // 获取参数
            let city=this.$route.query.city
            // 发送axios
            this.$axios.get('/posts',{params:{city}})
            .then(res=>{
                this.postList=res.data.data
                console.log(this.postList)
            })
            return this.$route.query.city
        }
    },
    methods: {
        
    inpBlur(){
        this.$router.push({path:'/post',query:{city:this.inpvalue}})
    }
    }

}
</script>

<style lang="less" scoped>
.post{
    display:flex;
    padding-top:20px;

    .recommend{
        width:300px;
        .city{
            line-height:30px;
            width:260px;
            border-bottom:1px solid #ccc;
            margin:10px 0;
        }
        img{
            width:260px;
        }

    }
    .main{
        flex:1;
        .search{
            width:100%;
            position: relative;
            input{
                width:100%;
                outline:none;
                border: none;
                border:3px solid orange;
                height:34px;
                font-size:18px;
                text-indent: 1em;
            }
            .fdj{
                font-size:30px;
                color:orange;
                position: absolute;
                right:16px;
                top:5px;
            }
            p{
                span{
                    padding:12px 3px;
                    font-size:12px;
                    color:#666;
        
                }
            }
        }
    }

}
</style>