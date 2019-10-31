<template>
  <div class="ticket bx">
    <!-- 机票主要内容部分 -->
    <div class="main">
      <!-- 机票头部筛选部分 -->
      <div class="top">
        <filterTicket :ticketData="ticketData" />
      </div>
      <!-- 机票导航栏 -->
      <div class="nav">
        <span>航空信息</span>
        <span>起飞时间</span>
        <span>达到时间</span>
        <span>价格</span>
      </div>
      <!-- 机票列表详情 -->
      <div class="list">
        <!-- 循环当前页的机票列表 -->
        <ListTicket :item="item" v-for="item in currentData" :key="item.id" />
      </div>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div class="kefu">
      <!-- 右边客服跟历史查询部分 -->
      <div class="tel">
        <div>
          <span>
            <i class="el-icon-medal-1"></i>
            <span>航标认证</span>
          </span>
          <span>
            <i class="el-icon-circle-check"></i>
            <span>出行保证</span>
          </span>
          <span>
            <i class="el-icon-phone"></i>
            <span>7x24</span>
          </span>
        </div>
        <p>免费客服电话：4006345678转2</p>
      </div>
      <div class="history">
        <h3>历史查询</h3>
        <ul>
          <li>
            <div class="info">
              <p>天津-天水</p>
              <span>2019-13-32</span>
            </div>
            <div class="btn">
              <el-button type="warning" size="mini">选择</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件history

// 筛选机票的1下拉选项
import filterTicket from "@/components/air/filterTicket.vue";
// 引入机票列表组件
import ListTicket from "@/components/air/listTicket.vue";
export default {
  data() {
    return {
      // 机票详情数据
      ticketData: {},
      // 当前页面要显示的机票列表数据
      currentData: {},
      // 机票总数量
      total: 0,
      // 当前页码
      pageIndex: 1,
      // 每一页的容量
      pageSize: 10
    };
  },
  mounted() {
    // 组件挂载后，通过参数获取相应的飞机票数据
    // 第一次获取机票数据
    this.getData(true);
  },
  // 注册组件
  components: {
    filterTicket,
    ListTicket
  },
  methods: {
    // 获取机票列表数据
    getData(isFirst) {
      // 判断是否是第一次请求数据
      if (isFirst) {
        // 获取参数
        var form = this.$route.query;
        // 获取机票
        this.$axios.get("/airs", { params: form }).then(res => {
          // 所有的机票列表数据
          this.ticketData = res.data;
          // 所有的机票总量
          this.total = res.data.total;
          // 当前页面需要展示的数据
          // 通过页码跟页容量获取到当前页面所需要的的机票列表数据
          // 取（当前页码-1）*页容量————当前页码*页容量
          this.currentData = this.ticketData.flights.slice(
            (this.pageIndex - 1) * this.pageSize,
            this.pageIndex * this.pageSize
          );
          // console.log(this.currentData)
          // console.log(this.ticketData)
        });
      } else {
        // 如果不是第一次请求数据了，那么本地已经有了数据，就不用再发送axios取请求数据了
        // 需要展示在当前页面的机票列表数据是
        this.currentData = this.ticketData.flights.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        );
      }
    },
    handleSizeChange(value) {
      // 页容量变化触发事件
      // 把页容量改变
      this.pageSize = value;
      // 获取当前页面的新数据列表
      this.getData();
    },
    handleCurrentChange(value) {
      // 页码变化触发事件
      // 把当前页码改变
      this.pageIndex = value;
      // 获取到当前页面需要展示的数据列表
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.ticket {
  display: flex;
  padding-top: 20px;
  .main {
    flex: 3;
    .nav {
      display: flex;
      height: 30px;
      background-color: rgb(240, 240, 240);
      border: 1px solid #ccc;
      align-items: center;
      text-align: center;
      justify-content: space-around;
      font-size: 14px;
      color: #999;
      margin: 10px 0;
    }
  }
  .kefu {
    flex: 1;
    padding-left: 10px;
     width: 240px;
     
    .tel {
     
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #ccc;
      > div {
        display: flex;
        > span {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          &:nth-child(2) {
            i {
              color: green;
            }
          }
          i {
            font-size: 50px;
            color: #0094ff;
            padding: 10px;
          }
          span {
            font-size: 12px;
          }
        }
      }
      p {
        background-color: #eee;
        font-size: 10px;
        padding: 5px;
      }
    }
    .history{
      border:1px solid #ccc;
      padding:10px;
      margin-top:10px;
      h3{
        line-height:40px;
        font-size:18px;
        font-weight:300;
        border-bottom:1px solid #ccc;

      }
      ul{
        li{
          display:flex;
          justify-content: space-between;
          font-size:14px;
          height:50px;
          align-items: center;
          cursor: pointer;
          .info{
            span{
              font-size:10px;
            }

          }
          .btn{

          }
        }
      }

    }
  }
}
</style>