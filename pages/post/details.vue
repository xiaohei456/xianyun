<template>
  <!-- 文章详情 -->
  <div class="details bx">
    <div class="details_left">
      <!-- 面包屑 -->
      <div class="path">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 标题 -->
      <div class="title">{{postData.title}}</div>
      <!-- 内容 -->
      <div class="main">
        <div class="info">
          <div style="float:right;color:#999;">
            <span>攻略：{{postData.city.created_at}}</span>&nbsp;&nbsp;&nbsp;
            <span>阅读：{{postData.watch}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
        <div class="content" v-html="postData.content"></div>
      </div>
      <!-- 点赞操作 -->
      <div class="like">
        <div>
          <i class="el-icon-edit-outline"></i>
          <span>评论({{postData.comments.length}})</span>
        </div>
        <div>
          <i class="el-icon-star-off"></i>
          <span>收藏</span>
        </div>
        <div>
          <i class="el-icon-share"></i>
          <span>分享</span>
        </div>
        <div>
          <i class="el-icon-success"></i>
          <span>点赞(0)</span>
        </div>
      </div>
      <!-- 发表评论 -->
      <div class="add">
        <addComment :addSuccess="addSuccess" />
      </div>

      <!-- 评论 -->
      <div class="comments" v-if="comments.length">
        <div class="comment_item" v-for="item in comments" :key="item.id">
          <div class="info">
            <span class="info_left">
              <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
              <span>{{item.account.nickname}}</span>
              <span>2020-13-33 25:61</span>
            </span>
            <span class="info_right">{{item.level}}</span>
          </div>
          <!-- 回复 -->
          <div class="item" v-if="item.parent">
            <commentItem :comment="item.parent" />
          </div>
          <div class="content">{{item.content}}</div>
          <div class="imges" v-if="item.pics.length">
            <img :src="$axios.defaults.baseURL+img.url" alt v-for="img in item.pics" :key="img.id" />
          </div>
          <div class="huifu">
            <span>回复</span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
        <div class="pages">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageindex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    </div>
    <div class="details_right">
      <h3>相关攻略</h3>
      <div
        class="post_item"
        v-for="item in recommendPost"
        :key="item.id"
        @click='$router.push({path:"/post/details",query:{id:item.id}});'
      >
        <div class="item_left">
          <img :src="item.images[0]" alt />
        </div>
        <div class="item_right">
          <p>{{item.title}}</p>
          <div>2019-11-05 阅读{{item.watch}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import addComment from "@/components/post/addComment.vue";
import commentItem from "@/components/post/commentItem.vue";
export default {
  data() {
    return {
      // 文章数据
      postData: {
        city: {},
        comments: [{ account: {} }]
      },
      // 评论数据
      comments: [],
      // 推荐文章
      recommendPost: [],
      // 当前页面的文章id
      id: "",
      // 评论条数
      total:0,
      // 当前页面
      pageindex:1,
      // 当前页码条数
      pagesize:2
    };
  },
  mounted() {
    // 获取参数
    let id = this.$route.query.id;
    this.id = id;
    // 获取文章数据
    this.$axios.get("/posts", { params: { id } }).then(res => {
      this.postData = res.data.data[0];
      console.log(this.postData);
    });
    // 获取推荐文章
    this.$axios.get("/posts/recommend", { params: { id } }).then(res => {
      this.recommendPost = res.data.data;
      console.log(this.recommendPost);
    });
    // 获取评论数据
    this.getComments();
  },
  components: {
    addComment,
    commentItem
  },
  methods: {
    // 获取评论数据
    getComments() {
      this.$axios
        .get("/posts/comments", { params: { post: this.$route.query.id,_limit:this.pagesize,_start:this.pageindex } })
        .then(res => {
          this.comments = res.data.data || [];
          this.total=res.data.total
          console.log(this.comments);
        });
    },
    addSuccess() {
      this.getComments();
      console.log(123);
    },
    handleCurrentChange(v){
      this.pageindex=v
      this.getComments()
    },
    handleSizeChange(v){
      this.pagesize=v
       this.getComments()
    }
  },
  watch: {
    $route() {
      if (this.id === "") {
        return;
      }
      // 获取文章数据
      this.$axios
        .get("/posts", { params: { id: this.$route.query.id } })
        .then(res => {
          this.postData = res.data.data[0];
        });
      // 获取推荐文章
      this.$axios
        .get("/posts/recommend", { params: { id: this.id } })
        .then(res => {
          this.recommendPost = res.data.data;
        });
      // 获取评论数据
      this.getComments();
      console.dir(this.$axios);
    }
  }
};
</script>

<style lang="less" scoped>
.details {
  display: flex;
  .details_left {
    width: 666px;

    .path {
      padding: 30px 0;
    }
    .title {
      font-size: 30px;
      font-weight: 700;
      padding-bottom: 30px;
      border-bottom: 1px solid #ccc;
    }
    .main {
      .info {
        padding: 15px 0;
        margin-bottom: 15px;
      }
    }
    .content {
      width: 666px;
      box-sizing: border-box;
      /deep/ img {
        max-width: 660px !important;
      }
    }

    .like {
      display: flex;
      justify-content: center;
      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 50px 20px 20px 20px;
        cursor: pointer;
        i {
          font-size: 40px;
          color: gold;
        }
        span {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .comments {
      border: 1px solid #ccc;
      .comment_item {
        padding: 0 20px;
        border-bottom: 1px dashed #ccc;
        &:hover {
          .huifu {
            span {
              display: inline-block;
            }
          }
        }
        .info {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding: 20px 0;
          .info_left {
            img {
              width: 16px;
            }
          }
        }
        .content {
        }
        .imges {
          img {
            width: 220px;
          }
        }
        .huifu {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          height: 40px;
          padding: 10px;
          span {
            display: none;
            color: blue;
            font-size: 13px;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .details_right {
    flex: 1;
    height: 700px;
    padding-left: 10px;
    h3 {
      font-size: 20px;
      font-weight: 300;
      border-bottom: 1px solid #ccc;
      padding: 20px 0 10px 5px;
    }
    .post_item {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      cursor: pointer;
      .item_left {
        padding-right: 5px;
        img {
          width: 100px;
          height: 80px;
        }
      }
      .item_right {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        div {
          font-size: 13px;
          color: #666;
        }
      }
    }
  }
}
</style>