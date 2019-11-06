<template>
 <!-- 刘隽11.5 -->
  <div class="map">
      <div id="container"></div>
      <div class="right">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="风景" name="first">
            <div class="list">
              <div v-for="(value,index) in scenics" :key="index" class="item">
                <p @mouseover="setcenter(value.location)">{{value.name}}</p>
                <span></span>
                <p>{{value.dis}}公里</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <div class="list">
              <div v-for="(value,index) in stationinfo" :key="index" class="item">
                <p @mouseover="setcenter([value.location.Q,value.location.P])">{{value.name}}</p>
                <span></span>
                <p>{{value.dis}}公里</p>
              </div>
            </div>
          </el-tab-pane>
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
      hotellocation: [],
      activeName: "first",
      map: {},
      stationinfo: [],
      markerList: [],
      markerList1: [],
      markerList2: []
    };
  },
  mounted() {
    this.$axios
      .get("/hotels", { params: { id: this.$route.query.id } })
      .then(res => {
        this.hotelinfo = res.data.data[0];
        console.log(this.hotelinfo);
        this.city = this.hotelinfo.city.name;
        this.hotellocation = [
          this.hotelinfo.location.longitude,
          this.hotelinfo.location.latitude
        ];
        console.log(this.city);
        this.$axios
          .get("/cities", { params: { name: this.city } })
          .then(res => {
            this.scenics = res.data.data[0].scenics;
            console.log(this.scenics);
            // =================
            var that = this;
            window.onLoad = function() {
              that.map = new AMap.Map("container", {
                zoom: 8,
                center: [
                  that.hotelinfo.location.longitude,
                  that.hotelinfo.location.latitude
                ]
              });

              //设置中心

              //地理编码API将地址转换经纬度

              AMap.plugin("AMap.Geocoder", function() {
                var geocoder = new AMap.Geocoder({
                  city: that.city
                });

                //循环风景数据生成点标记以及计算距离
                that.scenics.map((e, i) => {
                  //根据地点名字转换经纬度
                  geocoder.getLocation(e.name, function(status, res) {
                    if (status === "complete" && res.info === "OK") {
                      //   console.log(res);
                      //创建当前地点的点图标
                      var marker = new AMap.Marker({
                        position: new AMap.LngLat(
                          res.geocodes[0].location.lng,

                          res.geocodes[0].location.lat
                        ),
                        title: res.geocodes[0].formattedAddress,
                        clickable: true
                      });
                      that.markerList1.push(marker);
                      that.markerList.push(marker);
                      // that.map.add(marker);

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
                    }
                  });
                });
              });

              //查询公交
              AMap.plugin(["AMap.StationSearch"], function() {
                //实例化公交站点查询类
                var station = new AMap.StationSearch({
                  pageIndex: 1, //页码，默认值为1
                  pageSize: 10, //单页显示结果条数，默认值为20，最大值为50
                  city: that.city //限定查询城市，可以是城市名（中文/中文全拼）、城市编码，默认值为『全国』
                });
                console.log(that.hotelinfo.area);

                //执行关键字查询
                station.search(that.hotelinfo.area, function(status, res) {
                  //打印状态信息status和结果信息result
                  //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误。
                  that.stationinfo = res.stationInfo;
                  console.log(that.stationinfo);
                  that.stationinfo.map(e => {
                    //计算距离
                    var dis = AMap.GeometryUtil.distance(
                      [e.location.Q, e.location.P],
                      that.hotellocation
                    );
                    e.dis = parseInt(dis / 100) / 10;

                    //添加点标记List
                    var marker = new AMap.Marker({
                      position: new AMap.LngLat(e.location.Q, e.location.P),
                      title: e.name,
                      clickable: true
                    });
                    that.markerList2.push(marker);
                  });
                });
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
  watch: {
    markerList() {
      this.map.add(this.markerList);
    }
  },
  methods: {
    tabClick(tab, event) {
      this.map.remove(this.markerList);
      if (tab.index === "0") {
        this.markerList = this.markerList1;
        this.map.setZoom(9);
      } else if (tab.index === "1") {
        this.markerList = this.markerList2;
        this.map.setZoom(13);
        this.map.setCenter(
          [this.hotelinfo.location.longitude,
          this.hotelinfo.location.latitude]
        );
      }
    },
    setcenter(value) {
      console.log(value);
      this.map.setCenter(value);
    },
    href() {
      location.href = "https://hotels.ctrip.com/hotel/694679.html";
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