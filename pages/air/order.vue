<template>
  <div class="order bx">
      <!-- 左边乘机人表单填写 -->
      <div class="userform">
         <ordeUserForm :ticketData='ticketData' :insurances='insurances' @changePrice='changePrice' />
      </div>
      <!-- 右边订单详情总价 -->
      <div class="pay">
<orderPay :all_price='all_price' />
      </div>

  </div>
</template>

<script>
// 引入组件
import orderPay from "@/components/air/orderPay.vue"
import ordeUserForm from "@/components/air/orderUserForm.vue"
export default {
  data(){
    return {
      // 机票详情
    ticketData:{
      users:[]

    },
    //   保险项目
    insurances:[],
    // 订单总额
    all_price:0
    }
    

  },
mounted () {
    // 获取参数
   var query=this.$route.query
    this.$axios.get(`/airs/${query.id}`,{query:{seat_xid:query.seat_xid}})
    .then(res=>{
    //   保险项目
      this.insurances=res.data.insurances
    //   机票数据
      this.ticketData=res.data
      // console.log(res)
    })
},
components: {
  orderPay,ordeUserForm
},
methods: {
  changePrice(price){
    // 表单填写时修改到订单价格时候触发事件
this.all_price=price
  }
}
}
</script>

<style lang="less" scoped>
.order{
  display:flex;
  padding-top:20px;
  justify-content: space-between;
  .userform{
    flex:1;
  }
  .pay{
    height:800px;
    border:1px solid #ccc;
  }
  

}
</style>