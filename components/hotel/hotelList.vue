<template>
  <div class="hotel">
      <!-- 刘隽11.5 -->
    <div class="container">
      <div class="cate">
        <div class="price">
          <div class="top">
            <span>价格</span>
            <div></div>
            <span>0~{{price}}</span>
          </div>
          <div class="block">
            <el-slider v-model="price" :max="max"></el-slider>
          </div>
        </div>
        <div class="level">
          <span>住宿等级</span>
          <el-select
            v-model="cate.hotellevel"
            size="mini"
            placeholder="不限"
            multiple
            @change="hotelfilter"
          >
            <el-option
              v-for="item in hotelcate.levels"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div class="type">
          <span>住宿类型</span>
          <el-select
            v-model="cate.hoteltype"
            size="mini"
            placeholder="不限"
            multiple
            @change="hotelfilter"
          >
            <el-option
              v-for="item in hotelcate.types"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div class="assets">
          <span>酒店设施</span>
          <el-select
            v-model="cate.hotelassets"
            size="mini"
            placeholder="不限"
            multiple
            @change="hotelfilter"
          >
            <el-option
              v-for="item in hotelcate.assets"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <div class="brands">
          <span>酒店品牌</span>
          <el-select
            v-model="cate.hotelbrand"
            size="mini"
            placeholder="不限"
            multiple
            @change="hotelfilter"
          >
            <el-option
              v-for="item in hotelcate.brands"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="hotels" v-for="value in currentList" :key="value.id">
        <div class="left" @click="toDetail(value)">
          <img :src="value.photos" alt />
        </div>
        <div class="mid">
          <p @click="toDetail(value)">{{value.name}}</p>
          <div class="type">
            <span>{{value.alias}}</span>
            <span v-if="value.hotellevel" style="color:orange">
              <i
                class="iconfont icon-huangguan-copy"
                v-for="(val,idx) in value.hotellevel.level"
                :key="idx"
              ></i>
            </span>
            <span>{{value.hoteltype.name}}</span>
          </div>
          <div class="stars">
            <el-rate
              v-model="value.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
            <span>分</span>
            <div class="comm">
              <span>{{value.all_remarks}}</span>条评价
            </div>
            <div>
              <span>{{value.num_collected}}</span>篇游记
            </div>
          </div>
          <div class="address">
            <i class="el-icon-location"></i>
            <span>位于:{{value.address}}</span>
          </div>
        </div>
        <div class="right">
          <div class="top" v-for="(val,index) in value.products" :key="index" @click="jump">
            <div class="name">{{val.name}}</div>
            <i>￥{{val.price}}</i>
            <span>起 ></span>
          </div>
        </div>
      </div>
      <div class="none" v-if="!currentList.length">暂无符合要求的酒店</div>
      <el-pagination
        layout="prev, pager, next"
        background
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="change"
        prev-text="<　上一页"
        next-text="下一页　>"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前城市id
      city:this.$route.query.city||74,
      price: 0,
      max: 4000,
      //酒店分类项目
      hotelcate: {},
      //酒店列表信息
      hotelinfo: [],
      //酒店详情
      // hotelDetail: {},
      //分页列表
      currentList: [],
      //分类
      cate: {
        hotellevel: [],
        hoteltype: [],
        hotelassets: [],
        hotelbrand: []
      },
      //分页筛选列表
      cateList: [],
      page: {
        // 当前页码
        currentPage: 1,
        // 页容量
        pageSize: 5,
        // 总页数，动态
        total: 1
      }
    };
  },
  methods: {
    //跳转详情页
    toDetail(value) {
      this.$router.push('/hotel/'+value.id)
    },
    //跳转携程
    jump() {
      location.href = "https://hotels.ctrip.com/";
    },
    //获取酒店列表
    getData(isfirst, data) {
      if (isfirst) {
        this.$axios.get("/hotels", { params: data }).then(res => {
          // console.log(res);
          this.hotelinfo = res.data.data;
          // console.log(this.hotelinfo);
          this.page.total = this.hotelinfo.length;
          this.currentList = this.hotelinfo.slice(
            (this.page.currentPage - 1) * this.page.pageSize,
            this.page.currentPage * this.page.pageSize
          );
        });
      } else {
        this.page.total = this.hotelinfo.length;
        this.currentList = this.hotelinfo.slice(
          (this.page.currentPage - 1) * this.page.pageSize,
          this.page.currentPage * this.page.pageSize
        );
        // console.log(this.currentList);
      }
    },
    //改变当前页
    change(value) {
      this.page.currentPage = value;
      this.getData();
      scrollTo(0, 0);
    },
    //类别筛选
    hotelfilter(obj) {
      // console.log(obj);

      this.cateList = this.hotelinfo.filter(e => {
        let levelmatch =
          this.cate.hotellevel.length === 0 ||
          (e.hotellevel &&
            this.cate.hotellevel.indexOf(e.hotellevel.name) !== -1);
        let typematch =
          this.cate.hoteltype.length === 0 ||
          (e.hoteltype && this.cate.hoteltype.indexOf(e.hoteltype.name) !== -1);
        let assetsmatch =
          this.cate.hotelassets.length === 0 ||
          (e.hotelassets &&
            this.cate.hotelassets.indexOf(e.hotelassets.name) !== -1);
        let brandmatch =
          this.cate.hotelbrand.length === 0 ||
          (e.hotelbrand &&
            this.cate.hotelbrand.indexOf(e.hoteltype.name) !== -1);
        return levelmatch && typematch && assetsmatch && brandmatch;
      });
      // console.log(this.currentList);
      this.page.total = this.cateList.length;
        this.currentList = this.cateList.slice(
          (this.page.currentPage - 1) * this.page.pageSize,
          this.page.currentPage * this.page.pageSize)
    }
  },
  mounted() {
    this.getData(true,{city:this.$route.query.city||74});
    this.$axios.get("/hotels/options").then(res => {
      this.hotelcate = res.data.data;
      // console.log(this.hotelcate);
    });
  },
  watch:{
    $route(){
       this.getData(true,{city:this.$route.query.city||74});
    this.$axios.get("/hotels/options").then(res => {
      this.hotelcate = res.data.data;
      // console.log(this.hotelcate);
    });

    }
  }

};
</script>

<style lang='less' scoped>
.hotel {
  margin: 30px 0;
  .cate {
    display: flex;
    margin: 20px 0;
    border: 1px solid #ccc;
    font-size: 14px;
    .price {
      flex: 1.2;
      padding: 10px 20px;
      border-right: 1px solid #ccc;
      .top {
        display: flex;

        color: #666;
        div {
          flex: 1;
        }
      }
    }
    .type {
      flex: 1;
      border-right: 1px solid #ccc;
      padding: 10px 15px;
    }
    .level {
      flex: 1;
      border-right: 1px solid #ccc;
      padding: 10px 15px;
    }
    .assets {
      flex: 1;
      border-right: 1px solid #ccc;
      padding: 10px 15px;
    }
    .brands {
      flex: 1;
      padding: 10px 15px;
    }
  }
  .hotels {
    display: flex;
    height: 300px;
    padding: 35px 0;
    border-bottom: 1px solid #eee;
    .left {
      flex: 3;
      overflow: hidden;
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
      img {
        width: 100%;
      }
    }
    .mid {
      flex: 3;
      p {
        font-size: 26px;
        &:hover {
          cursor: pointer;
        }
      }
      .type {
        font-size: 14px;
        color: #888;
      }
      .stars {
        margin: 10px 0;
        display: flex;
        font-size: 14px;
        .el-rate {
          display: inline-block;
        }
        span {
          color: orange;
        }
        .comm {
          margin: 0 30px 0 20px;
        }
      }
      .address {
        font-size: 14px;
        color: #666;
      }
    }
    .right {
      flex: 2;
      margin: 20px 0 0 30px;
      font-size: 14px;
      color: #666;
      .top {
        display: flex;
        padding: 20px 10px;
        border-bottom: 1px solid #ddd;
        &:hover {
          cursor: pointer;
          background-color: #eee;
        }
        .name {
          flex: 1;
        }
        i {
          color: orange;
          font-style: normal;
        }
      }
    }
  }
  .none {
    text-align: center;
    margin: 30px;
    color: #999;
    font-size: 20px;
  }
  .el-pagination {
    text-align: right;
  }
}
</style>