<template>
  <div class="list">
    <!-- 这里是机票展示列表 -->
    <div class="single">
      <!-- 机票 主要内容 -->
      <div class="title" @click="isDown=!isDown">
        <div>{{item.airline_name}}{{item.flight_no}}</div>
        <div>
          <p>{{item.dep_time}}</p>
          <p>{{item.org_airport_name}}{{item.org_airport_quay}}</p>
        </div>
        <span class="time">2时15分</span>
        <div>
          <p>{{item.arr_time}}</p>
          <p>{{item.dst_airport_name}}{{item.dst_airport_quay}}</p>
        </div>
        <div>
          ￥
          <span class="jiage">{{item.base_price}}</span>起
        </div>
      </div>
      <!-- 机票详情 -->
      <div class="details" v-show="isDown">
        <div class="left">低价推荐</div>
        <div class="right">
          <div class="ticket" v-for="value in item.seat_infos" :key="value.index">
            <div>
              <span>{{value.group_name}}</span>|
              <span>{{value.supplierName}}</span>
            </div>
            <div>
              <span>￥{{value.settle_price}}</span>
              <div>
                <el-button size="mini" type="warning" style="width:100%;">
                  <div
                    @click='$router.push({path:"/air/order",query:{seat_xid:value.seat_xid,id:item.id}})'
                  >选定</div>
                </el-button>
                <p>剩余：45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDown: false
    };
  },
  // 通过父传子的方式获取到机票列表数据
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  computed: {
    //   如果传入的机票列表数据发生改变，就同步改变要渲染的data
    // data() {
    //   return this.ticketData.flights || {};
    // }
  }
};
</script>

<style lang="less" scoped>
.list {
  .single {
    border: 1px solid #ccc;
    margin-bottom: 10px;

    .title {
      display: flex;
      height: 88px;
      align-items: center;
      position: relative;
      .jiage {
        color: orange;
        font-size: 20px;
      }
      .time {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        font-size: 12px;
        color: #666;
      }
      > div {
        text-align: center;
        flex: 1;
        p {
          &:nth-child(1) {
            font-size: 20px;
          }
          &:nth-child(2) {
            font-size: 13px;
            color: #666;
          }
        }
      }
    }
    .details {
      display: flex;
      background-color: #eee;
      padding: 0 20px;
      .left {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 13px;
      }
      .right {
        flex: 5;
        .ticket {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
          border-bottom: 1px solid #ccc;
          > div {
            &:nth-child(1) {
              span {
                font-size: 12px;
                &:nth-child(1) {
                  color: green;
                }
              }
            }
            &:nth-child(2) {
              display: flex;
              align-items: center;

              span {
                transform: translateX(-80px);
                color: orange;
                font-size: 20px;
              }
              p {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}
</style>