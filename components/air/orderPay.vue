<template>
  <div class="order_pay">
      <div class="info">
          <div class="from">
              <span>2019-06-29</span>
              <span>07:77</span>
              <span>虹桥啊机场</span>
          </div>
          <div class="time">
              <span>---2时15分---</span>
              <span>国航CA1858</span>
          </div>
          <div class="to">
               <span>2019-06-29</span>
              <span>07:77</span>
              <span>虹桥啊机场</span>
          </div>
      </div>
      <div class="price">
          <div>
              <span>订单总价</span>
              <span>金额</span>
              <span>数量</span>
          </div>
          <div>
              <span>成人机票</span>
              <span>￥1472</span>
              <span>x1</span>
          </div>
          <div>
              <span>机建+燃油</span>
              <span>￥50/人/单程</span>
              <span>x1</span>
          </div>
      </div>
      <div class="all_price">
          <span>应付金额:</span>
          <span>￥{{all_price}}</span>
      </div>

  </div>
</template>

<script>
export default {
    // 接收父组件闯过来的素具
    props:{
        all_price:{
            type:Number,
            default:0
        }
    }

}
</script>

<style lang="less" scoped>
.order_pay{
    width:340px;
    
    .info{
        display:flex;
        border-bottom:1px dashed #ccc;
        padding-bottom:20px;
        >div{
            flex:1;
            display:flex;
            flex-direction: column;
            align-items:center;
            font-size:12px;
        }
        .from,.to{
            span{
                &:nth-child(1){
                    padding:10px 0;

                }
                &:nth-child(2){
                    font-size:20px;

                }
                &:nth-child(3){
                    color:#999;
                }
            }
        }
        .time{
            color:#999;
            padding-top:42px;
        }
    }
    .price{
        div{
            display:flex;
            justify-content: space-between;
            border-bottom:1px dashed #ccc;
            line-height:30px;
            color:#666;
            font-size:13px;
            padding:0 10px;
        }
    }
    .all_price{
        display:flex;
        justify-content: space-between;
        align-items:center;
        padding:10px;
        font-size:13px;
         color:#666;
        span:nth-child(2){
            font-size:30px;
            color:orange;
        }
    }
}

</style>