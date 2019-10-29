<template>
  <div class="index">
    <el-carousel height="700px">
      <el-carousel-item v-for="(item,index) in sw_imges" :key="index">
        <div :style="`background:url('${baseurl+item.url}') center center;height:700px;`"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="center">
      <search />
    </div>
  </div>
</template>

<script>
// 引入组件1
import search from "@/components/user/search.vue";
export default {
  data() {
    return {
      sw_imges: [],
      baseurl: "http://127.0.0.1:1337"
    };
  },
  // 钩子函数
  mounted() {
    // 获取轮播的图片数组
    // 发送请求获取数据
    this.$axios.get("/scenics/banners").then(res => {
      this.sw_imges = res.data.data;
      console.log(this.sw_imges);
    });
  },
  // 注册组件
  components: {
    search
  }
};
</script>

<style lang='less' scoped>
.index {
  position: relative;
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index:99;
    transform: translate(-50%, -50%)
  }
}
</style>