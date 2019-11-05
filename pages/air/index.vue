<template>
  <div class="air_index">
    <div class="bx">
      <!-- 标题部分 -->
      <h3 class="air_title">国内机场</h3>
      <!-- 主要内容部分 -->
      <div class="air_main">
        <div class="main_left">
          <airForm />
        </div>
        <div class="main_right">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </div>
      </div>
      <!-- 信息 -->
      <div class="info">
        <span>
          <i class="el-icon-medal-1"></i>
          <span>100%航协认证</span>
        </span>
        <span>
          <i class="el-icon-circle-check"></i>
          <span>出行认证</span>
        </span>
        <span>
          <i class="el-icon-phone"></i>
          <span>7x24小时服务</span>
        </span>
      </div>
      <!-- 特价机票区 -->
      <div class="tejia">
        <h3>
          <span>特价机票</span>
        </h3>
        <div class="tejia_main">
          <div class="item">
            <div class="img"  @click='gtos'>
              <div class="ticket">
                <span>广州-上海</span>
                <i>￥688</i>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="img"  @click='gtos'>
              <div class="ticket">
                <span>广州-上海</span>
                <i>￥688</i>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="img"  @click='gtos'>
              <div class="ticket">
                <span>广州-上海</span>
                <i>￥688</i>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="img"  @click='gtos'>
              <div class="ticket">
                <span>广州-上海</span>
                <i>￥688</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入飞机票表单组件
import airForm from "@/components/air/jpForm.vue";
export default {
  components: {
    airForm
  },
  methods: {
      gtos(){
          location.href='http://127.0.0.1:3000/air/ticket?departCity=%E5%B9%BF%E5%B7%9E&departCode=CAN&departDate=2019-11-08&destCity=%E4%B8%8A%E6%B5%B7&destCode=SHA'
      }
  }
};
</script>

<style lang="less" scoped>
h3 {
  color: #0094ff;
  font-size: 22px;
  font-weight: 300;
}
.air_index {
  .air_title {
    color: orange;
    line-height: 60px;
  }
  .air_main {
    display: flex;
    justify-content: space-between;
    .main_left {
    }
  }
  .info {
    margin: 10px 0;
    display: flex;
    height: 56px;
    border: 1px solid #ccc;
    background-color: #eee;
    align-items: center;
    font-weight: 100;
    > span {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        color: #0094ff;
        font-size: 24px;
      }
      &:nth-child(2) {
        i {
          color: green;
        }
      }
    }
  }
  .tejia {
    .tejia_main {
      display: flex;
      height: 180px;
      width: 100%;
      border: 1px solid #ccc;
      margin: 10px 0;
      padding: 0 10px;
      box-sizing: border-box;
      .item {
        flex: 1;
        padding: 20px 10px;
        .img {
          width: 100%;
          height: 100%;
          position: relative;
          background-image: url("http://127.0.0.1:1337/assets/images/th02.jfif");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          .ticket {
              box-sizing:border-box;
              width:100%;
            position: absolute;
            padding: 8px;
            left: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: space-between;
            color:#eee;
          }
        }
      }
    }
  }
}
</style>