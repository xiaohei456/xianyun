<template>
  <div>
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
// 引入组件
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
export default {
  // 注册组件
  components:{
    Header,Footer
  }

}
</script>

<style lang='less' scoped>

</style>