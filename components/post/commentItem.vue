<template>
  <div class="commentItem">
    <commentItem v-if="comment.parent" :comment="comment.parent" />
    <div class="comment_item">
      <div class="info">
        <span class="info_left">
          <img :src="$axios.defaults.baseURL+comment.account.defaultAvatar" alt />
          <span>{{comment.account.nickname}}</span>
          <span>2020-13-33 25:61</span>
        </span>
        <span class="info_right">{{comment.level}}</span>
      </div>

      <div class="content">{{comment.content}}</div>
      <!-- 图片 -->
      <div class="imges" v-if='comment.pics.length'>
        <img :src="$axios.defaults.baseURL+img.url" alt="" v-for="img in comment.pics" :key='img.id'>
      </div>
      <div class="huifu">
        <span>回复</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentItem",
  props: {
    comment: {
      type: Object,
      default: { account: {},pics:[] }
    }
  }
};
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  margin:3px;
  background-color: rgb(250,255,260);
  .comment_item {
    padding: 0 20px;
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
</style>