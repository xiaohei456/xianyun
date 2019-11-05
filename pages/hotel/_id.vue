<template>
  <div class="details bx">
    <!-- 酒店详情页面 -->
    <!-- 一条真的面包屑 -->
    <div class="path">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">南京酒店</el-breadcrumb-item>
        <el-breadcrumb-item>好来阁商务酒店</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 宾馆招牌 -->
    <div class="signature">
      <h3>{{hoteldata.name}}</h3>
      <p>{{hoteldata.alias}}</p>
      <div>
        <i class="el-icon-location"></i>
        {{hoteldata.address}}
      </div>
    </div>
    <!-- 图片 -->
    <div class="photo">
      <div class="left">
        <div class="left_img">
          <!-- <img :src="hoteldata.photos" alt /> -->
          
          <img src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt="">
        </div>
      </div>
      <div class="right">
        <div v-for="item in hoteldata.pics" :key="item.id" class="right_img">
          <!-- <img :src="$axios.defaults.baseURL+item.url" alt /> -->
          
          <img src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt="">
        </div>
      </div>
    </div>
    <!-- 价格来源 -->
    <div class="priceList">
      <div class="theader">
        <span>价格来源</span>
        <span>低价房型</span>
        <span>最低价格</span>
      </div>
      <div class="tbody" v-for='(item,index) in hoteldata.products' :key='index' @click='href'>
        <span>{{item.name}}</span>
        <span>{{item.bestType}}</span>
        <span><span class="price">￥{{item.price}}</span>起</span>
      </div>
    </div>
    <!-- 地图 -->
    <div class="mapbox">
      <Map/>
    </div>
    <!-- 基本信息 -->
    <div class="info">
      <!-- 基本信息 -->
      <div>
        <div class="left">基本信息</div>
        <div class="right">
          <span>入住时间： 14:00之后</span>
          <span>离店时间： 12:00之前</span>
          <span>2015年开业 / 2015年装修</span>
          <span>酒店规模： 148间客房</span>
        </div>
      </div>
      <!-- 主要设施 -->
      <div>
        <div class="left">主要设施</div>
        <div class="right">
          <span>外币兑换服务</span>
          <span>电梯</span>
          <span>洗衣服务</span>
          <span>热水壶</span>
        </div>
      </div>
      <!-- 停车服务 -->
      <div>
        <div class="left">停车服务</div>
        <div class="right">-</div>
      </div>
      <!-- 品牌信息 -->
      <div>
        <div class="left">品牌信息</div>
        <div class="right">-</div>
      </div>

    </div>
    <!-- 评论 -->
    <div class="comments">
      <div class="title">0条真实用户评论</div>
      <div class="main">
     
        <img src="@/assets/11.jpg" alt="" style='width:700px'>

      </div>
    </div>

  </div>
</template>

<script>
// 引入组件
import Map from "@/components/hotel/Map.vue"
export default {
  data() {
    return {
      // 酒店详情
      hoteldata: {
      }
    };
  },
  mounted() {
    // 获取参数酒店id
    const id = +this.$route.params.id;
    
    // 获取酒店数据
    // 发送axios请求
    this.$axios.get("/hotels", { params: { id} }).then(res => {
      // console.log(res)
      this.hoteldata = res.data.data[0];
      console.log(this.hoteldata);
      // debugger
    });
  },
  methods: {
    href(){
      location.href='https://hotels.ctrip.com/hotel/694679.html'
    }
  },
  components:{
    Map
  }
};
</script>

<style lang="less" scoped>
img{
  width:100%;
  height:100%;
}
.details {
  .path {
    padding: 20px 0;
  }
  .signature {
    h3 {
      font-size: 26px;
      font-weight: 300;
    }
    p {
      font-size: 10px;
      color: #666;
      padding: 5px 0;
    }
    div {
      color: #666;
      font-size: 14px;
    }
  }
  .photo{
    display:flex;
    padding:30px 0;
   
    .left{
      flex:2;
      padding:10px 10px 0 0;
      .left_img{
        
    height:360px;
      }

    }
    .right{
      flex:1;
      .right_img{
        width:50%;
        padding:10px;
        box-sizing: border-box;
        display:inline-block;
        height:33.33%;

      }

    }
  }
  .priceList{
    >div{
      line-height:46px;
      border-bottom:1px solid #ccc;
      display:flex;
      padding:0 50px 0 10px;
      cursor: pointer;
     
      >span{
        &:nth-child(1){
          flex:1;
        }
        &:nth-child(2){
          flex:1;
        }
        &:nth-child(3){
          width:100px;
        }
      }


    }
    .theader{
      color:#777;
      font-size:14px;
      font-weight:600;
    }
    .tbody{
      color:#999;
      font-size:14px;
      .price{
        color:orange;
        padding-right:10px;
      }

       &:hover{
        background-color: rgb(245,247,250);
      }
    }
  }
  .mapbox{
    height:360px;;
    margin:30px 0;
  }
  .info{
    >div{
      display: flex;
      line-height:60px;
      font-size:14px;
      border-bottom:1px solid #ccc;
      .left{
        width:180px;

      }
      .right{
        flex:1;
        color:#666;
      }
      &:nth-child(1){
        .right{
          display:flex;
          justify-content: space-around;
        }

      }
      &:nth-child(2){
        .right{
          span{
            padding:4px 10px;
            background-color: #ddd;
            margin:0 3px;
            border-radius:4px;
          }
        }
      }
    }
  }
  .comments{
    padding:20px 0;
    .title{
      padding:20px 0;
      font-size:14px;



    }
  }

}
</style>