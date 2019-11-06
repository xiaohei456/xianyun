<template>
  <div class="describe">
    <!-- 酒店主页的查询相关的下拉头选项 -->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 搜索城市 -->
      <el-form-item>
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="querySearchAsync"
          style="width:220px;"
          @select="handleSelect2"
        ></el-autocomplete>
      </el-form-item>
      <!-- 选择时间 -->
      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- 人数 -->
      <el-form-item>
        <div class="person" >
          <div @click="isshow=true">
          <el-input
            v-model="form.peopleNum"
            placeholder="人数未定"
            :readonly="true"
            style="width:227px;"

          ></el-input></div>
          <div class="select" v-show="isshow">
           <p>
             额... surprise
           </p>
            <!-- <div class="top">
              <span>每间</span>
              <el-select v-model="value1" placeholder="请选择" style="width:90px;height:22px">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-select
                v-model="value2"
                collapse-tags
                style="margin-left: 20px;width:90px;height:22px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>-->
            <div class>
              <el-button
                type="primary"
                size="mini"
                style="width:50px;height:30px;text-align:center;font-size:10px;"
          
              ><div @click='isshow=false'>确定</div></el-button>
            </div> 
          </div>
        </div>
      </el-form-item>
      <!-- // 按钮 -->
      <el-form-item>
        <el-button type="primary">查看价格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 当前页面需要显示的酒店
    hotelList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      form: {
        // 搜索酒店目标城市
        destCity: "南京",
        //   日期
        date: "",
        // 人数
        peopleNum: ""
      },
      isshow: false,
      value1: "",
      value2: "",
      options1: [
        { value: "1 成人", label: 1 },
        { value: "2 成人", label: 2 },
        { value: "3 成人", label: 3 },
        { value: "4 成人", label: 4 },
        { value: "5 成人", label: 5 },
        { value: "6 成人", label: 6 },
        { value: "7 成人", label: 7 }
      ],
      options2: [
        { value: "1 儿童", label: 1 },
        { value: "2 儿童", label: 2 },
        { value: "3 儿童", label: 3 },
        { value: "4 儿童", label: 4 },
        { value: "5 儿童", label: 5 }
      ]
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
            arr.forEach(v => {
              var index = v.name.indexOf("市");
              v.name = v.name.substring(0, index);
              v.value = v.name;
            });
            callback(arr);
          });
      }
    },
    handleSelect2(v) {
      this.$router.push({ path: "/hotel", query: { city: v.id } });
    }
  }
};
</script>

<style lang="less" scoped>
.person {
  position: relative;
  .select {
    z-index: 9;
    position: absolute;
    bottom: -128px;
    left: 0;
    width: 324px;
    height: 118px;
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    .top{
      height:80px;
      display:flex;
      align-items:center;
     
    }
  }
}
</style>