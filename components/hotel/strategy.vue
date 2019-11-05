<template>
  <div class="strategy">
    <!-- // 攻略描述 -->
    <div class="strategy_left">
      <div>
        <span>区域:</span>
        <div>
          <div :class="{scenics:true,isdown}">
            <i>全部</i>
            <span v-for="item in scenics" :key="item.id">{{item.name}}</span>
          </div>
          <div @click="isdown=!isdown">
            <i class="el-icon-d-caret"></i>
            等{{scenics.length}}个区域
          </div>
        </div>
      </div>
      <div>
        <span>攻略:</span>
        <div>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
      </div>
      <div>
        <span>
          均价
          <el-tooltip
            class="item"
            effect="dark"
            content="等级均价由平日价格计算得出，节假日价格会有上浮。"
            placement="top-start"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>:
        </span>
        <div>
          <span>
            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估" placement="bottom">
             <span>
                <i class="el-icon-service"></i>
              <i class="el-icon-service"></i>
              <i class="el-icon-service"></i>
              ￥338　
             </span>
            </el-tooltip>
          </span>
          <span><el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估" placement="bottom">
             <span>
                <i class="el-icon-service"></i>
              <i class="el-icon-service"></i>
              <i class="el-icon-service"></i>
              ￥688　
             </span>
            </el-tooltip></span>
          <span><el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估" placement="bottom">
             <span>
                <i class="el-icon-service"></i>
              <i class="el-icon-service"></i>
              <i class="el-icon-service"></i>
              ￥1288　
             </span>
            </el-tooltip></span>
        </div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="strategy_right">
      <div id="hotelContainer"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scenics: [],
      isdown: false
    };
  },
  props: {
    hotelList: {
      type: Array,
      default: []
    }
  },
  mounted() {
    setTimeout(() => {
    let that = this;
    window.onload = function() {
      //    初始化显示酒店列表地图
      var map = new AMap.Map("hotelContainer", {
        zoom: 7, //级别
        center: [
          that.hotelList[0].location.longitude,
          that.hotelList[0].location.latitude
        ] //中心点坐标
      });
      // var toolbar = new AMap.ToolBar();
      // map.addControl(toolbar);
      that.hotelList.forEach((v, i) => {
        var marker = new AMap.Marker({
          position: new AMap.LngLat(v.location.longitude, v.location.latitude),
          title: v.address
        });
        map.add(marker);
      });
    };
    }, 1000);

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=06e5e393fbd4f45a92a091aefe6ff8e3&callback=onload&plugin=AMap.ToolBar";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
      
    // 获取城市景点
    this.$axios.get("/cities", { params: { name: "南京" } }).then(res => {
      this.scenics = res.data.data[0].scenics;
    });
    
  },
  watch: {
    hotelList() {
      // console.log(this.hotelList);
    }
  }
};
</script>

<style lang="less" scoped>
.el-icon-service {
  color: gold;
}
#hotelContainer {
  width: 100%;
  height: 262px;
}

.strategy {
  font-size: 14px;
  color: #555;
  display: flex;

  .strategy_left {
    flex: 3;
    padding: 10px 20px 0 0;
    > div {
      display: flex;
      cursor: pointer;
      padding:8px 0;
      span {
        width: 70px;
      }
      .scenics {
        height: 40px;
        overflow: hidden;

        span {
          padding: 10px;
          &:hover {
            color: #0094ff;
          }
        }
        &.isdown {
          height: auto;
        }
      }
      > div {
        flex: 1;
      }
    }
  }
  .strategy_right {
    flex: 2;
  }
}
</style>