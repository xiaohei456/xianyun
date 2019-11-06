<template>
  <!-- 文章列表 -->
  <div class="postList">
      <div class="title">
          <h3>推荐攻略</h3>
          <div class="btn">
              <el-button type="primary"><div @click='$router.push("/post/create")'>写游记</div></el-button>
          </div>
      </div>
      <div class="main">
          <postItem v-for='(item,index) in postList' :key='index' :postItem='item' />
      </div>
      <!-- 分页 -->
        <div class="pages">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageindex"
      :page-sizes="[1, 2, 6, 8]"
      :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
// 引入组件
import postItem from "@/components/post/postItem.vue"
export default {
    data(){
return{
    pageindex:1,
    pagesize:1,
    // 当前页面列表数据
    currentData:[],
    

    }
    },
    components:{
        postItem
    },
    props:{
        postList:{
            type:Array,
            default:[]
        },
        total:{
            type:Number,
            default:0
        }
    },
    methods: {
        handleCurrentChange(v){
            this.pageindex=v
            // this.getCurrentData()
            this.$emit('getCurrentData',{pagesize:this.pagesize,pageindex:this.pageindex})

        },
        handleSizeChange(v){
            this.pagesize=v
            // this.getCurrentData()
            this.$emit('getCurrentData',{pagesize:this.pagesize,pageindex:this.pageindex})
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