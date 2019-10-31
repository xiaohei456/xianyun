<template>
  <div class="air_form">
    <div class="air_title">
      <div
        :class="{air_item:true, active:current===index}"
        v-for="(item,index) in ['单程','往返']"
        :key="index"
      >{{item}}</div>
    </div>
    <div class="form_main">
      <el-form :model="air_form" ref="Form" label-width="80px" class="demo-ruleForm">
        <el-form-item label="出发城市">
          <el-autocomplete
            class="inline-input"
            v-model="air_form.departCity"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect1"
            style="width:220px;"
          ></el-autocomplete>
        </el-form-item>
        <div class="changeItem" @click="changeCity">换</div>
        <el-form-item label="目标城市">
          <el-autocomplete
            class="inline-input"
            v-model="air_form.destCity"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            style="width:220px;"
            @select="handleSelect2"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="出发日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="air_form.departDate"
            style="width:220px;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchTicket" style="width:220px;" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 被选中的标题索引
      current: 0,
      //  获取机票数据所有参数
      air_form: {
        departCity: "北京",
        departCode: "BJS",
        departDate: "2019-11-08",
        destCity: "上海",
        destCode: "SHA"
      }
    };
  },
  methods: {
    querySearchAsync(queryString, callback) {
      //   当输入框开始输入内容时出发函数
      // 第一个参数是当前输入的内容
      // 当内容变化时，我们需要获取到服务器的地域名数据，生成下拉列表
      // 根据输入内容获取建议列表
      if (queryString) {
        //    发送请求获取是数据
        this.$axios
          .get("/airs/city", { params: { name: queryString } })
          .then(res => {
            var arr = res.data.data;
            console.log(arr)
            arr.forEach(v => {
              v.value = v.name
              var index=v.name.indexOf('市')
              v.name=v.name.substring(0,index)
            });
            console.log(arr)
            callback(arr);
          });
      }
    },
    handleSelect1(item) {
      // 这是下拉选中时，触发的函数，参数为，定义下拉内容数组的被选中的那一项
      // 出发城市
      this.air_form.departCity = item.name;
      this.air_form.departCode = item.sort;
    },
    handleSelect2(item) {
      // 目标城市
      this.air_form.destCity = item.name;
      this.air_form.destCode = item.sort;
    },
    searchTicket() {
      // console.log(this.air_form);
      // departCity: "北京市";
      // departCode: "BJS";
      // departDate: "2019-10-31";
      // destCity: "天津市";
      // destCode: "TSN";
      // 跳转页面并传递参数
      if (
        this.air_form.departCode &&
        this.air_form.destCity &&
        this.air_form.departDate
      ) {
        this.$router.push({ path: "/air/ticket", query: this.air_form });
      } else {
        this.$message("请完成表单");
      }
    },
    // 切换出发，到达城市
    changeCity() {
      [
        this.air_form.departCity,
        this.air_form.departCode,
        this.air_form.destCity,
        this.air_form.destCode
      ] = [
        this.air_form.destCity,
        this.air_form.destCode,
        this.air_form.departCity,
        this.air_form.departCode
      ];
    }
  }
};
</script>
<style lang="less" scoped>
.air_form {
  background-color: #fff;
  height: 350px;
  width: 360px;
  border: 1px solid #ccc;
  border-top: none;
  box-sizing: border-box;

  .air_title {
    display: flex;
    align-items: center;
    height: 50px;
    .air_item {
      flex: 1;
      font-size: 18px;
      text-align: center;
      background-color: rgb(240, 240, 240);
      height: 100%;
      line-height: 50px;
    }
    .active {
      position: relative;
      background-color: #fff;
      &::before {
        content: "";
        height: 3px;
        width: 100%;
        background-color: orange;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .form_main {
    padding: 10px 30px 10px 10px;
    position: relative;
    .changeItem {
      position: absolute;
      background-color: #666;
      color: #fff;
      top: 50px;
      right: 20px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      cursor: pointer;
      &::before {
        content: "";
        width: 20px;
        height: 20px;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        position: absolute;
        top: -21px;
        left: -9px;
      }
      &::after {
        content: "";
        width: 20px;
        height: 24px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        position: absolute;
        top: 20px;
        left: -9px;
      }
    }
  }
}
</style>