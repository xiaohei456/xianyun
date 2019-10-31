<template>
  <div class="filter">
    <!-- 筛选机票的下拉选项 -->

    <div class="filter_header">
      <div class="header_left">单程： 北京 - 上海 / 2019-11-09</div>
      <div class="header_right">
        <el-select v-model="dst_airport_name" slot="prepend" placeholder="起飞机场" size="mini">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
      </div>
    </div>
    <div class="filter_footer">撤销</div>
  </div>
</template>

<script>
export default {
    props:{
        ticketData:{
            default:{},
            type:Object
        }
    },
    data(){
        return {
            dst_airport_name:''
        }
    }
};
</script>

<style lang="less" scoped>
.filter {
  
  .filter_header{
display: flex;
  justify-content: space-between;
  .header_left{
      font-size:13px;
      display:flex;
      align-items:center;
  }
  }
  .header_right{

  }
}
</style>