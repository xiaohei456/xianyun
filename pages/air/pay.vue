<template>
  <div class="pay">
    <div class="bx">
      <div class="pay_price">
        <div>
          支付总金额
          <span>￥{{orderInfo.price}}.00</span>
        </div>
      </div>
      <div class="main">
        <h3>微信支付</h3>
        <div class="operation">
          <div class="left">
            <canvas id="canvas"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="right">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      // 支付二维码文字
      code_url: "",
      //   订单详情
      orderInfo: {}
    };
  },
  mounted() {
    // 通过参数id获取到订单详情
    const id = this.$route.query.id;
    // console.log(id)
    // 发送axios
    // 获取token
    const token = this.$store.state.user.userInfo.token;
    this.$axios
      .get("/airorders/" + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.orderInfo = res.data;
        // console.log(res);
        this.code_url = res.data.payInfo.code_url;
        let canvas = document.getElementById("canvas");
        QRCode.toCanvas(canvas, this.code_url, function(error) {
          if (error) console.error("二维码生成错误");
        });
      });
    var timeid = setInterval(() => {
      let token = this.$store.state.user.userInfo.token;
      this.$axios
        .post(
          "/airorders/checkpay",
          {
            id: this.$route.query.id,
            nonce_str: this.orderInfo.payInfo.nonce_str,
            out_trade_no: this.orderInfo.payInfo.order_no
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(result => {
          if (result.data.trade_state === "SUCCESS") {
            clearInterval(timeid);
            this.$message("支付成功");
          }
        });
    }, 3000);
  }
};
</script>

<style lang="less" scoped>
#canvas {
  width: 200px;
  height: 200px;
}
.pay {
  background-color: #eee;
  padding-bottom: 30px;
  .pay_price {
    display: flex;
    justify-content: flex-end;
    padding-top: 30px;
    span {
      font-size: 28px;
      color: red;
    }
  }
  .main {
    background-color: #fff;
    border-top: 5px solid orange;
    padding: 30px;

    h3 {
      font-size: 30px;
      font-weight: 300;
    }
    .operation {
      padding: 0 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 230px;
        height: 320px;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>