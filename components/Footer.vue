<template>
  <!-- 脚部内容 -->
  <div class='footer'>
    <!-- 版心 -->
    <div class="bx">
      <!-- 内容 -->
      <div class="main">
        <div class="one">
          <h3>闲云旅游旅游网</h3>
          <ul>
            <li>上亿旅行者共同打造的“旅行神器”</li>
            <li>
              <span>60,000</span>多个全球旅游目的地
            </li>
            <li>
              <span>600,000</span>个细分目的地新玩法
            </li>
            <li>
              <span>760,000,000</span>次攻略下载
            </li>
            <li>
              <span>38,000</span>家旅游产品供应商
            </li>
          </ul>
        </div>
        <div class="two">
          <h3>关于我们</h3>
          <ul>
            <li>隐私政策 商标声明</li>
            <li>服务协议 游记协议</li>
            <li>商域平台服务协议</li>
            <li>网络信息侵权通知指引</li>
            <li>闲云旅游旅游网服务监督员</li>
            <li>网站地图加入闲云旅游</li>
          </ul>
        </div>
        <div class="three">
          <h3>旅游服务</h3>
          <ul>
            <li>旅游攻略 酒店预订</li>
            <li>旅游特价 国际租车</li>
            <li>旅游问答 旅游保险</li>
            <li>旅游指南 订火车票</li>
            <li>旅游资讯 APP下载</li>
          </ul>
        </div>
        <div class="four">
          <h3>
            <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
             <ul>
            <li style='text-align:center;'>关注我们</li>
          </ul>
          </h3>
         
        </div>
      </div>
      <div class="bottom">
        <p>京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.footer{
  background-color: rgb(51,51,51);
  height:320px;
  color:#ddd;
  padding-top:40px;
  font-weight: 300;
  .bx{
    .main{
      display:flex;
      padding-bottom:40px;
      border-bottom:1px solid #fff;
      justify-content: space-around;
      div{
        h3{
          font-size:16px;
          margin-bottom:20px;
        }
        ul{
          li{
            font-size:12px;
            line-height:20px;
            span{
              color:orange;
            }
          }
        }

      }
    }
    .bottom{
      p{
        text-align:center;
        font-size:10px;
        line-height:100px;
      }
    }
  }
  img{
    width:140px;
  }
}
</style>