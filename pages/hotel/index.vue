<template>
  <div class="hotel bx">
    <!-- key:	06e5e393fbd4f45a92a091aefe6ff8e3 -->
    <!-- 假的面包屑 -->
    <div class='path'>酒店 > 南京市酒店预订</div>
    <!-- 描述 -->
    <div class="describe">
      <Describe :hotelList='currentHotelList' />
    </div>

    <!-- 攻略和地图 -->
    <div class="strategy">
      <Strategy :hotelList='currentHotelList' />
    </div>
    <!-- 酒店列表下拉筛选 -->
    <!-- 酒店列表显示 -->
  </div>
</template>

<script>
// 引入组件
import Describe from "@/components/hotel/describe.vue";
import Strategy from "@/components/hotel/strategy.vue";
export default {
  data() {
    return {
      // 城市id
      city:74,
      // 该城市的酒店列表数据
      hotelsList:[],
      // 显示在该页面的酒店数据
      currentHotelList:[]
    
    };
  },
  mounted() {
  
    // 获取城市id
    // this.city=+this.$route.query.city
    // 发送axios请求数据
    this.$axios.get('/hotels',{params:{city:this.city}})
    .then(res=>{
      this.hotelsList=res.data.data
      this.currentHotelList=res.data.data
    })

  },
  //   注册组件
  components: {
    Describe,Strategy
  }
};
</script>

<style lang="less" scoped>
.hotel{
    .path{
        line-height:60px;
        color:#666;
        font-size:13px;
    }
}
</style>