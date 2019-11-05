<template>
  <div class="nav">
      <ul class='yeye'>
          <li v-for='(item,index) in options' :key='index'  class="laozi">
              <!-- 显示的内容 -->
              <div>
                  <span>{{item.type}}</span>
                  <span class='right'><i class="el-icon-arrow-right"></i></span>
              </div>
              <!-- 悬停显示的内容 -->
                  <ul class='erzi' style='display:none' >
                      <li v-for='(item2,index2) in item.children' :key='index2' @click="$router.push({path:'/post',query:{city:item2.city}})" >
                          <i>{{index2}}</i>
                          <span>{{item2.city}}</span>
                          <b>{{item2.desc}}</b>

                      </li>
                  </ul>
              
          </li>
      </ul>

  </div>
</template>

<script>
export default {
    data(){
        return{
            options:[]
        }
    },
    mounted () {
        // 获取下拉选项数据
        this.$axios.get('/posts/cities')
        .then(res=>{
            this.options=res.data.data
            // console.log(this.options)
        })
    }

}
</script>

<style lang="less" scoped>
.nav{
    .yeye{
        width:260px;
        border-bottom:1px solid #ccc;
        position:relative;
               cursor: pointer;
        .laozi{
            height:40px;
            border:1px solid #ccc;
            border-bottom:none;
            line-height:40px;
            padding:0 20px;
            font-size:14px;
            font-weight:300;
           >div{
                display:flex;
            justify-content: space-between;
           }
        &:hover{
            color:orange;
            .erzi{
                display:block !important;
                position: absolute;
                z-index: 2;
                width:340px;
                background-color: #fff;
                top:0;
                right:-340px;
                border:1px solid  #ccc;
                line-height:50px;
                i{
                    font-size:22px;
                    color:orange;
                    padding:0 5px;
                }
                span{
                    font-size:14px;
                    color:orange;
                     padding:0 5px;
                      &:hover{
                    text-decoration: underline;
                }

                }
                b{
                    color:#666;
                    font-size:13px;
                    font-weight:300;
                     padding:0 5px;
                      &:hover{
                    text-decoration: underline;
                }
                }
            }
            .right{
                position:relative;
                &::after{
                    content: '';
                    position:absolute;
                    z-index: 6;
                    width:1px;
                    height:40px;
                    background-color: #fff;
                    top:0px;
                    right:-20px;
                    

                }
            }
        }

    }
    }

}
</style>