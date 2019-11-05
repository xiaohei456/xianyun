<template>
 <!-- 刘隽11.5 -->
    <div class="map">
      <div id="container"></div>
      <div class="right">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="风景" name="first">
            <div class="list">
              <div v-for="(value,index) in newdata" :key="index" class="item" @mouseenter="setCenter(value.location)">
                <p>{{value.name}}</p>
                <span></span>
                <p>{{value.dis}}公里</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

</template>


<script>
export default {
  data() {
    return {
      hotelinfo: {},
      city: "",
      scenics: [],
      location: [],
      activeName: "first",
      markList: [],
      newdata: [],
      map:{}

    };
  },
  mounted() {
    this.$axios
      .get("/hotels", { params: { id: this.$route.query.id } })
      .then(res => {
        this.hotelinfo = res.data.data;
        // console.log(this.hotelinfo);
        this.city = this.hotelinfo[0].city.name;
        this.hotellocation = [
          this.hotelinfo[0].location.longitude,
          this.hotelinfo[0].location.latitude
        ];
        // console.log(this.city);
        this.$axios
          .get("/cities", { params: { name: this.city } })
          .then(res => {
            this.scenics = res.data.data[0].scenics;
            // console.log(this.scenics);
            // =================
            var that = this;
            window.onLoad = function() {
              that.map = new AMap.Map("container", {
                zoom: 10,
                center: [
                  that.hotelinfo[0].location.longitude,
                  that.hotelinfo[0].location.latitude
                ]
              });

              //地理编码API将地址转换经纬度

              AMap.plugin("AMap.Geocoder", function() {
                var geocoder = new AMap.Geocoder({
                  city: that.city
                });

                that.scenics.forEach((e, i) => {
                  //根据地点名字转换经纬度
                  geocoder.getLocation(e.name, function(status, res) {
                    if (status === "complete" && res.info === "OK") {
                      //创建当前地点的点图标
                      var marker = new AMap.Marker({
                        position: new AMap.LngLat(
                          res.geocodes[0].location.lng,

                          res.geocodes[0].location.lat
                        ),
                        title:res.geocodes[0].formattedAddress
                      });
                      that.map.add(marker);

                      //   把当前地点的经纬度存进sciencs里
                      e.location = [
                        res.geocodes[0].location.lng,
                        res.geocodes[0].location.lat
                      ];

                      //计算当前地点距离酒店的距离
                      var dis = AMap.GeometryUtil.distance(
                        e.location,
                        that.hotellocation
                      );
                      e.dis = parseInt(dis / 100) / 10;
                      that.newdata.push(e);
                    }
                  });
                });
                // console.log(that.newdata);
              });
            };

            //引入高德地图
            var url =
              "https://webapi.amap.com/maps?v=1.4.15&key=e04df7e21fccce19ab37222a6acb9b35&callback=onLoad";
            var jsapi = document.createElement("script");
            jsapi.charset = "utf-8";
            jsapi.src = url;
            document.head.appendChild(jsapi);
            // ============
          });
      });
  },
  methods: {
    tabClick(tab, event) {
      // console.log(tab);
    },
    setCenter(value){
          this.map.setCenter(value)
    }
  }
};
</script>

<style lang='less' scoped>
.map {
  display: flex;
  height: 400px;
  margin: 30px 0;
  #container {
    flex: 1;
  }
  .right {
    width: 365px;
    padding-left: 20px;
    background-color: rgb(260,260,260);
    .list {
      height: 360px;
      overflow-y: scroll;
      .item {
        padding: 12px;
        display: flex;
        span {
          flex: 1;
        }
        p {
          font-size: 16px;
          color: #888;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>