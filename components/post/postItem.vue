<template>
  <div class="post_item">
    <!-- 单个文章显示 -->
    <div>
      <div class="title">{{postItem.title}}</div>
      <div
        class="content"
      >{{postItem.summary}}</div>
      <div class="imges">
          <img :src="item" alt="" v-for='(item,index) in postItem.images.slice(0,3)' :key='index'>
         </div>
      
      <div class="footer">
          <div class="left">
              <span>
                  <i class="el-icon-location"></i>
                  {{postItem.cityName}}  by</span>
              <span>
                  <img :src="$axios.defaults.baseURL+postItem.account.defaultAvatar" alt="" style="width:18px;">
                  {{postItem.account.nickname}}</span>
              <span>
                  <i class="el-icon-view"></i>
                  {{postItem.watch}}</span>
          </div>
          <div class="right">
              <span>61赞</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        postItem:{
            type:Object,
            default:{}
        }
    }
};
</script>

<style lang="less" scoped>
.post_item{
    cursor: pointer;
    >div{
        .title{
            line-height:64px;
            font-size:20px;
            &:hover{
                color:orange;
            }

        }
        .content{
            font-size:14px;
            line-height:22px;
            color:#666;
        }
        .imges{
            display:flex;
            justify-content: space-between;
            img{
                width: 220px;
                height:150px;
              
            }
        }
        .footer{
            display:flex;
            justify-content: space-between;
            padding:20px 0;
            border-bottom:1px solid #ccc;
            .left{
                font-size: 13px;
                color:#999;
                display:flex;
                align-items:center;
                span:nth-child(2){
                    color:orange;
                    display:flex;
                    align-items: center;
                }
                span{
                    padding:0 5px;
                }
            }
            .right{
                font-size:18px;
                color:orange;

            }
        }

    }
}
</style>