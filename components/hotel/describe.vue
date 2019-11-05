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
          <el-input v-model="form.peopleNum" placeholder="请输入内容" :readonly="true"></el-input>
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
    props:{
        // 当前页面需要显示的酒店
        hotelList:{
            type:Array,
            default:[]
        },
        isshow:true

    },
    data(){
        return {
            form: {
        // 搜索酒店目标城市
        destCity: "南京",
        //   日期
        date: "",
        // 人数
        peopleNum: "嘿嘿，你改不了"
      }
        }
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
        this.$router.push({path:'/hotel',query:{city:v.id}})
    }
  }

}
</script>

<style lang="less" scoped>
.person{
  position: relative;
  .options{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    height:100px;


  }
}
</style>