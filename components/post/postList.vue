<template>
  <!-- 文章列表 -->
  <div class="postList">
      <div class="title">
          <h3>推荐攻略</h3>
          <div class="btn">
              <el-button type="primary"><div>写游记</div></el-button>
          </div>
      </div>
      <div class="main">
          <postItem v-for='(item,index) in postList' :key='index' :postItem='item' />
      </div>
  </div>
</template>

<script>
// 引入组件
import postItem from "@/components/post/postItem.vue"
export default {
    components:{
        postItem
    },
    props:{
        postList:{
            type:Array,
            default:[]
        }
    }

}
</script>

<style lang="less" scoped>
.postList{
    .title{
        display:flex;
        justify-content: space-between;
        padding-top:20px;
        border-bottom:1px solid #ccc;
        h3{
            font-size: 20px;
            font-weight:300;
            color:orange;
            border-bottom:2px solid orange;
            display:flex;
            align-items: center;

        }
        .btn{
            padding-bottom:10px;
        }
    }
}

</style>