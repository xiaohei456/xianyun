<template>
  <div class="air_index">
    <div class="bx">
      <h2 class="air_title">国内机场</h2>
      <div class="air_main">
          <div class="main_left">
<airForm/>
          </div>
          <div class="main_right">
              <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt="">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入飞机票表单组件
import airForm from "@/components/air/jpForm.vue"
export default {
    components:{
        airForm
    }
};
</script>

<style lang="less" scoped>
.air_index{
    .air_title{
        color:orange;
        line-height:60px;
        }
    .air_main{
        display:flex;
        justify-content: space-between;
        .main_left{

        }
    }
}
</style>